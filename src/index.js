import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = process.env.PORT;
import mongoose from "mongoose";
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(`[📚 DATABASE ] MongoDB est connecté !!`);
}
app.get("/", (req, res) => res.send("WELCOME API SPOTIFY"));

app.listen(port, () =>
  console.log(`[SERVER] is running on http://localhost:${port}`)
);
