
import { Expense } from "../models/expense.model.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";


export const getExpenses = async (req, res, next) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });

    return res
    .status(200)
    .json(
      new ApiResponse(200, expenses, "Expenses fetched successfully")
    );

  } catch (error) {
    console.log((error));
    next(error)
  }
};
export const addExpense = async (req,res,next) => {
    try{
        const {description,amount,category,date,notes} = req.body;
        if(!description || !amount || !category){
            throw new ApiError(400, "Required fields are missing");
        }
    
    const newExpense = await Expense.create(
        {
            description,
            amount,
            category,
            date,
            notes
        });
    return res.status(201)
    .json(
        new ApiResponse(201,newExpense,"expense added successfully")
    );
    }
catch(error){
    next(error);
}
}
export const deleteExpense = async(req,res,next) => {
    try {
        const {id} = req.params;
        const expense = await Expense.findByIdAndDelete(id);

        if(!expense){
            throw new ApiError(404, "expense to be deleted not found");
        }

        return res.status(200)
        .json(
            200, "Expense deleted"
        );

    } catch (error) {
        next(error);
    }
}

export const updateExpense = async(req,res,next) => {
    
    const {id} = req.params;
    const {description,amount,category,date,notes} = req.body;

    try{
    //validate required fields
    if(!description || !amount ||!category){
        throw new ApiError(400,"required fields are missing");
    }
    //find and update expense
    const updatedExpense = await Expense.findByIdAndUpdate( id, {
        description,amount,category,date,notes },
        {new: true, runValidators: true })
        //by default this function returns the old document before the update
        //ensures all schemas validation like amount>0 are checked on updated values

    if (!updatedExpense) {
      throw new ApiError(404, "Expense not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, updatedExpense, "Expense updated successfully"));
    }catch (error) {
        console.error("update expense error", error)
        return res.status(500).json({ message: error.message, stack: error.stack });
    }
};



