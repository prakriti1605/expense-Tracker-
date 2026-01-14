import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import expenseRouter from "./routes/expenseRoute.js";
import connectDB from "./config/db.js";
import cors from "cors";

dotenv.config();

const app = express();
connectDB();

app.use(cors({
    origin:process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials:true,
    methods:["GET","POST","PUT","PATCH","DELETE"],
    allowedHeaders:["Content-Type","Authorization"]
}));

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Test routes
app.get("/", (req, res) => {
  console.log("Server is working");
  res.send("Server is working!");
});

// Expense routes
app.use("/api/v1", expenseRouter);

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;
