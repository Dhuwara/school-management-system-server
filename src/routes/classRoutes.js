import express from 'express'
import {
  configureClass,
  getAllClasses,
} from "../Controllers/classController.js";

const router = express.Router()

router.post("/configureclass",configureClass)
router.get("/configureclass", getAllClasses);

export default router