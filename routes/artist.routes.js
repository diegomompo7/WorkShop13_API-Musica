const express = require("express");
const router = express.Router();

// Modelos
const { Artist } = require("../models/Artist.js");

// CRUD: READ
router.get("/", async (req, res) => {
  try {
    // Asi leemos query params
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const artists = await Artist.find()
      .limit(limit)
      .skip((page - 1) * limit);

    // Num total de elementos
    const totalElements = await Artist.countDocuments();

    const response = {
      totalItems: totalElements,
      totalPages: Math.ceil(totalElements / limit),
      currentPage: page,
      data: artists,
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
    const artist = await Artist.findById(id);
    if (artist) {
      res.json(artist);
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
    const artist = await Artist.find({ name: new RegExp("^" + name.toLowerCase(), "i") });
    if (artist?.length) {
      res.json(artist);
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
    const artist = new Artist({
      name: req.body.name,
      genre: req.body.genre,
      active: req.body.active,
      country: req.body.country,
    });

    const createdArtist = await artist.save();
    return res.status(201).json(createdArtist);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// CRUD: DELETE
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const sampleDeleted = await Artist.findByIdAndDelete(id);
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
    const sampleUpdated = await Artist.findByIdAndUpdate(id, req.body, { new: true });
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

module.exports = { artistRouter: router };
