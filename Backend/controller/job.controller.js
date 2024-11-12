import Job from "../models/job.model.js";

const jobPost = async (req, res) => {
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
    const userId = req.id;

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

    const job = await Job.create({
      title,
      description,
      requirements,
      experience,
      location,
      salary,
      jobType,
      position,
      company,
      postedBy: userId,
    });

    return res.status(200).json({
      success: true,
      message: "Job posted successfully",
      job,
    });
  } catch (error) {
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
    const jobs = await Job.find(query);
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
    const admin = req.id;
    const jobs = await Job.find({ postedBy: admin });
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

export { jobPost, getAllJob, getJobId, deleteJob, getAdminJobs };
