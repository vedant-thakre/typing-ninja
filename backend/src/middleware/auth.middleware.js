import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { asyncHandler, ErrorHandler } from "../utils/handlers.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    // console.log("req.cookies", req.cookies);
    const accessToken = req.header("Authorization")?.replace("Bearer ", "");
    
    if (!accessToken) {
      throw new ErrorHandler(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_JWT_SECRET
    );

    const user = await User.findById(decodedToken?._id).select(
      " -password -refreshToken -otp"
    );

    if (!user) {
      throw new ApiError(401, "Invalid access token");
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("ERROERS", error);
    throw new ErrorHandler(401, "Invalid access token");
  }
});


