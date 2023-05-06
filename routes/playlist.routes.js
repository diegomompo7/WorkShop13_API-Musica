const express = require("express");
const router = express.Router();

// Modelos
const { Playlist } = require("../models/Playlist.js");

// CRUD: ADD A SONG TO A PLAYLIST
router.post("/:id/song", async (req, res) => {
  try {
    const id = req.params.id;
    const song = req.body.songs;

    // Busqueda de la playlist y comprobacion
    const playlist = await Playlist.findById(id);
    if (playlist) {
      // Comprueba si la cancion ya esta en la listas
      const songCheck = playlist.songs.includes(song._id);
      // Si no esta en la lista, la agrega
      if (!songCheck) {
        playlist.songs.push(song);
        console.log(playlist);
        await playlist.save();
        res.json(playlist);
      } else {
        res.status(409).json("Ya existe esta cancion en la lista");
      }
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// CRUD: REMOVE SONG FROM A PLAYLIST

router.delete("/:id/song", async (req, res) => {
  try {
    const id = req.params.id;
    const song = req.body.songs;

    const playlist = await Playlist.findById(id);
    if (playlist) {
      console.log("Playlist songs:", playlist.songs);
      const songCheck = playlist.songs.includes(song._id);
      if (songCheck) {
        playlist.songs = playlist.songs.filter((s) => s._id.toString() !== song._id.toString());
        console.log("Playlist updated:", playlist);
        await playlist.save();
        res.json(playlist);
      } else {
        res.status(404).json({});
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// CRUD: READ
router.get("/", async (req, res) => {
  try {
    // Asi leemos query params
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const playlists = await Playlist.find()
      .limit(limit)
      .skip((page - 1) * limit)
      .populate({
        path: "songs",
        populate: {
          path: "artist",
        },
      }).populate("user");

    // Num total de elementos
    const totalElements = await Playlist.countDocuments();

    const response = {
      totalItems: totalElements,
      totalPages: Math.ceil(totalElements / limit),
      currentPage: page,
      data: playlists,
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// CRUD: READ
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const playlist = await Playlist.findById(id).populate({
      path: "songs",
      populate: {
        path: "artist",
      },
    }).populate("user");
    if (playlist) {
      res.json(playlist);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.get("/name/:name", async (req, res) => {
  const name = req.params.name;

  try {
    const playlist = await Playlist.find({ name: new RegExp("^" + name.toLowerCase(), "i") });
    if (playlist?.length) {
      res.json(playlist);
    } else {
      res.status(404).json([]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// CRUD: CREATE
router.post("/", async (req, res) => {
  console.log(req.headers);

  try {
    const playlist = new Playlist({
      name: req.body.name,
      song: req.body.song,
      user: req.body.user,
    });

    const createdPlaylist = await playlist.save();
    return res.status(201).json(createdPlaylist);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// CRUD: DELETE
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const sampleDeleted = await Playlist.findByIdAndDelete(id);
    if (sampleDeleted) {
      res.json(sampleDeleted);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// CRUD: UPDATE
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const sampleUpdated = await Playlist.findByIdAndUpdate(id, req.body, { new: true });
    if (sampleUpdated) {
      res.json(sampleUpdated);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = { playlistRouter: router };
