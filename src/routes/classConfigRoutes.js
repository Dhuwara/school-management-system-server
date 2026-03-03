import express from "express";
import {
  upsertClassConfig,
  getConfig,
} from "../controllers/classConfigController.js";

const router = express.Router();

router.post("/upsert", upsertClassConfig);
router.get('/getconfig',getConfig)

export default router;
