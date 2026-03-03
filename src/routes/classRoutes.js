import express from 'express'
import {
  createClass,
  getAllClasses,
  updateClass,
  getClass,
} from "../Controllers/classController.js";

const router = express.Router()

router.post("/addclass", createClass);
router.get("/configureclass", getAllClasses);
router.get("/configureclass/:id", getClass);
router.put("/updateclass/:id", updateClass);
export default router