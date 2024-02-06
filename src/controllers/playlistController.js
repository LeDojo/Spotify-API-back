import { fakeData } from "../fakeData";
import Playlist from "../models/playlistModel";
import Song from "../models/songModel";

const addPlaylist = async (req, res) => {
  const { title, description } = req.body;

  try {
    const existingPlaylist = await Playlist.findOne({
      title,
      user: "65ae3e34d956f0114a677eed",
    });

    if (existingPlaylist) {
      return res
        .status(400)
        .json({ message: "Une playlist avec ce nom existe déjà." });
    }

    const newPlaylist = new Playlist({
      title,
      description,
      user: "65ae3e34d956f0114a677eed",
    });

    await newPlaylist.save();

    res.status(201).json(newPlaylist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const allPlaylist = async (req, res) => {
  try {
    const playlists = await Playlist.find().populate("songs");
    res.json(playlists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const onePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id).populate("songs");
    res.json(playlist);
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

const deleteSongFromPlaylist = async (req, res) => {
  const { playlistId, songId } = req.params;

  try {
    const playlist = await Playlist.findById(playlistId);
    const song = await Song.findById(songId);
    playlist.songs.pull(song);
    await playlist.save();
    res.json(playlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createFakeData = async (req, res) => {
  for (const playlist of fakeData) {
    const newPlaylist = new Playlist({
      title: playlist.title,
      description: playlist.description,
      user: req.user._id,
    });

    // Use Promise.all to wait for all song creation promises to resolve
    const songPromises = playlist.songs.map(async (song) => {
      const newSong = new Song({
        title: song.title,
        artist: song.artist,
        genre: song.genre,
        fileUrl: song.fileUrl,
      });

      await newSong.save();
      return newSong._id; // Assuming you want to store song IDs in the playlist
    });

    const songIds = await Promise.all(songPromises);
    newPlaylist.songs.push(...songIds); // Add all song IDs to the playlist

    await newPlaylist.save(); // Save the playlist after all songs have been added
  }

  const numberOfPlaylists = await Playlist.countDocuments();
  const numberOfSongs = await Song.countDocuments();

  res.json({
    message: `Created ${numberOfPlaylists} playlists and ${numberOfSongs} songs.`,
  });
};

export {
  addPlaylist,
  allPlaylist,
  onePlaylist,
  addSongToPlaylist,
  deleteSongFromPlaylist,
  createFakeData,
};
