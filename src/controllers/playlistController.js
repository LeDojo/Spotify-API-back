import Playlist from "../models/playlistModel";
import Song from "../models/songModel";
const addPlaylist = async (req, res) => {
  const { title, description } = req.body;

  try {
    const existingPlaylist = await Playlist.findOne({
      title,
      user: req.user._id,
    });
    console.log(req.user)

    if (existingPlaylist) {
      return res
        .status(400)
        .json({ message: "Une playlist avec ce nom existe déjà." });
    }

    const newPlaylist = new Playlist({
      title,
      description,
      user: req.user._id,
    });

    await newPlaylist.save(); 

    res.status(201).json(newPlaylist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const allPlaylist = async (req, res) => {
  try {
    const playlists = await Playlist.find({ user: req.user.id }).populate(
      "songs"
    );
    res.json(playlists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addSongToPlaylist = async (req, res) => {
  const { playlistId, songId } = req.params;

  try {
    const playlist = await Playlist.findById(playlistId);
    const song = await Song.findById(songId);

    if (!playlist || !song) {
      return res
        .status(404)
        .json({ message: "Playlist ou Chanson non trouvée." });
    }
    if (!playlist.songs.includes(songId)) {
      playlist.songs.push(songId);
      await playlist.save();
      res.json(playlist);
    } else {
      res
        .status(400)
        .json({ message: "La chanson est déjà dans la playlist." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { addPlaylist, allPlaylist, addSongToPlaylist };
