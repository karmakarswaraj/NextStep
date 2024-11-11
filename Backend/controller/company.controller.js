import Company from "../models/company.model.js";

const companyRegister = async (req, res) => {
  try {
    // Check if companyName is in the request body
    const { companyName } = req.body;
    if (!companyName || companyName.trim() === "") {
      return res
        .status(400)
        .json({ message: "Company name is required", success: false });
    }

    // Log the request body to confirm the value of companyName
    console.log("Request Body:", req.body);

    // Log the user information (for debugging)
    console.log("User ID from JWT:", req.user._id);

    let existingCompany = await Company.findOne({
      companyName: companyName,
      userId: req._id,
    });

    // If a company already exists, return an error response
    if (existingCompany) {
      return res.status(400).json({
        message: "You already have a company with this name",
        success: false,
      });
    }

    // Proceed to create a new company since it does not exist for the user
    const newCompany = await Company.create({
      companyName: companyName,
      userId: req._id,
    });

    // Send a success response with the created company details
    return res.status(201).json({
      message: "Company created successfully",
      success: true,
      company: newCompany,
    });
  } catch (error) {
    console.error("Error details:", error); // Log the error details

    // Handle specific error cases
    if (error.name === "MongoError" && error.code === 11000) {
      return res.status(400).json({
        message: "Duplicate company name exists.",
        success: false,
      });
    }

    return res
      .status(500)
      .json({ message: "Error creating company", success: false });
  }
};

const getCompany = async (req, res) => {
  try {
    // Fetch company by the authenticated user
    const companies = await Company.find({ userId: req._id });

    // Check if no companies were found
    if (companies.length === 0) {
      return res
        .status(404)
        .json({ message: "Company not found", success: false });
    }

    return res.status(200).json({
      message: "Company found",
      success: true,
      companies, // Return the companies array
    });
  } catch (error) {
    console.error("Error details:", error); // Log the error
    return res
      .status(500)
      .json({ message: "Error finding company", success: false });
  }
};

import mongoose from "mongoose";

const companybyId = async (req, res) => {
  try {
    const { id } = req.params;

    

    // Fetch company by the provided ID in the request params
    const company = await Company.findById(id);
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company found",
      success: true,
      company,
    });
  } catch (error) {
    console.error("Error details:", error); // Log the error
    return res.status(500).json({
      message: "Error finding company",
      success: false,
    });
  }
};


const updateCompany = async (req, res) => {
  try {
    const { name, description, location, website } = req.body;
    const file = req.file; // Assuming file upload is handled

    const updateData = { name, description, location, website };

    if (file) {
      updateData.logo = file.path; // Assuming the file is an image or logo (you can adjust as needed)
    }

    // Attempt to update the company by ID
    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return res
        .status(404)
        .json({ message: "Company not found", success: false });
    }

    return res.status(200).json({
      message: "Company updated successfully",
      success: true,
      company,
    });
  } catch (error) {
    console.error("Error details:", error); // Log the error
    return res
      .status(500)
      .json({ message: "Error updating company", success: false });
  }
};

export { companyRegister, getCompany, companybyId, updateCompany };
