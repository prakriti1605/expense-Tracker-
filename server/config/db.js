//yaha database mongodb ko connect karte hai apni application se using url

import dotenv from "dotenv";
dotenv.config(); //  MUST be first
import mongoose from "mongoose";


const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log("mongoDb connected");
    } catch(error){
        console.error("MongoDB connection error",error);
        process.exit(1);
    }
}
export default connectDB;