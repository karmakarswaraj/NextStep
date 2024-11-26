import express from "express"; // Import the express library to create the router
import {
  userRegister,
  userLogin,
  userLogout,
  updateUserProfile,
} from "../controller/user.controller.js"; // Import the user controller functions to handle requests
import isAuthenticatedUser from "../middleware/isAuthenticatedUser.js"; // Import the middleware to check if the user is authenticated
import { singleUpload, multipleUpload } from "../middleware/multter.js";

const router = express.Router(); // Create a new express router instance

// Route to register a new user (POST request)
router.route("/register").post(singleUpload, userRegister);

// Route to log in an existing user (POST request)
router.route("/login").post(userLogin);

// Route to log out a user (POST request)
router.route("/logout").post(userLogout);

// Route to update the authenticated user's profile (POST request)
// The user must be authenticated for this route
router
  .route("/profile/update")
  .post(isAuthenticatedUser, multipleUpload, updateUserProfile);

// Export the router to be used in the main app
export default router;
