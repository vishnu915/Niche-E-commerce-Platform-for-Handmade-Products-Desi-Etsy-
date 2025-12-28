import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import "../styles/Orders.css";
import { toast } from "react-hot-toast";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axiosInstance.get("/orders/my-orders");
      setOrders(res.data);
    } catch (error) {
      toast.error("Failed to fetch orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="orders-container">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div className="order-card" key={order._id}>
            <div className="order-header">
              <p>
                <strong>Order ID:</strong> {order._id}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              <p>
                <strong>Payment:</strong> {order.paymentStatus}
              </p>
              <p>
                <strong>Total:</strong> ₹{order.totalAmount}
              </p>
            </div>
            <div className="order-items">
              {order.items.map(({ product, quantity }) => (
                <div key={product._id} className="order-item">
                  <img
                    src={`data:${product.images?.[0]?.contentType};base64,${product.images?.[0]?.data}`}
                    alt={product.name}
                  />
                  <div>
                    <h4>{product.name}</h4>
                    <p>Qty: {quantity}</p>
                    <p>
                      ₹{product.price} × {quantity} = ₹
                      {product.price * quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
