import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-hot-toast";
import "../styles/Cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, updateCartItem, removeFromCart, clearCart, fetchCart } =
    useCart();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const increment = (id, qty) => updateCartItem(id, qty + 1);
  const decrement = (id, qty) => {
    if (qty > 1) updateCartItem(id, qty - 1);
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      // Step 1: Create Razorpay Order
      const { data: razorpayOrder } = await axiosInstance.post(
        "/payment/create",
        {
          amount: total,
        }
      );

      // Step 2: Initialize Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: "INR",
        name: "Desi Etsy",
        description: "Handmade Product Purchase",
        order_id: razorpayOrder.id,
        handler: async function (response) {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
            response;

          // Step 3: Verify payment
          await axiosInstance.post("/payment/verify", {
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
            signature: razorpay_signature,
          });

          // Step 4: Place the order
          const items = cartItems.map((item) => ({
            product: item.product._id,
            quantity: item.quantity,
          }));

          await axiosInstance.post("/orders/place", {
            items,
            totalAmount: total,
            razorpayOrderId: razorpay_order_id,
          });

          clearCart();
          toast.success("Order placed successfully!");
          navigate("/my-orders");
        },
        theme: {
          color: "#c69c81",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      // For testing purpose
      // const items = cartItems.map((item) => ({
      //   product: item.product._id,
      //   quantity: item.quantity,
      // }));

      // await axiosInstance.post("/orders/place", {
      //   items,
      //   totalAmount: total,
      //   razorpayOrderId: "1",
      // });

      // clearCart();
      // toast.success("Order placed successfully!");
      // navigate("/my-orders");
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(
        error.response?.data?.message || "Payment failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cart-wrapper">
      <div className="cart-header">
        <h2>Your Cart</h2>
      </div>

      {cartItems.length === 0 ? (
        <div className="cart-empty">Your cart is empty.</div>
      ) : (
        <div className="cart-grid">
          <div className="cart-list">
            {cartItems.map(({ product, quantity }) => (
              <div key={product._id} className="cart-item">
                <img
                  src={`data:${product.images[0]?.contentType};base64,${product.images[0]?.data}`}
                  alt={product.name}
                />
                <div className="cart-item-details">
                  <h4>{product.name}</h4>
                  <p>₹{product.price}</p>
                  <div className="cart-actions">
                    <div className="qty-btns">
                      <button
                        onClick={() => decrement(product._id, quantity)}
                        disabled={quantity === 1}
                      >
                        -
                      </button>
                      <span>{quantity}</span>
                      <button onClick={() => increment(product._id, quantity)}>
                        +
                      </button>
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(product._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Total: ₹{total}</h3>
            <button
              onClick={handlePayment}
              className="checkout-btn"
              disabled={loading || cartItems.length === 0}
            >
              {loading ? "Processing..." : "Pay Now"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
