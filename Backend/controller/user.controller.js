import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {uploadFiles} from "./fileUploadController.js";

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
    const { email, password, role } = req.body;

    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    // console.log("Type of DB Role:", user.role);
    // console.log("Type of Login Role:", role);
    if (user.role !== role) {
      return res.status(403).json({
        message: "User role mismatch",
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
      expiresIn: "30m",
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
      sameSite: "None", // Prevents CSRF attacks
      secure: true,
      maxAge: 30 * 60 * 1000, // 30 minutes
    });

    // Return success response with user data and message
    return res.status(200).json({
      message: `Welcome back ${user.fullname}`,
      success: true,
      user: userData,
      token,
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
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// Function to update the user's profile information
const updateUserProfile = async (req, res) => {
  try {
    // Destructure updated user details from the request body
    const { fullname, email, phoneNumber, bio, skills } = req.body;

    // Convert skills to an array if it's a comma-separated string
    let skillArray = [];
    if (skills) {
      skillArray = Array.isArray(skills)
        ? skills.map((skill) => skill.trim())
        : skills.split(",").map((skill) => skill.trim());
    }

    // Handle file uploads if any
    let profilePicUrl = "";
    let resumeUrl = "";

    if (req.files) {
      const fileUploadResponse = await uploadFiles(req, res); // Call the uploadFiles function to handle file uploads

      // Retrieve the file URLs from the response and assign them
      profilePicUrl = fileUploadResponse.profilePicUrl || "";
      resumeUrl = fileUploadResponse.resumeUrl || "";
    }

    // Find the user in the database
    const userId = req.user._id; // Get the authenticated user's ID from the request
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update the user's profile
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skillArray.length > 0) user.profile.skills = skillArray;
    if (profilePicUrl) user.profile.profilePic = profilePicUrl;
    if (resumeUrl) {
      user.profile.resume = resumeUrl;
      user.profile.resumeName = req.files?.resume[0]?.originalname || "resume.pdf"; // Fallback file name
    }

    // Save the updated user
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
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
