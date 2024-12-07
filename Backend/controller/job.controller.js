import Job from "../models/job.model.js";
import mongoose from "mongoose";

// Function to post a new job
const postJob = async (req, res) => {
  try {
    // Destructure the job details from the request body
    const {
      title,
      company,
      location,
      salary,
      jobType,
      description,
      requirements,
      postedBy,
      applicationDeadline,
      benefits,
      responsibilities,
    } = req.body;

    // Extract userId from req.user and validate it
    const userId = req.user?._id;
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing user ID",
      });
    }

    // Validate that all required fields are provided
    if (
      !title ||
      !description ||
      !requirements ||
      !location ||
      !salary ||
      !jobType ||
      !company ||
      !postedBy ||
      !benefits ||
      !responsibilities
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const requirementsArray = requirements
      ? Array.isArray(requirements)
        ? requirements.map((item) => item.trim())
        : requirements.split(",").map((item) => item.trim())
      : [];

    // Create a new job posting
    const job = await Job.create({
      title,
      description,
      requirements: requirementsArray,
      location,
      salary,
      jobType,
      company,
      postedBy: userId,
      benefits,
      responsibilities,
    });

    // Return success response with job details
    return res.status(201).json({
      success: true,
      message: "Job posted successfully",
      job,
    });
  } catch (error) {
    console.error("Error posting job:", error); // Log error for debugging
    return res.status(500).json({
      success: false,
      message: "Error posting job",
    });
  }
};

// Function to fetch all jobs with optional keyword search
const getAllJob = async (req, res) => {
  try {
    // Get search keywords from the query parameters, defaulting to an empty string
    const keywords = req.query.keywords || "";
    const query = {
      $or: [
        { title: { $regex: keywords, $options: "i" } },
        { description: { $regex: keywords, $options: "i" } },
      ],
    };

    // Find jobs that match the search query and populate company details
    const jobs = await Job.find(query)
      .populate({
        path: "company", // Populate the company field with the full company details
      })
      .sort({ createdAt: -1 }); // Sort jobs by creation date in descending order

    // Check if any jobs were found
    if (!jobs) {
      return res.status(404).json({
        success: false,
        message: "No jobs found",
      });
    }

    // Return the fetched jobs in the response
    return res.status(200).json({
      success: true,
      message: "Jobs fetched successfully",
      jobs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching jobs",
    });
  }
};

// Function to fetch a single job by its ID
const getJobId = async (req, res) => {
  try {
    // Fetch the job using the job ID from the request parameters
    const job = await Job.findById(req.params.id).populate({
      path: "applications",
    });

    // Check if the job was found
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Return the found job in the response
    return res.status(200).json({
      success: true,
      message: "Job fetched successfully",
      job,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching job",
    });
  }
};

// Function to delete a job by its ID
const deleteJob = async (req, res) => {
  try {
    // Attempt to delete the job by its ID
    const job = await Job.findByIdAndDelete(req.params.id);

    // Check if the job was found and deleted
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Return success response after deletion
    return res.status(200).json({
      success: true,
      message: "Job deleted successfully",
      job,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting job",
    });
  }
};

// Function to fetch all jobs posted by the admin
const getAdminJobs = async (req, res) => {
  try {
    // Ensure we retrieve the admin's ID from the request's JWT
    const adminId = req.user?._id;

    // Validate that the admin ID exists
    if (!adminId) {
      return res.status(400).json({
        success: false,
        message: "Admin ID not found in request",
      });
    }

    // Fetch jobs posted by the admin
    const jobs = await Job.find({ postedBy: adminId });

    // Check if the admin has posted any jobs
    if (jobs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No jobs found",
      });
    }

    // Return the jobs posted by the admin
    return res.status(200).json({
      success: true,
      message: "Jobs fetched successfully",
      jobs,
    });
  } catch (error) {
    console.error("Error fetching jobs:", error); // Log error for debugging
    return res.status(500).json({
      success: false,
      message: "Error fetching jobs",
    });
  }
};

// Export all job-related functions for use in routes
export { postJob, getAllJob, getJobId, deleteJob, getAdminJobs };
