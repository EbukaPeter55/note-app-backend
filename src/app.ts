import express from "express";
import dotenv from "dotenv";
import noteRoutes from "./modules/notes/note.routes";
import { errorMiddleware } from "./middlewares/error.middleware";
import swaggerUi from "swagger-ui-express"
import { swaggerSpec } from "./config/swagger"

dotenv.config();

const app = express();

// Global middlewares
app.use(express.json());

// Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/notes", noteRoutes);

app.use(errorMiddleware);

export default app;
