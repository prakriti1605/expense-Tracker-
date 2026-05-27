import jwt from "jsonwebtoken";
import { ApiError } from "../utils/api-error.js";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        throw new ApiError(401,"No token provided");
    }
    const token = authHeader.split(" ")[1];
    try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if(!user){
        throw new ApiError(401,"User no longer exists");
    }
    req.user = user;  //{ id: ... }
    next();
    } catch (err) {
        throw new ApiError(401, "Invalid token");
    }
};

/*
For every request:
Checks header:
Authorization: Bearer <token>
Extracts token
Verifies signature using JWT_SECRET
If valid:
req.user = { id: userId }
If invalid:
→ throws error (401 Unauthorized)
Without this middleware:
login is meaningless, anyone can access any data
With this:
only logged-in users pass through 

Pahle maine jab code likha toh user ko identify nhi karwaya tha. Ussey ye problem hoti hai ki suppose token valid tha, but ussey pahle hi user ne id delete kardi. AUr hum toh sirf token check kar rahe hai. Toh that creates inconsistency. Isilie naye code mein we are going to check if the id exists or not too. 

*/