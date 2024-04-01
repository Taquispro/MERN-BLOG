import User from "../models/user.models.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All fields are required")); //Using Error Handler function from error.js
  }
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUSer = new User({
    username,
    email,
    password: hashedPassword,
  });
  try {
    await newUSer.save();
    res.json({ message: "Signup Successful" });
  } catch (error) {
    next(error);
  }
};
