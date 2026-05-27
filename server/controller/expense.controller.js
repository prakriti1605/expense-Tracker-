
import { Expense } from "../models/expense.model.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/asyncHnadler.js";

// display expense whenever user is opening the website. 
export const getExpenses = asyncHandler(async (req, res) => {
    const expenses = await Expense.find({
        user: req.user.id
    }).sort({ date: -1 });

    return res
    .status(200)
    .json(
      new ApiResponse(200, expenses, "Expenses fetched successfully")
    );
  });

// add a new expense or create expense
export const addExpense = asyncHandler(async (req,res) => {
        // console.log(req.user);
        const {description,amount,category,date,notes} = req.body;

        if(
        !description?.trim() 
        || amount===undefined || 
        !category?.trim()){
            throw new ApiError(
                400, 
                "Required fields are missing" );
        }
    const newExpense = await Expense.create(
        {
            description:description.trim(),
            amount,
            category:category.trim(),
            date,
            notes,
            user: req.user.id
        });
    return res
    .status(201)
    .json(
        new ApiResponse(
            201,
            newExpense,
            "expense added successfully" )
    );
});

//delete an expense
export const deleteExpense = asyncHandler(async(req,res) => {
        const {id} = req.params; //iss id vale expense ko delete karna hai. 
        const deletedExpense = await Expense.findOneAndDelete({
            _id : id,
            user: req.user.id
        });

        if(!deletedExpense){
            throw new ApiError(404, "expense to be deleted not found");
        }

        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                null,
                "Expense deleted"
            )
        );

    });


// patch style, sirf voh hi fieldss end karenge jo update honi hogi. Aur sirf un hi fields ko validate karenge toh receive karenge request mein.

export const updateExpense = asyncHandler(async(req,res) => {
    
    const {id} = req.params; // this is the id of expense we have to update
    const {description,amount,category,date,notes} = req.body; // this is the new data we have to swap with.

    // validate ONLY provided fields

    if (
        description !== undefined &&
        description.trim() === ""
    ) {
        throw new ApiError(
            400,
            "Description cannot be empty"
        );
    }

    if (
        category !== undefined &&
        category.trim() === ""
    ) {
        throw new ApiError(
            400,
            "Category cannot be empty"
        );
    }

    if (
        amount !== undefined &&
        amount <= 0
    ) {
        throw new ApiError(
            400,
            "Amount must be greater than 0"
        );
    }

    const updateData = {};

    if (description !== undefined)
        updateData.description = description.trim();

    if (amount !== undefined)
        updateData.amount = amount;

    if (category !== undefined)
        updateData.category = category.trim();

    if (date !== undefined)
        updateData.date = date;

    if (notes !== undefined)
        updateData.notes = notes;
    //find and update expense
    const updatedExpense = await Expense.findByIdAndUpdate( 
        {_id : id,
        user: req.user.id
        },
        {
            description,
            amount,
            category,
            date,
            notes 
        },
        {
            new: true, 
            runValidators: true
        })
        //new -> by default findByIdAndUpdate function returns the old document before the update. new: True ka mtlb nayi value jo update hui hai voh return karo. 
        //runValidators -> ensures all schemas validation like amount>0 are checked on updated values

    if (!updatedExpense) {
      throw new ApiError(404, "Expense not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, updatedExpense, "Expense updated successfully"));
    });

/*
if (
    description !== undefined &&
    description.trim() === ""
)
yaha two checks ho rahe hai. 
first condition : kya frontend ne description send kiya hai? */
