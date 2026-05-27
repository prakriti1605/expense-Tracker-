import express from "express";
import cors from "cors";

import dotenv from "dotenv";

import authRouter from "./routes/authRoutes.js";
import expenseRouter from "./routes/expenseRoute.js";

dotenv.config();

const app = express();
const allowedOrigins = process.env.CORS_ORIGIN?.split(",") || ["http://localhost:5173"];
app.use(cors({
    origin:allowedOrigins,
    credentials:true,
    methods:["GET","POST","PUT","PATCH","DELETE"],
    allowedHeaders:["Content-Type","Authorization"]
}));

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Test routes
app.get("/health", (req, res) => {
  res.status(200).json({
    success:true,
    message:"API is healthy",
  });
});

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/expense", expenseRouter);
// 404 error
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});


// Global Error-handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  
  res.status(statusCode).json({
    success:false,
    message:err.message || "Internal server error ",
    errors:err.errors||[],
    data:err.data || null,
  });
});

export default app;
