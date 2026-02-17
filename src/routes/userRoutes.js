import express from "express";
import { verifyToken, allowRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/student", verifyToken, allowRoles("student"), (req, res) => {
  res.json({ message: "Student Dashboard Data" });
}); 

router.get("/admin", verifyToken, allowRoles("admin"), (req, res) => {
  res.json({ message: "Admin Dashboard Data" });
});

router.get("/staff", verifyToken, allowRoles("staff"), (req, res) => {
  res.json({ message: "Staff Dashboard Data" });
});

router.get("/parent", verifyToken, allowRoles("parent"), (req, res) => {
  res.json({ message: "Parent Dashboard Data" });
});

export default router;
