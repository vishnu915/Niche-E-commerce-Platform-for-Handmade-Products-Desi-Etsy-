import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-hot-toast";
import "../styles/PendingArtisans.css";

const PendingArtisans = () => {
  const [artisans, setArtisans] = useState([]);

  const fetchArtisans = async () => {
    try {
      const res = await axiosInstance.get("/admin/pending-artisans");
      setArtisans(res.data);
    } catch {
      toast.error("Failed to load artisans");
    }
  };

  const handleApprove = async (id) => {
    try {
      await axiosInstance.put(`/admin/approve-artisan/${id}`);
      toast.success("Artisan approved");
      fetchArtisans();
    } catch {
      toast.error("Approval failed");
    }
  };

  const handleReject = async (id) => {
    try {
      await axiosInstance.delete(`/admin/reject-artisan/${id}`);
      toast.success("Artisan rejected");
      fetchArtisans();
    } catch {
      toast.error("Rejection failed");
    }
  };

  useEffect(() => {
    fetchArtisans();
  }, []);

  return (
    <div className="pending-artisans-page">
      <h2>Pending Artisan Approvals</h2>
      {artisans.length === 0 ? (
        <p className="empty-message">
          No pending artisan requests at the moment.
        </p>
      ) : (
        <div className="artisan-card-grid">
          {artisans.map((artisan) => (
            <div key={artisan._id} className="artisan-card">
              <div className="artisan-details">
                <h4>{artisan.name}</h4>
                <p>Email: {artisan.email}</p>
              </div>
              <div className="artisan-actions">
                <button
                  className="btn-approve"
                  onClick={() => handleApprove(artisan._id)}
                >
                  Approve
                </button>
                <button
                  className="btn-reject"
                  onClick={() => handleReject(artisan._id)}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingArtisans;
