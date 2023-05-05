const mongoose = require("mongoose");
const { connect } = require("../db.js");
const { Song } = require("../models/Song.js");

let songList = [
  {
    title: "Cómo pudiste hacerme esto a mí",
    duration: "4:08",
    yearReleased: 1984,
  },
  {
    title: "Vivir mi vida",
    duration: "4:16",
    yearReleased: 2013,
  },
  {
    title: "La camisa negra",
    duration: "3:36",
    yearReleased: 2004,
  },
  {
    title: "Despacito",
    duration: "3:49",
    yearReleased: 2017,
  },
  {
    title: "La Bomba",
    duration: "3:17",
    yearReleased: 1998,
  },
  {
    title: "Ai se eu te pego",
    duration: "2:46",
    yearReleased: 2011,
  },
  {
    title: "Bailando",
    duration: "4:04",
    yearReleased: 2014,
  },
  {
    title: "La Tortura",
    duration: "3:35",
    yearReleased: 2005,
  },
  {
    title: "Me gustas tú",
    duration: "3:58",
    yearReleased: 2000,
  },
  {
    title: "Waka Waka (This Time for Africa)",
    duration: "3:22",
    yearReleased: 2010,
  },
];

const songSeed = async () => {
  try {
    // CONEXION
    const database = await connect();

    // BORRADO
    await Song.collection.drop();
    console.log("Borradas canciones");

    // CREACION DE LOS OTROS DOCUMENTOS
    songList = songList.map((elem) => new Song(elem));

    await Song.insertMany(songList);
    console.log("Creadas canciones correctamente");
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
};

songSeed();
