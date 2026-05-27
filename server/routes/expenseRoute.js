import  { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
const router = Router();
import { getExpenses,addExpense,deleteExpense, updateExpense } from "../controller/expense.controller.js";

router.get("/", protect, getExpenses);
router.post("/", protect, addExpense);
router.delete("/:id", protect, deleteExpense);
router.put("/:id", protect, updateExpense);

export default router;