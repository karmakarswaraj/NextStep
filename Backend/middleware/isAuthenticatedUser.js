import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// Middleware to check if the user is authenticated
const isAuthenticatedUser = async (req, res, next) => {
  try {
    // Check if the token is present in the cookies
    console.log('Headers:', req.headers);  // Log headers to verify cookies are sent
    console.log('Cookies:', req.cookies);  // Log cookies to check their content
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
    if (error.name === "JsonWebTokenError") {
      // Handle general JWT errors (e.g., invalid signature, malformed token)
      console.error("JWT error:", error.message);
      return res.status(401).json({
        success: false,
        message: "Invalid token. Please login.",
      });
    } else if (error.name === "TokenExpiredError") {
      // Handle specific TokenExpiredError
      // ... (existing code)
    } else {
      // Handle unexpected errors
      console.error("Unexpected error:", error.message);
      // You might want to return a generic error or log for debugging
    }
  }
};

// Export the middleware function for use in routes
export default isAuthenticatedUser;
