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
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Invalid details",
        success: false,
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "No user Found",
        success: false,
      });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      return res.status(400).json({
        message: "Incorrect password",
        success: false,
      });
    }

    if (user.role !== role) {
      return res.status(400).json({
        message: "User with this role is not valid",
        success: false,
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    const userData = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, { httpsOnly: true, sameSite: "strict" })
      .json({
        message: `Welcome back ${user.fullname}`,
        success: true,
        user: userData,
      });
  } catch (error) {
    return res.status(500).json({
      message: "User login FAILED!!!",
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

    // Convert skills to an array if it's a comma-separated string
    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",").map((skill) => skill.trim());
    }

    // Get the user ID from the authenticated user (set by the middleware)
    const userId = req.user.userId;

    // Update the user's profile
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        fullname,
        email,
        phoneNumber,
        bio,
        skills: skillsArray,
      },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "User profile updated successfully",
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({
      message: "Error updating user profile",
      success: false,
    });
  }
};

export { userRegister, userLogin, userLogout, updateUserProfile };
