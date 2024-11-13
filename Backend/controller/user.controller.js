import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Function to register a new user
const userRegister = async (req, res) => {
  try {
    // Destructure user details from the request body
    const { fullname, email, password, role } = req.body;

    // Validate that all required fields are provided
    if (!fullname || !email || !password || !role) {
      return res.status(400).json({
        message: "Invalid details",
        success: false,
      });
    }

    // Check if a user with the given email already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User with this email already exist",
        success: false,
      });
    }

    // Hash the password using bcrypt before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user in the database
    await User.create({
      fullname,
      email,
      password: hashedPassword,
      role,
    });

    // Return success response
    return res.status(201).json({
      message: "User created",
      success: true,
    });
  } catch (error) {
    // Catch any errors and return a failure response
    return res.status(500).json({
      message: "User registration FAILED!!!",
      success: false,
    });
  }
};

// Function to log in a user
const userLogin = async (req, res) => {
  try {
    // Destructure the email and password from the request body
    const { email, password } = req.body;

    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Verify the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid credentials",
        success: false,
      });
    }

    // Create a JWT token for the user (expires in 1 hour)
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Prepare the user data (exclude sensitive information like password)
    const userData = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    // Set the token as a cookie in the response
    res.cookie("token", token, {
      httpOnly: true, // Prevents JavaScript access to the cookie
      sameSite: "strict", // Prevents CSRF attacks
      maxAge: 3600000, // Expires in 1 hour
    });

    // Return success response with user data and message
    return res.status(200).json({
      message: `Welcome back ${user.fullname}`,
      success: true,
      user: userData,
    });
  } catch (error) {
    console.error("Login error:", error); // Log error for debugging
    return res.status(500).json({
      message: "Login failed due to server error",
      success: false,
    });
  }
};

// Function to log out the user
const userLogout = async (req, res) => {
  try {
    // Check if the user has an active session (token in cookies)
    if (!req.cookies.token) {
      return res.status(400).json({
        message: "No active session found. Please log in first.",
        success: false,
      });
    }

    // Clear the token cookie to log the user out
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
    });

    // Return success response after logout
    return res.status(200).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.error(error); // Log error for debugging
    return res.status(500).json({
      message: "Error logging out",
      success: false,
    });
  }
};

// Function to update the user's profile information
const updateUserProfile = async (req, res) => {
  try {
    // Destructure updated user details from the request body
    const { fullname, email, phoneNumber, bio, skills } = req.body;

    // Convert skills from a comma-separated string to an array if present
    const skillsArray = skills
      ? skills.split(",").map((skill) => skill.trim())
      : [];

    // Update the authenticated user's profile in the database
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id, // Use req.user._id to get the logged-in user's ID
      { fullname, email, phoneNumber, bio, skills: skillsArray },
      { new: true } // Return the updated user document
    );

    // Check if the user was found and updated
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found during update.",
      });
    }

    // Return the updated user profile
    return res.status(200).json({
      success: true,
      message: "User profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile:", error); // Log error for debugging
    return res.status(500).json({
      success: false,
      message: "Error updating user profile",
    });
  }
};

// Export the functions for use in routes
export { userRegister, userLogin, userLogout, updateUserProfile };
