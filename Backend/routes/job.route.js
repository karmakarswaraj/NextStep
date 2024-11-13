import express from "express";
import {
  postJob,
  getAllJob,
  getJobId,
  deleteJob,
  getAdminJobs,
} from "../controller/job.controller.js";
import isAuthenticatedUser from "../middleware/isAuthenticatedUser.js";
const router = express.Router();

router.route("/post").post(isAuthenticatedUser, postJob);
router.route("/find").get(isAuthenticatedUser, getAllJob);
router.route("/find/:id").get(isAuthenticatedUser, getJobId);
router.route("/find/admin/job").get(isAuthenticatedUser, getAdminJobs);
router.route("/delete/:id").delete(isAuthenticatedUser, deleteJob); //new feature

export default router;
