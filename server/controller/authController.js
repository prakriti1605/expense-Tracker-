// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import User from "../models/User.js";
// import {ApiError} from "../utils/api-error.js";
// import {ApiResponse} from "../utils/api-response.js";

// //signup
// export const signup = async (req, res) => {
//   const { name, email, password } = req.body;

//   if (!name || !email || !password) {
//     throw new ApiError(400, "All fields are required");
//   }

//   const existingUser = await User.findOne({ email });

//   if (existingUser) {
//     throw new ApiError(400, "User already exists");
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const user = await User.create({
//     name,
//     email,
//     password: hashedPassword,
//   });

//   return res.status(201).json(
//     new ApiResponse(
//       201,
//       {
//         userId: user._id,
//         email: user.email,
//       },
//       "User created successfully"
//     )
//   );
// };
// //Login

// export const login = async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     throw new ApiError(400, "Email and password are required");
//   }

//   const user = await User.findOne({ email });

//   if (!user) {
//     throw new ApiError(400, "Invalid credentials");
//   }

//   const isPasswordValid = await bcrypt.compare(password, user.password);

//   if (!isPasswordValid) {
//     throw new ApiError(400, "Invalid credentials");
//   }

//   const token = jwt.sign(
//     { id: user._id },
//     process.env.JWT_SECRET,
//     { expiresIn: "7d" }
//   );

//   return res.status(200).json(
//     new ApiResponse(
//       200,
//       {
//         token,
//         userId: user._id,
//         email: user.email,
//       },
//       "Login successful"
//     )
//   );
// };