import express from "express"; // Import the express library to create the router
import {
  postJob,
  getAllJob,
  getJobId,
  deleteJob,
  getAdminJobs,
} from "../controller/job.controller.js"; // Import the job controller functions to handle requests
import isAuthenticatedUser from "../middleware/isAuthenticatedUser.js"; // Import the middleware that checks if the user is authenticated

const router = express.Router(); // Create a new express router instance

// Route to post a new job (POST request) - Requires authentication
router.route("/post").post(isAuthenticatedUser, postJob);

// Route to fetch all jobs (GET request)
router.route("/find").get(getAllJob);

// Route to fetch a specific job by ID (GET request) - Requires authentication
router.route("/find/:id").get(getJobId);

// Route to fetch all jobs posted by the admin (GET request) - Requires authentication
router.route("/find/admin/job").get(isAuthenticatedUser, getAdminJobs);

// Route to delete a job by ID (DELETE request) - Requires authentication
router.route("/delete/:id").delete(isAuthenticatedUser, deleteJob); // This is the new feature to delete a job by its ID

// Export the router to be used in the main app
export default router;

// job/find/:id  67473990d64923b2e08179bc