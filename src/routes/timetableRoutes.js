import express from "express";
import {
  getTimetable,
  upsertTimetable,
} from "../controllers/timetableController.js";

const router = express.Router();

router.post("/upsert", upsertTimetable);
router.get("/:classId", getTimetable);

export default router;
