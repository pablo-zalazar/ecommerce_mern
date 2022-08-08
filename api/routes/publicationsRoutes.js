import express from "express";
import {
  getAllPublications,
  createPublication,
  getPublication,
  deletePublication,
  getMyPublications,
} from "../controllers/publicationController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.route("/").get(getAllPublications).post(checkAuth, createPublication);
router.get("/:id", checkAuth, getPublication);
router.get("/myPublications/:id", checkAuth, getMyPublications);
router.delete("/delete/:id", checkAuth, deletePublication);

export default router;