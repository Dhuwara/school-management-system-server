import express from 'express'
import {
  addSubject,
  getallSubjects,
  updatesubject,
} from "../Controllers/subjectController.js";

const router = express.Router()

router.post("/addsubject", addSubject)
router.get("/getallsubjects", getallSubjects);
router.put("/updatesubject/:id", updatesubject);
export default router