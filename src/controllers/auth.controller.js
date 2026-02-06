import axios from "axios";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import cookieParser from "cookie-parser";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

const googleRedirect = asyncHandler(async (req, res) => {
  const url =
    "https://accounts.google.com/o/oauth2/v2/auth" +
    "?client_id=" +
    process.env.GOOGLE_CLIENT_ID +
    "&redirect_uri=" +
    process.env.GOOGLE_REDIRECT_URI +
    "&response_type=code" +
    "&scope=openid email profile";

  res.redirect(url);
});

const googleCallback = asyncHandler(async (req, res) => {
  const { code } = req.query;

  const tokenRes = await axios.post("https://oauth2.googleapis.com/token", {
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    code,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    grant_type: "authorization_code",
  });

  const googleUser = jwt.decode(tokenRes.data.id_token);

  let user = await User.findOne({ email: googleUser.email });

  if (!user) {
    user = await User.create({
      email: googleUser.email,
      fullname: googleUser.name,
      avatar: googleUser.picture,
      googleId: googleUser.sub,
      provider: "google",
    });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
  });

  res.cookie("token", token, { httpOnly: true });
  res.redirect("/dashboard");
});

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, fullName, password } = req.body;
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });

  if (existingUser) {
    throw new ApiError("User with given email or username already exists", 400);
  }

  const newUser = await User.create({
    username,
    email,
    fullName,
    password,
  });

  return res.status(201).json(new ApiResponse(200, newUser, "User registered successfully"));
});

export { googleRedirect, googleCallback, registerUser };
