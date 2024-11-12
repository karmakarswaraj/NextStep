import express from "express";
import {
  jobPost,
  getAllJob,
  getJobId,
  deleteJob,
  getAdminJobs,
} from "../controller/job.controller.js";
import isAuthenticatedUser from "../middleware/isAuthenticatedUser.js";
const router = express.Router();

router.route("/post").post(isAuthenticatedUser, jobPost);
router.route("/find").get(isAuthenticatedUser, getAllJob);
router.route("/find/:id").get(isAuthenticatedUser, getJobId);
router.route("/delete/:id").delete(isAuthenticatedUser, deleteJob);
router.route("/find/admin/job").get(isAuthenticatedUser, getAdminJobs);

export default router;
