import express from "express";
import {
  userRegister,
  userLogin,
  userLogout,
  updateUserProfile,
} from "../controller/user.controller.js";
import isAuthenticatedUser from "../middleware/isAuthenticatedUser.js";
const router = express.Router();

router.route("/register").post(userRegister);
router.route("/login").post(userLogin);
router.route("/logout").post(userLogout);
router.route("/profile/update").post(isAuthenticatedUser, updateUserProfile);

export default router;
