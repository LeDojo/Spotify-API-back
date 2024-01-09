import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = process.env.PORT;
import mongoose from "mongoose";
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/spotify_db");
  console.log(`[📚 DATABASE ] MongoDB est connecté !!`);
}
app.get("/", (req, res) => res.send("WELCOME API SPOTIFY"));

app.listen(port, () =>
  console.log(`[SERVER] is running on http://localhost:${port}`)
);
