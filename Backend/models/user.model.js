import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["Student", "Recruiter"], required: true },
    profile: {
      bio: { type: String },
      education: { type: String },
      skills: [{ type: String }],
      workExperience: [{ type: String }],
      education: [{ type: String }],
      resume: { type: String },
      resumeName : { type: String },
      jobPreferences: [{ type: String }],
      workingAt: { type: String },
      lastQualification: { type: String },
      appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
      company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
      profilePic: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
