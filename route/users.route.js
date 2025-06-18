import express from "express";
import auth from "../middleware/auth.js";

import {
  signInPage,
  signUpPage,
  
  logout,
  dashboard

} from "../controller/user.controller.js";

const router = express.Router();


router.post("/signin", signInPage);
router.post("/signup", signUpPage);
router.get("/logout", logout);
router.get("/dashboard",dashboard);

export default router;
