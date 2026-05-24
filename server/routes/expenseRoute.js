import  { Router } from "express";
// import { protect } from "../middleware/authMiddleware.js";
const router = Router();
import { getExpenses,addExpense,deleteExpense, updateExpense } from "../controller/expense.controller.js";

router.get("/expense", getExpenses);
router.post("/expense", addExpense);
router.delete("/expense/:id", deleteExpense);
router.put("/expense/:id", updateExpense);

export default router;