const mongoose = require("mongoose");
const { connect } = require("../db.js");
const { Artist } = require("../models/Artist.js");

let artistList = [
  {
    name: "Alaska",
    genre: "female",
    active: 1977,
    country: "Spain"
  },
  {
    name: "Enrique Iglesias",
    genre: "male",
    active: 1994,
    country: "Spain"
  },
  {
    name: "Rosalía",
    genre: "female",
    active: 2013,
    country: "Spain"
  },
  {
    name: "Pablo Alborán",
    genre: "male",
    active: 2010,
    country: "Spain"
  },
  {
    name: "David Bisbal",
    genre: "male",
    active: 2001,
    country: "Spain"
  },
  {
    name: "Aitana",
    genre: "female",
    active: 2017,
    country: "Spain"
  },
  {
    name: "Miguel Bosé",
    genre: "male",
    active: 1975,
    country: "Spain"
  },
  {
    name: "Ana Belén",
    genre: "female",
    active: 1965,
    country: "Spain"
  },
  {
    name: "Antonio Orozco",
    genre: "male",
    active: 2000,
    country: "Spain"
  },
  {
    name: "Joaquín Sabina",
    genre: "male",
    active: 1978,
    country: "Spain"
  }
];

const artistSeed = async () => {
  try {
    // CONEXION
    await connect();

    // BORRADO
    await Artist.collection.drop();
    console.log("Borrados artistas");

    // CREACION DE LOS OTROS DOCUMENTOS
    artistList = artistList.map((elem) => new Artist(elem));

    await Artist.insertMany(artistList);
    console.log("Creados artistas correctamente");
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
};

artistSeed();
