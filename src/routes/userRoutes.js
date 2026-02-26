import express from "express";
import { verifyToken, allowRoles } from "../middleware/authMiddleware.js";
const router = express.Router();


router.get("/admin-dashboard", verifyToken, allowRoles("admin"), (req, res) => {
  res.json({ message: "Welcome Admin" });
});

router.get(
  "/student-dashboard",
  verifyToken,
  allowRoles("student"),
  (req, res) => {
    res.json({ message: "Welcome Student" });
  },
);

export default router;
