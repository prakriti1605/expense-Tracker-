// import jwt from "jsonwebtoken";
// import { ApiError } from "../utils/api-error.js";

// export const protect = (req,res,next) => {
//     const authHeader = req.headers.authorization;
//     if(!authHeader || !authHeader.startsWith("Bearer")){
//         throw new ApiError(401,"No token provided");
//     }
//     const token = authHeader.split(" ")[1];
//     try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.user = decoded; // { id: ... }
//     next();
//     } catch (err) {
//         throw new ApiError(401, "Invalid token");
//     }
// };

// /*
// For every request:

// Checks header:

// Authorization: Bearer <token>
// Extracts token
// Verifies signature using JWT_SECRET

// If valid:

// req.user = { id: userId }
// If invalid:
// → throws error (401 Unauthorized)

// Without this middleware:

// login is meaningless
// anyone can access any data

// With this:

// only logged-in users pass through */