import { Router } from "express";
import {
  addPlaylist,
  addSongToPlaylist,
  allPlaylist,
  deleteSongFromPlaylist,
  onePlaylist,
} from "../controllers/playlistController";
import { auth } from "../middlewares/auth";

const playlistRouter = Router();

playlistRouter.get("/all", allPlaylist);
playlistRouter.get("/:id", onePlaylist);
playlistRouter.post("/create-playlist", auth, addPlaylist);
playlistRouter.post("/:playlistId/add-song/:songId", addSongToPlaylist);
playlistRouter.put("/:playlistId/delete-song/:songId", deleteSongFromPlaylist);

export default playlistRouter;
