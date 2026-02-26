import express from "express";
import { configureCounter } from "../Controllers/counterController.js";

const router = express.Router();

router.post("/configure", configureCounter);

export default router;
