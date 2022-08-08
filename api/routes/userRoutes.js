import express from "express";
import {
  register,
  authenticate,
  confirm,
  forgetPassword,
  checkToken,
  newPassword,
  profile,
} from "../controllers/userController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.post("/", register);
router.post("/login", authenticate);
router.get("/confirm/:token", confirm);
router.post("/forget-password", forgetPassword);

router.route("/forget-password/:token").get(checkToken).post(newPassword);

router.get("/profile", checkAuth, profile);

export default router;
