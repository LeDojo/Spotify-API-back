import { Router } from "express";
import {
  addPlaylist,
  addSongToPlaylist,
  allPlaylist,
} from "../controllers/playlistController";
import { auth } from "../middlewares/auth";

const playlistRouter = Router();

playlistRouter.get("/all", allPlaylist);
playlistRouter.post("/create-playlist",auth, addPlaylist);
playlistRouter.post("/:playlistId/add-song/:songId",addSongToPlaylist)

export default playlistRouter;
