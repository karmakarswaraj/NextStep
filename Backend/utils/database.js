import mongoose from "mongoose"; // Import the mongoose library for MongoDB connection

// Define an async function to connect to MongoDB
const connectDB = async () => {
  try {
    // Try to connect to the MongoDB database using the URI from environment variables
    await mongoose.connect(process.env.MONGO_URI);

    // Log success message if connection is successful
    console.log("MongoDB connected");
  } catch (error) {
    // Log error message if connection fails
    console.log("MongoDB connection failed");
  }
};

export default connectDB; // Export the connectDB function to be used in other parts of the app
