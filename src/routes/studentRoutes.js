import express from "express";
import {
  createStudent,
  getAllStudent,
  getStudent,
  updateStudent,
  deleteStudent
} from "../Controllers/studentController.js";

const router = express.Router();

router.post("/student", createStudent);
router.get("/studentList", getAllStudent);
router.get("/student/:id", getStudent);
router.put("/student/:id", updateStudent);
router.delete("/student/:id", deleteStudent);

export default router;
