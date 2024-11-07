import mongoose from mongoose;

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirements: { type: String },
    location: { type: String, required: true },salary: { type: String },
    jobType: { type: String, required: true },
    position: { type: String, required: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    applications: [{ type: mongoose.Schema.Types.ObjectId, ref: "Application" }],
})

export default mongoose.model("Job", jobSchema)