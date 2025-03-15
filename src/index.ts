import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import redisClient from "./config/redis";
import userRoutes from "./routes/userRoutes";
import businessRoutes from "./routes/businessRoutes";
import { swaggerSpec, swaggerUi } from "./swagger";

dotenv.config();

export const app = express();
app.use(express.json());

// Connect to MongoDB and Redis
if (process.env.NODE_ENV !== "test") {
  connectDB();
}

// Register API Routes
app.use('/api/v1/users', userRoutes);
app.use("/api/v1/business", businessRoutes);

// Serve Swagger docs at /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Test Route
app.get("/", (_req, res) => {
  res.send("SaaS Backend Running");
});

// Only start the server if not running tests
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on ports: ${PORT}`));
}

export default app;
