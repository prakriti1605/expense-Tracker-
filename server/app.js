import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRouter from "./routes/authRoutes.js";
import expenseRouter from "./routes/expenseRoute.js";

dotenv.config();

const app = express();

// 1. CORS Configuration
const allowedOrigins = [
  "https://expense-tracker-git-auth-fix-prakritijain1205-7523s-projects.vercel.app",
  
  // Your permanent main production link (For when you merge later)
  "https://expense-tracker-pi-cyan.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    // !origin check zaroori hai kyunki server-to-server calls mein origin undefined hota hai
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// 2. Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Test route
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is healthy",
  });
});

// 4. Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/expense", expenseRouter);

// 5. 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// 6. Global Error-handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal server error",
    errors: err.errors || [],
    data: err.data || null,
  });
});

export default app;