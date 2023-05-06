const mongoose = require("mongoose");
const { connect } = require("../db.js");
const { Artist } = require("../models/Artist.js");
const { Song } = require("../models/Song.js");
const { User } = require("../models/User.js");
const { Playlist } = require("../models/Playlist.js");
const { generateRandom } = require("../utils.js");

const allReslationsSeed = async () => {
  try {
    await connect();
    console.log("Conectado y listo para crear relaciones");

    const users = await User.find();
    const songs = await Song.find();
    const artists = await Artist.find();
    const playlists = await Playlist.find();

    if (!artists.length || !songs.length || !users.length) {
      console.error("Debe haber artistas, canciones y usuarios en la base de datos para poder relacionarlos. Parece que fala alguno de ellos.");
      return;
    } else {
      // Relaciona aleatoriamente canciones a artistas

      try {
        for (let i = 0; i < songs.length; i++) {
          const song = songs[i];
          const randomArtist = artists[generateRandom(0, artists.length - 1)];
          song.artist = randomArtist.id;
          await song.save();
        }
        console.log("Relaciones entre canciones-artistas creadas correctamente.");
      } catch (error) {
        console.status(500).json(error);
      }

      // Relaciona aleatoriamente playlists a usuarios

      try {
        for (let i = 0; i < playlists.length; i++) {
          const playlist = playlists[i];
          const randomUser = users[generateRandom(0, users.length - 1)];
          playlist.user = randomUser.id;
          await playlist.save();
        }
        console.log("Relaciones entre playlist-usuarios creadas correctamente.");
      } catch (error) {
        console.status(500).json(error);
      }
    }
  } catch (error) {
    console.status(500).json(error);
  } finally {
    mongoose.disconnect();
  }
};

allReslationsSeed();
