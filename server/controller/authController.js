import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import {ApiError} from "../utils/api-error.js";
import {ApiResponse} from "../utils/api-response.js";
import { asyncHandler } from "../utils/asyncHnadler.js";

//signup

export const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // JWT Token Generate karein
  
  const token = jwt.sign(
    { id: user._id, 
      email: user.email },
      process.env.JWT_SECRET || "ffihaofbhvzviwu8429AGIG8HALGB",
    { expiresIn: "3d" }
  );

  return res.status(201).json(
    new ApiResponse(
      201,
      {
        userId: user._id,
        email: user.email,
        token: token, // Ab token response mein jayega
      },
      "User created successfully"
    )
  );
});
//Login

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(400, "Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid credentials");
  }

  const token = jwt.sign(
    { id: user._id }, // iss id ka token generate karna hai
    process.env.JWT_SECRET, //ye ek secret hai jo humne .env file mein likha hai. Iss token se sign hoga. 
    { expiresIn: "3d" } //kab expire hoga.
  );
// yaha se hum token ko client ke pass bhejte hai taaki jab voh baad mein request send kare toh hum verify kar paye. 
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        token,
        userId: user._id,
        email: user.email,
      },
      "Login successful"
    )
  );
});