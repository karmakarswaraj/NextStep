import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    companyName: { type: String, unique: true, required: true }, 
    description: { type: String, required: true },
    website: { type: String },
    logo: { type: String },
    location: { type: String },
    employeeCount: { type: Number },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Company", companySchema);
