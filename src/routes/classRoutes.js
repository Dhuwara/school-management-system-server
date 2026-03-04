import express from 'express'
import {
  createClass,
  getAllClasses,
  updateClass,
  getClass,
  getSubjectsByClass,
  deleteClass,
  getStudentsByClass,
} from "../Controllers/classController.js";

const router = express.Router()

router.post("/addclass", createClass);
router.get("/configureclass", getAllClasses);
router.get("/configureclass/:id", getClass);
router.get("/:classId/subjects",getSubjectsByClass)
router.get("/students/:classId", getStudentsByClass);
router.put("/updateclass/:id", updateClass);
router.delete("/deleteclass/:id", deleteClass);
export default router