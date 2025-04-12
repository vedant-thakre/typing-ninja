import { asyncHandler, ErrorHandler, Response } from "../utils/handlers.js";
import { User } from "../models/user.model.js";
import { generateFromEmail } from "unique-username-generator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { sendMail } from "../utils/sendMail.js";
import { verifyEmailTemplate } from "../utils/html/verifyEmailTemplate.js";

const options = {
  httpOnly: true,
  secure: true,
  sameSite: "None",
};

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = await jwt.sign(
      {
        _id: user._id,
        email: user.email,
        username: user.username,
      },
      process.env.ACCESS_TOKEN_JWT_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );

    const refreshToken = await jwt.sign(
      {
        _id: user._id,
      },
      process.env.REFRESH_TOKEN_JWT_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      }
    );
    
    user.refreshToken = refreshToken;
    await user.save();

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ErrorHandler(
      500,
      "Something went wrong while generating refresh and access token."
    );
  }
};

export const register = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  if ([email, username, password].some((field) => field.trim() === "")) {
    throw new ErrorHandler(400, "All fileds are Required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ErrorHandler(400, "User with email or username already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    email,
    password: hashedPassword,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken -otp"
  );

  if (!createdUser) {
    throw new ErrorHandler(
      500,
      "Something went wrong while registering the user"
    );
  }

  return res
    .status(201)
    .json(new Response(200, {user:createdUser}, "User registered Successfully"));
});

export const googleAuth = asyncHandler(async (req, res, next) => {
  const { name, email } = req.body;
  console.log("req.body", req.body);

  try {
    // Check if user already exists
    let user = await User.findOne({ email });

    if (!user) {
      const username = generateFromEmail(email, 4);
      user = new User({
        email,
        name: name,
        username: username,
      });

      await user.save();
    }

    const createdUser = await User.findById(user._id).select("-password");

    // Generate JWT
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      createdUser._id
    );

    return res
      .status(200)
      .cookie("token", refreshToken, options)
      .json(new Response(200, {user: createdUser, accessToken}, "User authenticated successfully"));
  } catch (error) {
    throw new ErrorHandler(400, "Server error");
  }
});

export const login = asyncHandler(async (req, res, next) => {
  const { credentials, password } = req.body;

  if (!credentials) {
    throw new ErrorHandler(400, "Username or email is required");
  }

  if (!password) {
    throw new ErrorHandler(400, "Password is required");
  }
  
  let user;
  const isEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (isEmail(credentials)) {
    user = await User.findOne({ email: credentials });
  } else {
    user = await User.findOne({ username: credentials });
  }

  
  if (!user) {
    throw new ErrorHandler(404, "User does not exist.");
  }

  if(!user?.password){
    throw new ErrorHandler(404, "Password not found. Login with google or reset password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new ErrorHandler(401, "Incorrect password");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken -otp"
  );

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new Response(
        200,
        { user: loggedInUser, accessToken },
        "User logged in successfully"
      )
    );
});

export const getUser = asyncHandler(async (req, res, next) => {
  return res.status(200).json(new Response(200, req.user, "User found"));
});

export const updateUserDetails = asyncHandler(async (req, res, next) => {
  const { email, dailyGoal, age, bio, country, gender } = req.body;

  const user = await User.findOneAndUpdate(
    { _id: req.user._id },
    { email, dailyGoal, age, bio, country, gender },
    { new: true }
  ).select("-password -refreshToken -otp");

  if (!user) {
    throw new ErrorHandler(404, "User not found");
  }
  return res
    .status(200)
    .json(new Response(200, user, "User details updated successfully"));
});

export const logout = asyncHandler(async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;

  await User.findOneAndUpdate(
    { refreshToken: refreshToken },
    { $unset: { refreshToken: 1 } },
    { new: true }
  )

  return (
    res
      .status(200)
      .clearCookie("refreshToken", options)
      .json(new Response(200, null, "User logged out successfully"))
  );
});

export const refreshAccessToken = asyncHandler(async (req, res, next) => {
  const oldRefreshToken = req.cookies.refreshToken;

  console.log("oldRefreshToken", oldRefreshToken);

  if (!oldRefreshToken) {
    throw new ErrorHandler(401, "Unauthorized request");
  }

  const user = await User.findOne({
    refreshToken: oldRefreshToken,
  });

  console.log("user refresh", user);

  if (!user) {
    throw new ErrorHandler(401, "Unauthorized request");
  }

  const { accessToken, refreshToken } =  await generateAccessAndRefreshToken( 
    user._id      
  );

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .json(new Response(200, { accessToken }, "Access token refreshed"));
});

export const forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    throw new ErrorHandler(400, "Invalid email");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ErrorHandler(404, "User not found");
  }

  const otp =  Math.floor(1000 + Math.random() * 9000);

  user.otp = otp;
  await user.save();

  const response = await sendMail(user?.email, "Reset Password", otp, forgetPasswordTemplate);

  if (!response) {
    throw new ErrorHandler(500, "Failed to send email");
  }

  console.log("mail response", response);

  return res
    .json(new Response(200, null, "Check your mail and condfirm OTP"));
});

export const confirmOTP = asyncHandler(async (req, res, next) => {
  const { otp } = req.body; 
  if (!otp) {
    throw new ErrorHandler(400, "Invalid otp");
  }

  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ErrorHandler(404, "User not found");
  }

  if (user.otp !== otp) {
    throw new ErrorHandler(400, "Invalid otp");
  }

  user.otp = null;
  await user.save();  

  return res
    .status(200)
    .json(new Response(200, null, "OTP confirmed"));
});

export const resetPassword = asyncHandler(async (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    throw new ErrorHandler(400, "Invalid password");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt); 

  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ErrorHandler(404, "User not found");
  }

  user.password = hashedPassword;
  await user.save();

  return res
    .status(200)
    .json(new Response(200, null, "Password changed successfully"));
});

export const verifyEmail = asyncHandler(async (req, res, next) => {
  const otp = Math.floor(1000 + Math.random() * 9000);
  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ErrorHandler(404, "User not found");
  }

  if (user.isVerified) {
    throw new ErrorHandler(400, "User already verified");
  }
  const response = await sendMail(user?.email, "Verify Your Email", otp, verifyEmailTemplate);

  if (!response) {
    throw new ErrorHandler(500, "Failed to send email");
  }

  user.otp = otp;
  await user.save();

  return res
    .status(200)
    .json(new Response(200, null, "Check your mail and confirm OTP"));  

});

export const confirmEmailOtp = asyncHandler(async (req, res, next) => {
  const { otp } = req.body;
  if (!otp) {
    throw new ErrorHandler(400, "Invalid otp");
  }
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ErrorHandler(404, "User not found");
  }
  if (user.otp !== otp) {
    throw new ErrorHandler(400, "Invalid otp");
  }
  user.otp = null;
  user.isVerified = true;
  await user.save();
  return res
    .status(200)
    .json(new Response(200, null, "Email verified successfully"));
});

export const getUserProfile = asyncHandler(async (req, res, next) => {
  const { username } = req.query;
  
  if (!username) {
    throw new ErrorHandler(400, "Username is required");
  }
  const user = await User.findOne({ username }).select(
    "-password -refreshToken -otp -__v -createdAt -updatedAt -isVerified" 
  );

  if (!user) {
    throw new ErrorHandler(404, "User not found");
  }

  return res
    .status(200)
    .json(new Response(200, user, "User profile fetched successfully"));
}
);