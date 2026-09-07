import express from "express";

import {
    registerUser,
    loginUser,
    verifyOtp,
    resendOtp,
    forgotPassword,
    verifyResetOtp,
    resetPassword,
    getUserData,
    getUserResumes,
} from "../controllers/userController.js";

import protect from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/verify-otp", verifyOtp);
userRouter.post("/resend-otp", resendOtp);

userRouter.post("/login", loginUser);

userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/verify-reset-otp", verifyResetOtp);
userRouter.post("/reset-password", resetPassword);

userRouter.get("/data", protect, getUserData);
userRouter.get("/resumes", protect, getUserResumes);

export default userRouter;