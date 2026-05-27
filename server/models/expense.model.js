import  mongoose ,{Schema } from "mongoose";

export const expenseSchema = new mongoose.Schema(
    {
        description:{
            type:String,
            required:true,
            trim:true,
            maxLength:100
        },
        amount: {
            type:Number,
            required:true,
            min:0,
        },
        category: {
            type:String,
            required:true,
            enum: [
                "Food",
                "Transportation",
                "Entertainment",
                "Shopping",
                "Bills",
                "Healthcare",
                "Lent money to friends",
                "Other"
            ]
        },
        user:{
            type: Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        date: {
            type:Date,
            default:Date.now
        },
        notes:{
            type:String,
            trim:true,
            maxLength:500
        },
    },
    {timestamps:true}
);

export const Expense = mongoose.model("expenses", expenseSchema);