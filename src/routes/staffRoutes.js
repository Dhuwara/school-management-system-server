import express from 'express'
import { addStaff, getAllStaffs } from '../Controllers/staffController.js'

const router = express.Router()

router.post("/addStaff", addStaff);
router.get("/getallstaffs",getAllStaffs)

export default router