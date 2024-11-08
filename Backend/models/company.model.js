import mongoose from mongoose;

const companySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    website: { type: String, required: true },
    logo: { type: String },
    location: { type: String},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

},{timestamps: true})

export default mongoose.model("Company", companySchema)