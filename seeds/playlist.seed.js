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
    const database = await connect();

    // BORRADO
    await Sample.collection.drop();
    console.log("Borrados samples y subsamples");

    // CREACION DOCUMENTOS
    subSampleList = subSampleList.map((elem) => new SubSample(elem));

    // RELACIONES
    sampleList[0].child = subSampleList[0]._id;
    sampleList[1].child = subSampleList[1]._id;

    // CREACION DE LOS OTROS DOCUMENTOS
    sampleList = sampleList.map((elem) => new Sample(elem));

    await SubSample.insertMany(subSampleList);
    await Sample.insertMany(sampleList);
    console.log("Creados samples correctamente");
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
};

sampleSeed();
