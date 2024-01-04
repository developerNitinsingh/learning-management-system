import { Router } from "express";
import {
  register,
  logIn,
  logOut,
  getProfileDetail,
  forgotPassword,
  resetPassword,
} from "../controllers/user.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();

router.post("/register", upload.single("avatar"), register);
router.post("/login", logIn);
router.get("/logout", logOut);
router.get("/me", isLoggedIn, getProfileDetail);
router.post("/forgot-password", forgotPassword);
router.post("reset-password", resetPassword);

export default router;
