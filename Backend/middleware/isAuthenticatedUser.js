import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const isAuthenticatedUser = async (req, res, next) => {
  try {
    // Check if token is present in cookies
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication token not found. Please login.",
      });
    }

    // Decode token to get userId
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded JWT:", decoded); // Log the decoded token for debugging

    // Find the user by userId from the token
    const user = await User.findById(decoded.userId);
    if (!user) {
      console.log("User not found for userId:", decoded.userId); // Log if user not found
      return res.status(404).json({
        success: false,
        message: "User not found. Invalid token.",
      });
    }

    // Attach user to req for use in subsequent routes
    req.user = user;
    next();
  } catch (error) {
    console.error("Error in isAuthenticatedUser middleware:", error.message);
    const errorMessage = error.name === "TokenExpiredError"
      ? "Session expired. Please login again."
      : "Invalid token. Please login.";

    return res.status(401).json({
      success: false,
      message: errorMessage,
    });
  }
};

export default isAuthenticatedUser;
