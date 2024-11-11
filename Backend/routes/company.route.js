import express from "express";
import {
  companyRegister,
  getCompany,
  companybyId,
  updateCompany,
} from "../controller/company.controller.js";
import isAuthenticatedUser from "../middleware/isAuthenticatedUser.js";
const router = express.Router();

router.route("/register").post(isAuthenticatedUser, companyRegister);
router.route("/find").get(isAuthenticatedUser, getCompany);
router.route("/find/:id").get(isAuthenticatedUser, companybyId);
router.route("/update/:id").put(isAuthenticatedUser, updateCompany);

export default router;
