import Playlist from "../models/playlistModel";
import Song from "../models/songModel";

const addSong = async (req, res) => {
  const { title, artist, genre, playlistId } = req.body;
  const fileUrl = req.file.filename;

  try {
    const newSong = new Song({
      title,
      artist,
      genre,
      fileUrl,
    });
    await newSong.save();

    if (playlistId) {
      const playlist = await Playlist.findById(playlistId);
      playlist.songs.push(newSong._id);
      await playlist.save();
    }

    res.status(201).json(newSong);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const allSongs = async (req, res) => {
  try {
    const allSongs = await Song.find();
    res.json(allSongs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { addSong, allSongs };
