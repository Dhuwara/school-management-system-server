import express from 'express'
import addSubject from '../Controllers/subjectController.js'

const router = express.Router()

router.post("/addsubject", addSubject)

export default router