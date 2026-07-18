import express from 'express'
import { getUserById, getUserData, getUserResumes, loginUser, registerUser,  } from '../controllers/userController.js';
import protect from '../middleware/authMiddleware.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/data', protect, getUserById);
userRouter.get('/resumes', protect, getUserResumes)
userRouter.get('/data', protect, getUserData);

export default userRouter;