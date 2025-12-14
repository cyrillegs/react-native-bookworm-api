import express from "express";
import cors from "cors";
import "dotenv/config";

import authRouter from "./routes/authRoutes.js";
import bookRouter from "./routes/bookRoutes.js";
import { connectDB } from "./lib/db.js";

const server = express();
const PORT = process.env.PORT;

server.use(express.json());
server.use(cors());

server.use("/api/auth", authRouter);
server.use("/api/books", bookRouter);

server.listen(PORT, () => {
  console.log(`Server running on port:${PORT}`);
  connectDB();
});
