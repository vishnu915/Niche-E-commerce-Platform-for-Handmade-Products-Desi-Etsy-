import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const getApprovedArtisansController = async (req, res) => {
  try {
    const artisans = await User.find({
      role: "artisan",
      isApproved: true,
    }).select("-password");
    res.json(artisans);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getMeController = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return res.status(401).json({ message: "Unauthorized: No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (err) {
    res.status(401).json({ message: "Unauthorized", error: err.message });
  }
};
