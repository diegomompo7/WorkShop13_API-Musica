const mongoose = require("mongoose");
const { connect } = require("../db.js");
const { Playlist } = require("../models/Playlist.js");

let playlistList = [
  {
    name: "Musica Rock"
  },
  {
    name: "Classic hits"
  },
  {
    name: "Mis favoritas"
  },
  {
    name: "Canciones para conducir"
  },
];

const playlistSeed = async () => {
  try {
    // CONEXION
    await connect();

    // BORRADO
    await Playlist.collection.drop();
    console.log("Borradas playlists");

    // MAPEO E INSERCION
    playlistList = playlistList.map((playList) => new Playlist(playList));

    await Playlist.insertMany(playlistList);
    console.log("Creadas playlists correctamente");
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
};

playlistSeed();
