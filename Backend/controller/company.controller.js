import Company from "../models/company.model.js";

// Function to register a new company
const companyRegister = async (req, res) => {
  try {
    // Destructure companyName from request body
    const { companyName, description, location, website, employeeCount } = req.body;

    // Check if companyName is provided in the request body
    if (!companyName || companyName.trim() === "") {
      return res
        .status(400)
        .json({ message: "Company name is required", success: false });
    }

    // Check if a company with the same name and userId already exists
    let existingCompany = await Company.findOne({
      companyName: companyName,
      userId: req._id,
    });

    // If company already exists, return an error response
    if (existingCompany) {
      return res.status(400).json({
        message: "You already have a company with this name",
        success: false,
      });
    }

    // If no existing company, create a new company
    const newCompany = await Company.create({
      companyName,
      description,
      location,
      website,
      employeeCount,
      userId: req._id,
    });

    // Send success response with the newly created company details
    return res.status(201).json({
      message: "Company created successfully",
      success: true,
      company: newCompany,
    });
  } catch (error) {
    console.error("Error details:", error); // Log the error details

    // Handle duplicate company name error case
    if (error.name === "MongoError" && error.code === 11000) {
      return res.status(400).json({
        message: "Duplicate company name exists.",
        success: false,
      });
    }

    // Return general error response if something else goes wrong
    return res
      .status(500)
      .json({ message: "Error creating company", success: false });
  }
};

// Function to get all companies for the authenticated user
const getCompany = async (req, res) => {
  try {
    // Fetch companies that belong to the authenticated user
    const companies = await Company.find({ userId: req._id });

    // If no companies found, return a 404 error
    if (companies.length === 0) {
      return res
        .status(404)
        .json({ message: "Company not found", success: false });
    }

    // Return success response with the list of companies
    return res.status(200).json({
      message: "Company found",
      success: true,
      companies, // Return the companies array
    });
  } catch (error) {
    console.error("Error details:", error); // Log the error details
    return res
      .status(500)
      .json({ message: "Error finding company", success: false });
  }
};

// Function to get a company by its ID
const companybyId = async (req, res) => {
  try {
    // Extract company ID from the request parameters
    const { id } = req.params;

    // Fetch the company by the provided ID
    const company = await Company.findById(id);
    if (!company) {
      // If company not found, return a 404 error
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    // Return success response with the found company details
    return res.status(200).json({
      message: "Company found",
      success: true,
      company,
    });
  } catch (error) {
    console.error("Error details:", error); // Log the error details
    return res.status(500).json({
      message: "Error finding company",
      success: false,
    });
  }
};

// Function to update a company's details
const updateCompany = async (req, res) => {
  try {
    // Destructure the fields to be updated from request body
    const { name, description, location, website } = req.body;
    const file = req.file; // File (like a logo) uploaded with the request

    // Create an object to hold the fields to be updated
    const updateData = { name, description, location, website };

    // If a file is uploaded (e.g., logo), add it to the updateData
    if (file) {
      updateData.logo = file.path; // Assuming the file is an image (logo)
    }

    // Attempt to update the company by its ID
    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true, // Return the updated company
    });

    if (!company) {
      // If company not found, return a 404 error
      return res
        .status(404)
        .json({ message: "Company not found", success: false });
    }

    // Return success response with the updated company details
    return res.status(200).json({
      message: "Company updated successfully",
      success: true,
      company,
    });
  } catch (error) {
    console.error("Error details:", error); // Log the error details
    return res
      .status(500)
      .json({ message: "Error updating company", success: false });
  }
};

// Export functions for use in routes
export { companyRegister, getCompany, companybyId, updateCompany };
