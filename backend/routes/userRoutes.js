import express from 'express'
import { registerUser, login, updateProfile, getProfile } from "../controllers/userController.js";
import { loginValidation, signupValidation } from '../middlewares/AuthValidation.js';
import protect from '../middlewares/Auth.js';

const router = express.Router();

router.post('/register',signupValidation,registerUser);
router.post("/login", loginValidation, login);
router.get("/profile",protect, getProfile);
router.put("/update",protect, updateProfile);

export default router