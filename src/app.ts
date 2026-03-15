import express from "express";
import dotenv from "dotenv";
import noteRoutes from "./modules/notes/note.routes";
import { errorMiddleware } from "./middlewares/error.middleware";

dotenv.config();

const app = express();

// Global middlewares
app.use(express.json());

// Health check
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/notes", noteRoutes);

app.use(errorMiddleware);

export default app;
