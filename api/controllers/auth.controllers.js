import User from "../models/user.models.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

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
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
  }
  try {
    const validUser = await User.findOne({ email }); //Search for the passed email in the database
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password); //bcryptjs convert password into hash code and compare sync compare the hash code of password with hash code of password of valid user
    if (!validPassword) {
      return next(errorHandler(404, "Invalid Password"));
    }
    //sign() is used to store encrypted value(with the help of secret key) and stored as a cookie for faster signin
    const token = jwt.sign(
      {
        id: validUser._id,
      },
      process.env.JWT_SECRET
    );
    const { password: pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
