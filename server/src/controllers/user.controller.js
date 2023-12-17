import ApiError from "../utils/error.util.js";
import User from "../models/user.model.js";
import cloudinary from "cloudinary";
import fs from "fs";

const cookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  httpOnly: true,
  secure: true,
};

export const register = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return next(new ApiError("All fields are required", 400));
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new ApiError("User alreasy Exist with this email", 400);
    }

    const user = await User.create({
      fullName,
      email,
      password,
      avatar: {
        public_id: email,
        secure_url: "",
      },
    });
    if (!user) {
      throw new ApiError("User registration Failed, Please try again", 400);
    }

    //   TODO: File upload

    if (req.file) {
      console.log(req.file);
      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          resource_type: "auto",
        });

        if (result) {
          user.avatar.public_id = result.public_id;
          user.avatar.secure_url = result.secure_url;

          // remove file from local
          // fs.rm(`./public/temp/${req.file.filename}`);
          fs.unlinkSync(req.file.path);
        }
      } catch (error) {
        return next(new ApiError(error || "file not uploaded ", 500));
      }
    }

    // await user.save();

    const token = await user.generateJWTToken();
    user.password = undefined;
    // res

    return res.cookie("token", token, cookieOptions).status(201).json({
      success: true,
      message: "User registered Successfully",
      user,
    });
  } catch (error) {
    return next(new ApiError(error.message, 500));
  }
};

export const logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ApiError("All fields are required", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !user.comcomparePassword(user.password)) {
      return next(new ApiError("Email or Password does not match", 400));
    }

    const token = await user.generateJWTToken();
    user.password = undefined;

    res.cookie("token", token, cookieOptions);

    res.status(200).json({
      success: true,
      message: "User Logged in successfully",
      user,
    });
  } catch (error) {
    return next(new ApiError(error.message, 500));
  }
};
export const logOut = (req, res, next) => {
  try {
    res.cookie("token", null, {
      secure: true,
      maxAge: 0,
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    return next(new ApiError("User logged out failed", 500));
  }
};
export const getProfileDetail = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    res.status(200).json({
      success: true,
      message: "User details",
      user,
    });
  } catch (error) {
    return next(new ApiError("Failed to fetch User details", 500));
  }
};
