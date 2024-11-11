import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const userRegister = async (req, res) => {
  try {
    const { fullname, email, password, role } = req.body;

    if (!fullname || !email || !password || !role) {
      return res.status(400).json({
        message: "Invalid details",
        success: false,
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "User with this email already exist",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      password: hashedPassword,
      role,
    });

    return res.status(201).json({
      message: "User created",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "User registration FAILED!!!",
      success: false,
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid credentials",
        success: false,
      });
    }

    // Create JWT token with userId
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Prepare user data without sensitive info
    const userData = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    // Set the token as a cookie
    res.cookie("token", token, {
      httpOnly: true,     // Prevents JavaScript access to the cookie
      // secure: process.env.NODE_ENV === "production", // Use HTTPS in production
      sameSite: "strict", // Prevents CSRF attacks
      maxAge: 3600000     // Expires in 1 hour
    });

    // Respond with user data (token is in the cookie)
    return res.status(200).json({
      message: `Welcome back ${user.fullname}`,
      success: true,
      user: userData,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "Login failed due to server error",
      success: false,
    });
  }
};



const userLogout = async (req, res) => {
  try {
    if (!req.cookies.token) {
      return res.status(400).json({
        message: "No active session found. Please log in first.",
        success: false,
      });
    }

    // Clear the token cookie
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
    });

    return res.status(200).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.error(error); // Log error for debugging purposes
    return res.status(500).json({
      message: "Error logging out",
      success: false,
    });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;

    // Convert skills to array if it’s a comma-separated string
    const skillsArray = skills ? skills.split(',').map(skill => skill.trim()) : [];

    // Update the authenticated user's profile
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,  // Use req.user._id directly
      { fullname, email, phoneNumber, bio, skills: skillsArray },
      { new: true }  // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found during update.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating user profile",
    });
  }
};


export { userRegister, userLogin, userLogout, updateUserProfile };
