import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-hot-toast";
import { AuthContext } from "./AuthContext";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { authUser } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
    try {
      const res = await axiosInstance.get("/cart");
      setCartItems(res.data.items || []);
    } catch (err) {
      console.error("Failed to fetch cart");
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      await axiosInstance.post("/cart/add", { productId, quantity });
      await fetchCart();
    } catch {
      toast.error("Add to cart failed");
    }
  };

  const updateCartItem = async (productId, quantity) => {
    try {
      const res = await axiosInstance.put("/cart/update", {
        productId,
        quantity,
      });
      await fetchCart();
      toast.success(`${res.data.message}`);
    } catch {
      toast.error(`${res.data.message}`);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axiosInstance.delete("/cart/remove", { data: { productId } });
      await fetchCart();
    } catch {
      toast.error("Remove failed");
    }
  };

  const clearCart = async () => {
    try {
      await axiosInstance.delete("/cart/clear");
      setCartItems([]);
    } catch {
      toast.error("Clear failed");
    }
  };

  useEffect(() => {
    if (authUser?.role === "customer") fetchCart();
  }, [authUser]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
