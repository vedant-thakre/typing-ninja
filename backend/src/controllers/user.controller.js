import { OAuth2Client } from "google-auth-library";
import { asyncHandler, ErrorHandler, Response  } from "../utils/handlers.js";
import { User } from "../models/user.model.js";

const client = new OAuth2Client();

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

    const user = await User.create({
      email,
      password,
      username: username.toLowerCase(),
    });

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    if (!createdUser) {
      throw new ErrorHandler(
        500,
        "Something went wrong while registering the user"
      );
    }

    return res
      .status(201)
      .json(new Response(200, createdUser, "User registered Successfully"));
});

export const googleAuth = asyncHandler(async (req, res, next) => {
    console.log("Google Auth Request"); 
    const { token } = req.body;

    console.log("req.body",req.body);

    if (!token) {
      throw new ErrorHandler(400, "Token is required");
    }

    try {
      // Verify the token
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const { email, name } = ticket.getPayload();

      // Check if user already exists
      let user = await User.findOne({ email });

      if (!user) {
        user = new User({
          email,
          name: name,
          username: name.toLowerCase().replace(/\s+/g, ""),
        });

        await user.save();
      }

      // Generate JWT
      const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      // Set cookie
      res.cookie("token", jwtToken, { httpOnly: true });

      return new Response(200, null, "User authenticated successfully");
    } catch (error) {
      throw new ErrorHandler(400, "Server error");
    }
});

export const login = asyncHandler(async (req, res, next) => {});

export const logout = asyncHandler(async (req, res, next) => {});

export const getUser = asyncHandler(async (req, res, next) => {});
