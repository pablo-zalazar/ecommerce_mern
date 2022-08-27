import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Server } from "socket.io";

import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import publicationRoutes from "./routes/publicationsRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import mercadoPago from "./routes/mercadoPago.js";

import fileUpload from "express-fileupload";

const app = express();
app.use(express.json());
dotenv.config();
connectDB();
app.use(
  fileUpload({
    tempFileDir: "./upload",
    useTempFiles: true,
  })
);

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
app.use("/api/process-payment", mercadoPago);

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`Server connected on port ${PORT}`);
});

// Socket;
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.FRONTEND_URL,
  },
});

io.on("connection", (socket) => {
  socket.on("UpdateHome", (room) => {
    socket.join(room);
  });
  socket.on("renderHome", () => {
    socket.to(`${process.env.FRONTEND_URL}/`).emit("homeUpdate");
  });

  //------------------
  socket.on("UpdateMyPublications", (room) => {
    socket.join(room);
  });
  socket.on("updatePublications", () => {
    socket
      .to(`${process.env.FRONTEND_URL}/myPublications`)
      .emit("MyPublicationsUpdate");
  });

  //------------------
  socket.on("UpdateTransactions", (room) => {
    socket.join(room);
  });
  socket.on("updateTransaction", () => {
    socket.to(`${process.env.FRONTEND_URL}/Profile`).emit("transactionUpdate");
  });

  //------------------

  socket.on("Navigate", (room) => {
    socket.join(room);
  });

  socket.on("Redirect", (path) => {
    socket.to(`${process.env.FRONTEND_URL}/Profile`).emit("redireccion", path);
  });
});
