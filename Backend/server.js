import express from "express"; // Import express to create the web server
import dotenv from "dotenv"; // Import dotenv to manage environment variables
import cookieParser from "cookie-parser"; // Import cookie-parser for handling cookies
import cors from "cors"; // Import CORS middleware to handle cross-origin requests

// Import the database connection function
import connectDB from "./utils/database.js";

// Import route handlers for different resources
import userRoute from "./routes/user.route.js";
import jobRoute from "./routes/job.route.js";
import companyRoute from "./routes/company.route.js";
import applicationRoute from "./routes/application.route.js";

// Configure environment variables from .env file
dotenv.config();

// Create an express app instance
const app = express();

// Define the port for the server
const port = process.env.PORT || 8000;

// Middleware to parse incoming JSON requests
app.use(express.json());
// Middleware to parse cookies from the requests
app.use(cookieParser());
// Middleware to parse URL-encoded data (for form submissions)
app.use(express.urlencoded({ extended: true }));

// Set up CORS options for allowing cross-origin requests from the frontend
const corsOptions = {
  origin: "http://localhost:5173", // Allow requests from the specified frontend URL
  credentials: true, // Allow sending cookies with requests
};
// Apply the CORS middleware with the specified options
app.use(cors(corsOptions));

// Define routes for different API endpoints
app.use("/api/v1/user", userRoute); // User-related routes
app.use("/api/v1/company", companyRoute); // Company-related routes
app.use("/api/v1/job", jobRoute); // Job-related routes
app.use("/api/v1/application", applicationRoute); // Application-related routes

// Start the server and connect to the database
app.listen(port, () => {
  connectDB(); // Establish database connection
  console.log(`Server is running on port ${port}`); // Log the server status
});
