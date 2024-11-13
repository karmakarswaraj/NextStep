import express from "express";
import {
  applyJob,
  getAppliedJob,
  getApplicants,
  updateStatus,
} from "../controller/application.controller.js";
import isAuthenticatedUser from "../middleware/isAuthenticatedUser.js";

const router = express.Router();

// Route to apply for a job
router.post("/apply/:id", isAuthenticatedUser, applyJob);

// Route to get all jobs that the authenticated user has applied to
router.get("/jobs/applied", isAuthenticatedUser, getAppliedJob);

// Route to get all applicants for a specific job (admin/recruiter only)
router.get("/jobs/:id/applicants", isAuthenticatedUser, getApplicants);

// Route to update the status of a job application (admin/recruiter only)
router.post(
  "/jobs/applicant/status/:applicationId",
  isAuthenticatedUser,
  updateStatus
);

export default router;
