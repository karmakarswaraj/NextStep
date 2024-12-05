import mongoose from "mongoose";
import Company from "./company.model.js";
const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: {
      companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true,
      },
      companyName: { type: String, required: true },
    },
    location: { type: String, required: true },
    salary: { type: String },
    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Internship", "Temporary"], // Optional: limit to specific types
      required: true,
    },
    description: { type: String, required: true },
    requirements: { type: [String], required: true },
    website: { type: String },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    applicationDeadline: {
      type: Date,
    },
    benefits: {
      type: [String],
    },
    responsibilities: {
      type: [String],
    },
    openings: { type: Number },
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
  },
  { timestamps: true }
);

jobSchema.pre("save", async function (next) {
  if (this.isModified("company.companyId")) {
    try {
      const company = await Company.findById(this.company.companyId);
      if (!company) {
        return next(new Error("Company not found"));
      }
      this.company.companyName = company.companyName; // Assuming the Company model has a `name` field
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

export default mongoose.model("Job", jobSchema);
