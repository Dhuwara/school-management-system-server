import express from "express";
import {
  saveExamSchedule,
  getExamSchedules,
} from "../controllers/examController.js";

const router = express.Router();

// Save (Create + Update)
router.post("/schedule/save", saveExamSchedule);

// Get schedule by class + academic year
router.get("/schedule/:classId/:academicYear", getExamSchedules);

export default router;
    