import Job from "../models/job.model.js";
import mongoose from "mongoose";

const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      experience,
      location,
      salary,
      jobType,
      position,
      company,
    } = req.body;

    // Extract userId from req.user and validate it
    const userId = req.user?._id;
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing user ID",
      });
    }

    // Validate required fields
    if (
      !title ||
      !description ||
      !requirements ||
      !experience ||
      !location ||
      !salary ||
      !jobType ||
      !position ||
      !company
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Split requirements into an array, trimming whitespace from each entry
    const requirementsArray = requirements
      .split(",")
      .map((item) => item.trim());

    // Create the new job posting
    const job = await Job.create({
      title,
      description,
      requirements: requirementsArray,
      experience,
      location,
      salary,
      jobType,
      position,
      company,
      postedBy: userId, // Link the user ID after validation
    });

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

const getAllJob = async (req, res) => {
  try {
    const keywords = req.query.keywords || "";
    const query = {
      $or: [
        { title: { $regex: keywords, $options: "i" } },
        { description: { $regex: keywords, $options: "i" } },
        //   { requirements: { $regex: keywords, $options: "i" } },
        //   { experience: { $regex: keywords, $options: "i" } },
        //   { location: { $regex: keywords, $options: "i" } },
        //   { salary: { $regex: keywords, $options: "i" } },
        //   { jobType: { $regex: keywords, $options: "i" } },
        //   { position: { $regex: keywords, $options: "i" } },
        //   { company: { $regex: keywords, $options: "i" } },
        //   { postedBy: { $regex: keywords, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(404).json({
        success: false,
        message: "No jobs found",
      });
    }
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

const getJobId = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }
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

const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }
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

const getAdminJobs = async (req, res) => {
  try {
    // Ensure we retrieve the user's ID from the correct place
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

    // Check if any jobs were found
    if (jobs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No jobs found",
      });
    }

    // Respond with the fetched jobs
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

export { postJob, getAllJob, getJobId, deleteJob, getAdminJobs };
