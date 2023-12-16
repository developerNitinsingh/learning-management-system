import { Router } from "express";
import {
  register,
  logIn,
  logOut,
  getProfileDetail,
} from "../controllers/user.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", logIn);
router.get("/logout", logOut);
router.get("/me", isLoggedIn, getProfileDetail);

export default router;
