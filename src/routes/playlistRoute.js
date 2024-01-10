import { Router } from "express";
import {
  addPlaylist,
  addSongToPlaylist,
  allPlaylist,
} from "../controllers/playlistController";

const playlistRouter = Router();

playlistRouter.get("/all", allPlaylist);
playlistRouter.post("/create-playlist", addPlaylist);
playlistRouter.post("/:playlistId/add-song/:songId",addSongToPlaylist)

export default playlistRouter;
