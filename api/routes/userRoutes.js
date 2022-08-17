import express from "express";
import {
  register,
  authenticate,
  confirm,
  forgetPassword,
  checkToken,
  newPassword,
  profile,
  addToCart,
  removeFromCart,
  buyCart,
  clearCart,
  getTransactions,
} from "../controllers/userController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.post("/", register);
router.post("/login", authenticate);
router.get("/confirm/:token", confirm);
router.post("/forget-password", forgetPassword);
router.route("/forget-password/:token").get(checkToken).post(newPassword);

router.get("/profile", checkAuth, profile);
router.get("/addToCart/:id", checkAuth, addToCart);
router.get("/removeFromCart/:id", checkAuth, removeFromCart);
router.post("/buyCart", checkAuth, buyCart);
router.post("/clearCart", checkAuth, clearCart);
router.get("/transactions", checkAuth, getTransactions);

export default router;
