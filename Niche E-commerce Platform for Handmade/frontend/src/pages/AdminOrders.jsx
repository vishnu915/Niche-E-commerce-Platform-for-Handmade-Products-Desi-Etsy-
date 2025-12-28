import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import "../styles/AdminOrders.css";
import { toast } from "react-hot-toast";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [statusUpdates, setStatusUpdates] = useState({});

  const fetchOrders = async () => {
    try {
      const res = await axiosInstance.get("/orders/all");
      setOrders(res.data);
    } catch (err) {
      toast.error("Failed to fetch orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (filterStatus === "All") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(
        orders.filter((order) => order.status === filterStatus)
      );
    }
  }, [orders, filterStatus]);

  const handleStatusChange = (orderId, newStatus) => {
    setStatusUpdates({ ...statusUpdates, [orderId]: newStatus });
  };

  const handleStatusUpdate = async (orderId) => {
    const newStatus = statusUpdates[orderId];
    if (!newStatus) return;

    try {
      await axiosInstance.put("/orders/update-status", {
        orderId,
        status: newStatus,
      });
      toast.success("Order status updated");
      fetchOrders();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="admin-orders-page">
      <h2>Manage Orders</h2>

      <div className="order-filter">
        <label>Filter by Status: </label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Packed">Packed</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>

      {filteredOrders.length === 0 ? (
        <p className="no-orders-msg">No orders found.</p>
      ) : (
        filteredOrders.map((order) => (
          <div className="admin-order-card" key={order._id}>
            <div className="admin-order-header">
              <p>
                <strong>Order ID:</strong> {order._id}
              </p>
              <p>
                <strong>User:</strong> {order.user?.name}
              </p>
              <p>
                <strong>Total:</strong> ₹{order.totalAmount}
              </p>
              <p>
                <strong>Payment:</strong> {order.paymentStatus}
              </p>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="admin-order-items">
              {order.items.map(({ product, quantity }) => (
                <div className="admin-order-item" key={product._id}>
                  <img
                    src={`data:${product.images?.[0]?.contentType};base64,${product.images?.[0]?.data}`}
                    alt={product.name}
                  />
                  <div>
                    <h4>{product.name}</h4>
                    <p>Qty: {quantity}</p>
                    <p>Price: ₹{product.price}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="admin-status-update">
              <label>Update Status: </label>
              <select
                value={statusUpdates[order._id] || order.status}
                onChange={(e) => handleStatusChange(order._id, e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Packed">Packed</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
              <button onClick={() => handleStatusUpdate(order._id)}>
                Update
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminOrders;
