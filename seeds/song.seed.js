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
  {
    title: "Himno de la alegría",
    duration: "4:31",
    yearReleased: 1985,
  },
  {
    title: "La chica de ayer",
    duration: "3:27",
    yearReleased: 1984,
  },
  {
    title: "Mediterráneo",
    duration: "4:07",
    yearReleased: 1971,
  },
  {
    title: "La Puerta de Alcalá",
    duration: "4:03",
    yearReleased: 1986,
  },
  {
    title: "Sobreviviré",
    duration: "4:08",
    yearReleased: 1989,
  },
  {
    title: "No Controles",
    duration: "3:23",
    yearReleased: 1983,
  },
  {
    title: "El ritmo del garaje",
    duration: "3:40",
    yearReleased: 1989,
  },
  {
    title: "Bailaré sobre tu tumba",
    duration: "3:38",
    yearReleased: 1989,
  },
  {
    title: "Digan lo que digan",
    duration: "3:46",
    yearReleased: 1987,
  },
  {
    title: "Mil calles llevan hacia ti",
    duration: "3:43",
    yearReleased: 1987,
  },
  {
    title: "La Flaca",
    duration: "4:12",
    yearReleased: 1996,
  },
  {
    title: "Corazón partío",
    duration: "5:46",
    yearReleased: 1998,
  },
  {
    title: "Vuela, vuela",
    duration: "4:13",
    yearReleased: 1990,
  },
  {
    title: "Rayando el sol",
    duration: "4:20",
    yearReleased: 1990,
  },
  {
    title: "La chica de ayer",
    duration: "3:41",
    yearReleased: 1984,
  },
  {
    title: "Devuélveme a mi chica",
    duration: "3:37",
    yearReleased: 1984,
  },
  {
    title: "Sabor de amor",
    duration: "4:14",
    yearReleased: 1991,
  },
  {
    title: "Como una ola",
    duration: "5:09",
    yearReleased: 1990,
  },
  {
    title: "El 7 de septiembre",
    duration: "3:12",
    yearReleased: 1992,
  },
  {
    title: "El Tiburón",
    duration: "3:56",
    yearReleased: 1991,
  },
  {
    title: "Hijo de la Luna",
    duration: "4:18",
    yearReleased: 1998,
  },
  {
    title: "La Campanera",
    duration: "3:23",
    yearReleased: 2002,
  },
  {
    title: "Aserejé",
    duration: "3:32",
    yearReleased: 2002,
  },
  {
    title: "Dígale",
    duration: "4:25",
    yearReleased: 2000,
  },
  {
    title: "El Alma al Aire",
    duration: "4:52",
    yearReleased: 2000,
  },
  {
    title: "Duele el Amor",
    duration: "4:19",
    yearReleased: 2003,
  },
  {
    title: "La Playa",
    duration: "3:45",
    yearReleased: 2000,
  },
  {
    title: "Ai se eu te pego",
    duration: "2:46",
    yearReleased: 2011,
  },
  {
    title: "El Perdón",
    duration: "3:28",
    yearReleased: 2015,
  },
  {
    title: "La Gozadera",
    duration: "3:52",
    yearReleased: 2015,
  },
  {
    title: "La Mordidita",
    duration: "3:32",
    yearReleased: 2015,
  },
  {
    title: "Me Gusta",
    duration: "3:24",
    yearReleased: 2020,
  },
  {
    title: "Que Tengo Que Hacer",
    duration: "4:11",
    yearReleased: 2010,
  },
  {
    title: "Sofía",
    duration: "3:30",
    yearReleased: 2016,
  },
  {
    title: "Te Boté",
    duration: "5:25",
    yearReleased: 2018,
  },
  {
    title: "Traicionera",
    duration: "3:47",
    yearReleased: 2016,
  },
  {
    title: "Vente Pa' Ca",
    duration: "4:19",
    yearReleased: 2016,
  },
];

const songSeed = async () => {
  try {
    // CONEXION
    await connect();

    // BORRADO
    await Song.collection.drop();
    console.log("Borradas canciones");

    // MAPEO E INSERCION
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
