import { asyncHandler, ErrorHandler, Response } from "../utils/handlers.js";
import { User } from "../models/user.model.js";
import { generateFromEmail } from "unique-username-generator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { sendMail } from "../utils/sendMail.js";
import mongoose from "mongoose";
import { verifyEmailTemplate } from "../utils/html/verifyEmailTemplate.js";
import {
  getAvatarsFromCloudinary,
  uploadOnCloudinary,
} from "../lib/cloudinary.js";

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
      },
    );

    const refreshToken = await jwt.sign(
      {
        _id: user._id,
      },
      process.env.REFRESH_TOKEN_JWT_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      },
    );

    user.refreshToken = refreshToken;
    await user.save();

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ErrorHandler(
      500,
      "Something went wrong while generating refresh and access token.",
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
    "-password -refreshToken -otp",
  );

  if (!createdUser) {
    throw new ErrorHandler(
      500,
      "Something went wrong while registering the user",
    );
  }

  return res
    .status(200)
    .json(
      new Response(200, { user: createdUser }, "User registered Successfully"),
    );
});

export const googleAuth = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  console.log("req.body", req.body);

  try {
    // Check if user already exists
    let user = await User.findOne({ email });

    if (!user) {
      const username = generateFromEmail(email, 4);
      user = new User({
        email,
        username: username,
      });

      await user.save();
    }

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken -otp -name",
    );

    // Generate JWT
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      createdUser._id,
    );

    return res
      .status(200)
      .cookie("token", refreshToken, options)
      .json(
        new Response(
          200,
          { user: createdUser, accessToken },
          "User authenticated successfully",
        ),
      );
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

  if (!user?.password) {
    throw new ErrorHandler(
      400,
      "Invalid password, please reset your password.",
    );
  }

  const isPasswordValid = await bcrypt.compare(password, user?.password);

  if (!isPasswordValid) {
    throw new ErrorHandler(401, "Incorrect password");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id,
  );

  const loggedInUser = await User.findById(user?._id).select(
    "-password -refreshToken -otp",
  );

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new Response(
        200,
        { user: loggedInUser, accessToken },
        "User logged in successfully",
      ),
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
    { new: true },
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
    { new: true },
  );

  return res
    .status(200)
    .clearCookie("refreshToken", options)
    .json(new Response(200, null, "User logged out successfully"));
});

export const refreshAccessToken = asyncHandler(async (req, res, next) => {
  const oldRefreshToken = req.cookies.refreshToken;

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

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id,
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

  const otp = Math.floor(1000 + Math.random() * 9000);

  user.otp = otp;
  await user.save();

  const response = await sendMail(
    user?.email,
    "Reset Password",
    otp,
    forgetPasswordTemplate,
  );

  if (!response) {
    throw new ErrorHandler(500, "Failed to send email");
  }

  console.log("mail response", response);

  return res.json(new Response(200, null, "Check your mail and condfirm OTP"));
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

  return res.status(200).json(new Response(200, null, "OTP confirmed"));
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
  const response = await sendMail(
    user?.email,
    "Verify Your Email",
    otp,
    verifyEmailTemplate,
  );

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
    "-password -refreshToken -otp -__v -requests -friends -isVerified -isAdmin",
  );

  if (!user) {
    throw new ErrorHandler(404, "User not found");
  }

  return res
    .status(200)
    .json(new Response(200, user, "User profile fetched successfully"));
});

export const sendFriendRequest = asyncHandler(async (req, res, next) => {
  const { id } = req.body;

  if (!req.user) {
    throw new ErrorHandler(404, "User not found");
  }

  const friend = await User.findById(id);

  if (!friend) {
    throw new ErrorHandler(404, "Friend not found");
  }

  if (friend.requests.includes(req.user._id)) {
    throw new ErrorHandler(400, "Friend request already sent");
  }

  friend.requests.push(req.user._id);
  await friend.save();
  return res
    .status(200)
    .json(new Response(200, null, "Friend request sent successfully"));
});

export const removeFriend = asyncHandler(async (req, res, next) => {
  const { id } = req.body;

  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ErrorHandler(404, "User not found");
  }

  if (!user.friends.includes(new mongoose.Types.ObjectId(id))) {
    throw new ErrorHandler(400, "Friend not found");
  }

  const friend = await User.findById(id);

  if (!friend) {
    throw new ErrorHandler(404, "Friend not found");
  }

  user.friends = user.friends.filter(
    (friendId) => friendId.toString() !== id.toString(),
  );
  friend.friends = friend.friends.filter(
    (friendId) => friendId.toString() !== req.user._id.toString(),
  );
  await user.save();
  await friend.save();
  return res
    .status(200)
    .json(new Response(200, null, "Friend removed successfully"));
});

export const acceptFriendRequest = asyncHandler(async (req, res, next) => {
  const { id } = req.body;

  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ErrorHandler(404, "User not found");
  }

  const friend = await User.findById(id);

  if (!friend) {
    throw new ErrorHandler(404, "Friend not found");
  }

  user.friends.push(id);
  friend.friends.push(req.user._id);
  user.requests = user.requests.filter(
    (requestId) => requestId.toString() !== id.toString(),
  );
  await user.save();
  await friend.save();

  return res
    .status(200)
    .json(new Response(200, null, "Friend request accepted successfully"));
});

export const rejectFriendRequest = asyncHandler(async (req, res, next) => {
  const { id } = req.body;

  const user = await User.findById(req.user._id);

  if (!user?.requests.includes(new mongoose.Types.ObjectId(id))) {
    throw new ErrorHandler(400, "Friend request not found");
  }

  if (!user) {
    throw new ErrorHandler(404, "User not found");
  }
  user.requests = user.requests.filter(
    (requestId) => requestId.toString() !== id.toString(),
  );
  await user.save();
  return res
    .status(200)
    .json(new Response(200, null, "Friend request rejected successfully"));
});

export const getFriendRequests = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate({
    path: "requests",
    select: "email username avatar",
  });

  if (!user) {
    throw new ErrorHandler(404, "User not found");
  }
  return res
    .status(200)
    .json(
      new Response(200, user.requests, "Friend requests fetched successfully"),
    );
});

export const getFriendsAndRequests = asyncHandler(async (req, res, next) => {
  const { isFriend = "true", search = "", page = 1, limit = 10 } = req.query;
  const userId = req.user._id;

  const searchRegex = new RegExp(search, "i"); // Case-insensitive regex

  const pipeline = [
    {
      $match: { _id: new mongoose.Types.ObjectId(userId) },
    },
    {
      $project: {
        friendsOrRequests: isFriend === "true" ? "$friends" : "$requests",
      },
    },
    {
      $unwind: "$friendsOrRequests",
    },
    {
      $lookup: {
        from: "users",
        localField: "friendsOrRequests",
        foreignField: "_id",
        as: "friendDetails",
        pipeline: [
          {
            $match: { username: { $regex: searchRegex } },
          },
          {
            $project: { username: 1, avatar: 1, email: 1, createdAt: 1 },
          },
        ],
      },
    },
    {
      $unwind: {
        path: "$friendDetails",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $match: {
        friendDetails: { $ne: null }, // Only include matched users
      },
    },
    {
      $replaceRoot: { newRoot: "$friendDetails" },
    },
    {
      $sort: { createdAt: -1 }, // Sort by createdAt descending (optional)
    },
    {
      $facet: {
        metadata: [{ $count: "total" }],
        data: [
          { $skip: (parseInt(page) - 1) * parseInt(limit) },
          { $limit: parseInt(limit) },
        ],
      },
    },
  ];

  const result = await User.aggregate(pipeline);

  const metadata = result[0]?.metadata[0] || { total: 0 };
  const data = result[0]?.data || [];

  return res.status(200).json(
    new Response(
      200,
      data,
      metadata.total === 0
        ? "No matching users found"
        : "Users fetched successfully",
      {
        total: metadata.total,
        page: parseInt(page),
        limit: parseInt(limit),
      },
    ),
  );
});

export const getFriends = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate({
    path: "friends",
    select: "email username avatar createdAt",
  });

  if (!user) {
    throw new ErrorHandler(404, "User not found");
  }
  return res
    .status(200)
    .json(new Response(200, user.friends, "Friends fetched successfully"));
});

export const checkIsFriend = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(req.user._id);
  const searchedUser = await User.findById(id);
  let requested = false;
  if (
    searchedUser.requests.includes(new mongoose.Types.ObjectId(req.user._id))
  ) {
    requested = true;
  }
  if (!user) {
    throw new ErrorHandler(404, "User not found");
  }
  if (user.friends.includes(new mongoose.Types.ObjectId(id))) {
    return res
      .status(200)
      .json(
        new Response(
          200,
          { isFriend: true, requested: requested || false },
          "User is a friend",
        ),
      );
  } else {
    return res
      .status(200)
      .json(
        new Response(
          200,
          { isFriend: false, requested: requested || false },
          "User is not a friend",
        ),
      );
  }
});

export const changeAvatar = asyncHandler(async (req, res, next) => {
  const { avatar } = req.body;

  if (!avatar) {
    throw new ErrorHandler(400, "Avatar is required");
  }

  const user = await User.findOneAndUpdate(
    { _id: req.user._id },
    { avatar },
    { new: true },
  ).select("-password -refreshToken -otp");

  if (!user) {
    throw new ErrorHandler(404, "User not found");
  }

  return res
    .status(200)
    .json(new Response(200, user, "Avatar updated successfully"));
});

export const searchUser = asyncHandler(async (req, res, next) => {
  const { user = "", page = 1, limit = 10 } = req.query;
  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);
  const skip = (pageNumber - 1) * limitNumber;

  const matchStage = {
    username: { $regex: user, $options: "i" },
  };

  const pipeline = [
    { $match: matchStage },
    {
      $facet: {
        metadata: [{ $count: "total" }],
        data: [
          { $sort: { insertedAt: -1 } },
          { $skip: skip },
          { $limit: limitNumber },
          {
            $project: {
              username: 1,
              avatar: 1,
              createdAt: 1,
              bio: 1,
            },
          },
        ],
      },
    },
    {
      $project: {
        data: 1,
        total: { $arrayElemAt: ["$metadata.total", 0] },
      },
    },
  ];

  const result = await User.aggregate(pipeline);

  if (!result || result.length === 0) {
    throw new ErrorHandler(404, "No matching users found");
  }

  const { data, total } = result[0];
  const metadata = {
    total: total || 0,
    page: pageNumber,
    limit: limitNumber,
  };

  return res
    .status(200)
    .json(new Response(200, { data, metadata }, "Users fetched successfully"));
});

// admin
export const uploadAvatar = asyncHandler(async (req, res, next) => {
  const { file } = req;

  if (!file) {
    throw new ErrorHandler(400, "Avatar is required");
  }

  const uploadResult = await uploadOnCloudinary(file.path, "avatars");

  if (!uploadResult || !uploadResult.url) {
    throw new ErrorHandler(500, "Failed to upload avatar to Cloudinary");
  }

  return res
    .status(200)
    .json(
      new Response(
        200,
        { url: uploadResult.url },
        "Avatar uploaded successfully",
      ),
    );
});

export const getAllAvatars = asyncHandler(async (req, res) => {
  const { folder } = req.params;
  const data = await getAvatarsFromCloudinary(folder);

  if (!data || data.length === 0) {
    throw new ErrorHandler(500, "No avatars found");
  }

  return res
    .status(200)
    .json(new Response(200, data, "Avatars fetched successfully"));
});

// export const bulkRegister = asyncHandler(async (req, res, next) => {
//   const insertedUsers = [];
//   const skippedUsers = [];

//   for (const { username, email, password } of final) {
//     if ([email, username, password].some((field) => !field?.trim())) {
//       skippedUsers.push({ username, email, reason: "Missing required fields" });
//       continue;
//     }

//     const existedUser = await User.findOne({
//       $or: [{ username }, { email }],
//     });

//     if (existedUser) {
//       skippedUsers.push({ username, email, reason: "Already exists" });
//       continue;
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const user = await User.create({
//       email,
//       password: hashedPassword,
//       username: username.toLowerCase(),
//     });

//     insertedUsers.push({
//       id: user._id,
//       username: user.username,
//       email: user.email,
//     });
//   }

//   return res.status(200).json(
//     new Response(
//       200,
//       {
//         insertedCount: insertedUsers.length,
//         skippedCount: skippedUsers.length,
//         insertedUsers,
//         skippedUsers,
//       },
//       "Bulk registration complete"
//     )
//   );
// });
