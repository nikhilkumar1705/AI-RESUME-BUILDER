import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  enhanceJobDescription,
  enhanceProfessionalSummary,
  generateSummary,
  uploadResume,
} from "../controllers/aiController.js";

const aiRouter = express.Router();

aiRouter.post(
  "/enhance-pro-sum",
  protect,
  enhanceProfessionalSummary
);

aiRouter.post(
  "/enhance-job-desc",
  protect,
  enhanceJobDescription
);

aiRouter.post(
  "/upload-resume",
  protect,
  uploadResume
);

aiRouter.post(
  "/generate-summary",
  protect,
  generateSummary
);

export default aiRouter;