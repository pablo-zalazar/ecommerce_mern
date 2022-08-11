import express from "express";
import checkAuth from "../middleware/checkAuth.js";
import {
  getCategories,
  createCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.route("/").get(getCategories).post(checkAuth, createCategory);

export default router;
