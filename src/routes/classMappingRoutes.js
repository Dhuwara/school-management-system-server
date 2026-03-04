import express from "express";
import {
  createClassMapping,
  getAllClassMappings,
  getClassMappingByClass,
  updateClassMapping,
  deleteClassMapping,
  upsertClassMapping,
} from "../Controllers/classMappingController.js";

const router = express.Router();

router.post("/save", upsertClassMapping);
router.get("/getall", getAllClassMappings);
router.get("/:classId/:academicYear", getClassMappingByClass);
router.put("/update/:id", updateClassMapping);
router.delete("/delete/:id", deleteClassMapping);

export default router;
