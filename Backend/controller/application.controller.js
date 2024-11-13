import Job from "../models/job.model.js";
import Application from "../models/application.model.js";
import mongoose from "mongoose";

const applyJob = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming user info is attached to `req.user` by auth middleware
    const jobId = req.params.id; // Use `req.params.id` to get the jobId from the URL parameter

    if (!jobId) {
      return res.status(400).json({
        message: "Job id is required",
        success: false,
      });
    }

    // Check if user has already applied for this job
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId, // Check if this user has already applied
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job",
        success: false,
      });
    }

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(400).json({
        message: "Job not found",
        success: false,
      });
    }

    // Create new application and set status to "pending" by default
    const newApplication = new Application({
      job: jobId, // Ensure jobId is a valid ObjectId
      applicant: userId, // Ensure userId is a valid ObjectId
      status: "pending", // Optional as "pending" is default
    });

    await newApplication.save();
    console.log(newApplication._id);
    // Add the application to the job's application array
    job.applications.push(newApplication._id);

    await job.save();

    // Populate the job details to return in the response
    const populatedApplication = await Application.findById(newApplication._id)
      .populate("job") // Populates job details in the application
      .populate("applicant"); // Populates applicant details (if needed)

    return res.status(200).json({
      message: "Applied successfully",
      success: true,
      application: populatedApplication, // Contains both application and job details
    });
  } catch (error) {
    console.log("Error applying for job:", error);
    return res.status(500).json({
      message: "Error applying for job",
      success: false,
    });
  }
};

const getAppliedJob = async (req, res) => {
  try {
    const userid = req.user._id; // Assuming req.id contains the authenticated user's ID

    console.log(userid);

    // Fetch all applications of the user
    const applications = await Application.find({ applicant: userid })
      .sort({ createdAt: -1 }) // Sorting applications by creation date (newest first)
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } }, // Corrected: `options` instead of `option`
        populate: {
          path: "company", // Populate company details for the job
          options: { sort: { createdAt: -1 } }, // Corrected: `options` instead of `option`
        },
      });

    if (!applications || applications.length === 0) {
      // Check if applications array is empty
      return res.status(404).json({
        message: "No applications found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Applications fetched successfully",
      applications, // Return the list of applications
      success: true,
    });
  } catch (error) {
    console.error("Error fetching applied jobs:", error);
    return res.status(500).json({
      message: "Error fetching applied jobs",
      success: false,
    });
  }
};

const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    console.log("Received jobId:", jobId);

    // Validate the Job ID format and log validation check
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      console.log("Invalid Job ID format.");
      return res.status(400).json({
        message: "Invalid Job ID format",
        success: false,
      });
    }

    // Find the job by ID and populate applications and applicants
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
        select: "name email",
      },
    });

    // Check if job exists and log findings
    if (!job) {
      console.log("Job not found in the database.");
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }

    // Log if no applications found
    if (job.applications.length === 0) {
      console.log("No applicants found for this job.");
      return res.status(404).json({
        message: "No applicants found for this job",
        success: false,
      });
    }

    // Return the populated applications
    return res.status(200).json({
      message: "Applicants fetched successfully",
      success: true,
      applicants: job.applications,
    });
  } catch (error) {
    console.log("Error fetching applicants:", error);
    return res.status(500).json({
      message: "Error fetching applicants",
      success: false,
    });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.applicationId;

    //console.log("Request params:", req.params); // Debug log for req.params
    //console.log("Application ID:", applicationId); // Debug log for applicationId

    if (!status) {
      return res.status(400).json({
        message: "Status not found",
        success: false,
      });
    }

    // Check if applicationId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(applicationId)) {
      return res.status(400).json({
        message: "Invalid Application ID",
        success: false,
      });
    }

    // Find the application by application ID
    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({
        message: "Application not found",
        success: false,
      });
    }
    //console.log(status);
    // Update the status
    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: "Status updated successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error updating status:", error);
    return res.status(500).json({
      message: "Error updating status",
      success: false,
    });
  }
};

export { applyJob, getAppliedJob, getApplicants, updateStatus };
