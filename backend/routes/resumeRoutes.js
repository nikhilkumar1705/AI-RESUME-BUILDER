import express from "express";
import upload from "../config/multer.js";
import protect from "../middleware/authMiddleware.js";
import {
  createResume,
  deleteResume,
  getPublicResumeById,
  getResumeById,
  updateResume,
  updateResumeTitle,
} from "../controllers/resumeController.js";

const resumeRouter = express.Router();

resumeRouter.post("/create", protect, createResume);
resumeRouter.get("/get/:resumeId", protect, getResumeById);
resumeRouter.get("/public/:resumeId", getPublicResumeById);
resumeRouter.put(
  "/update",
  protect,
  upload.single("image"),
  updateResume
);
resumeRouter.put("/update-title", protect, updateResumeTitle);
resumeRouter.delete("/delete/:resumeId", protect, deleteResume);

export default resumeRouter;