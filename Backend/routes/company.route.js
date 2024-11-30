import express from "express"; // Import express library to create the router
import {
  companyRegister,
  getCompany,
  companybyId,
  updateCompany,
} from "../controller/company.controller.js"; // Import the controller functions for handling requests
import isAuthenticatedUser from "../middleware/isAuthenticatedUser.js"; // Import the middleware to check if the user is authenticated

const router = express.Router(); // Create a new express router instance

// Route to register a new company (POST request) - Requires authentication
router.route("/register").post(isAuthenticatedUser, companyRegister);

// Route to find a company by the authenticated user (GET request) - Requires authentication
router.route("/find").get(getCompany);

// Route to find a company by its ID (GET request) - Requires authentication
router.route("/find/:id").get(isAuthenticatedUser, companybyId);

// Route to update a company's details (PUT request) - Requires authentication
router.route("/update/:id").put(isAuthenticatedUser, updateCompany);

// Export the router to be used in the main app
export default router;
