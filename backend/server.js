import express from "express";
import cors from "cors";
import "dotenv/config";
import dns from 'dns'
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";

dns.setServers([
  "1.1.1.1",
  "8.8.8.8",
]);

const app = express();
const PORT = process.env.PORT || 9000;

await connectDB();

app.use(cors());

app.use(express.json({ limit: "10mb" }));

app.get("/", (req, res) => {
  res.status(200).send("Server is live.");
});

app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/ai", aiRouter);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});