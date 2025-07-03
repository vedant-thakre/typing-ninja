import { asyncHandler, ErrorHandler } from "../utils/handlers.js";

export const verifyAdmin = asyncHandler((req, res, next) => {
  if (!req.user?.isAdmin) {
    throw new ErrorHandler(403, "Forbidden: Admins only");
  }
  next();
});
