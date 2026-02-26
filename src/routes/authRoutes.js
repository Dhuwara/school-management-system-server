import express from  'express'
import { addUsers, login } from "../Controllers/userController.js";
import { verifyToken } from '../middleware/authMiddleware.js';
const router = express.Router()

router.post("/adduser/:role", addUsers);
router.post("/login/",login)

router.get("/me", verifyToken, (req, res, next) => {
  res.status(200).json({
    id: req.user.id,
    role: req.user.role,
  });
});

export default router