import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = process.env.PORT;
import mongoose from "mongoose";
import authRouter from "./routes/userRoute";
import playlistRouter from "./routes/playlistRoute";
import songRouter from "./routes/songRoute";
import { auth } from "./middlewares/auth";
import path from "path";
import cors from "cors";
const uploadsDir = path.join(__dirname, "uploads", "audio");

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log(`[📚 DATABASE ] MongoDB est connecté !!`);
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => res.send("WELCOME API SPOTIFY"));
app.use("/auth", authRouter);
app.use("/playlists", playlistRouter);
app.use("/songs", songRouter);

// Serve static files from the uploads directory
app.use("/audio", express.static(uploadsDir));

app.listen(port, () =>
  console.log(`[SERVER] is running on http://localhost:${port}`)
);
