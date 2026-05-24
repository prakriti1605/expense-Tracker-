import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";
import mongoose from "mongoose";

const PORT = process.env.PORT || 8000;
const startServer = async()=>{
  try{
    await connectDB(); // connect first
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
    
    // shutdown procedure
    process.on("SIGINT",async () => {
      await mongoose.connection.close();
      server.close(() => {
        console.log("Server stop")
        process.exit(0);
      });
    });
  }catch(err){
    console.error("Startup failed",err);
    process.exit(1);
  }
};

startServer();


