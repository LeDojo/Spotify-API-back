import { Router } from "express";
import { uploadAudio } from "../middlewares/uploadFile";
import { addSong } from "../controllers/songController";
const songRouter = Router();

songRouter.post("/add-song", uploadAudio.single("audioFile"), addSong);


export default songRouter;