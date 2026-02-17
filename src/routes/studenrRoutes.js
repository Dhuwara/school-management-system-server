import express from "express";
import { createStudent, getStudent } from "../Controllers/studentController.js";

const router = express.Router();

router.post("/student", createStudent);
router.get("/studentList", getStudent);

export default router;
