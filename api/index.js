import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import publicationRoutes from "./routes/publicationsRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

const app = express();
app.use(express.json());
dotenv.config();
connectDB();

// Configurar CORS
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// Routing
app.use("/api/users", userRoutes);
app.use("/api/publications", publicationRoutes);
app.use("/api/categories", categoryRoutes);

const PORT = process.env.PORT || 4000;

app.listen(4000, () => {
  console.log(`Server connected on port ${PORT}`);
});
