import { Router } from "express";
import {
  addPlaylist,
  addSongToPlaylist,
  allPlaylist,
  createFakeData,
  deleteSongFromPlaylist,
  onePlaylist,
} from "../controllers/playlistController";
import { auth } from "../middlewares/auth";

const playlistRouter = Router();

playlistRouter.get("/all", auth, allPlaylist);
playlistRouter.get("/:id", onePlaylist);
playlistRouter.post("/create-playlist", addPlaylist);
playlistRouter.post("/:playlistId/add-song/:songId", addSongToPlaylist);
playlistRouter.put("/:playlistId/delete-song/:songId", deleteSongFromPlaylist);
playlistRouter.post("/createFakeData", auth, createFakeData);

export default playlistRouter;
