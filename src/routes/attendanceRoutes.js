import express from "express";
import {
  markAttendance,
  getAttendanceByDate,
} from "../controllers/attendanceController.js";

const router = express.Router();

router.post("/mark", markAttendance);
router.get("/history", getAttendanceByDate);

export default router;
