import express from "express";
const router = express.Router();
import checkAuth from "../middleware/checkAuth.js";

import { payMercadoPago, setCoins } from "../controllers/mercadoPago.js";

router.post("/", checkAuth, payMercadoPago);
router.put("/setcoins", checkAuth, setCoins);

// router.post("/", payMercadoPago);
// router.put("/setcoins", checkAuth, setCoins);

export default router;
