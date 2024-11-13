import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// Middleware to check if the user is authenticated
const isAuthenticatedUser = async (req, res, next) => {
  try {
    // Check if the token is present in the cookies
    const { token } = req.cookies;

    // If no token is found, return an error message
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication token not found. Please login.",
      });
    }

    // Decode the token using JWT to extract user information (userId)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //console.log("Decoded JWT:", decoded); // Log the decoded token for debugging

    // Find the user by userId, which is stored in the decoded token
    const user = await User.findById(decoded.userId);
    if (!user) {
      console.log("User not found for userId:", decoded.userId); // Log if user not found
      return res.status(404).json({
        success: false,
        message: "User not found. Invalid token.",
      });
    }

    // Attach the user object to the req object, so it can be used in subsequent route handlers
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Log the error message for debugging purposes
    console.error("Error in isAuthenticatedUser middleware:", error.message);

    // Customize error message based on the type of JWT error
    const errorMessage =
      error.name === "TokenExpiredError"
        ? "Session expired. Please login again."
        : "Invalid token. Please login.";

    // Return an error response if the token is invalid or expired
    return res.status(401).json({
      success: false,
      message: errorMessage,
    });
  }
};

// Export the middleware function for use in routes
export default isAuthenticatedUser;
