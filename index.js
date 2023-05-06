const express = require("express");
const { songRouter } = require("./routes/song.routes.js");
const { artistRouter } = require("./routes/artist.routes.js");
const { playlistRouter } = require("./routes/playlist.routes.js");
const { userRouter } = require("./routes/user.routes.js")

// Conexión a la BBDD
const { connect } = require("./db.js");
connect();

// Configuración del server
const PORT = 3000;
const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

// Rutas
const router = express.Router();
router.get("/", (req, res) => {
  res.send("Music API");
});
router.get("*", (req, res) => {
  res.status(404).send("Lo sentimos :( No hemos encontrado la página solicitada.");
});

// Usamos las rutas
server.use("/song", songRouter);
server.use("/artist", artistRouter);
server.use("/playlist", playlistRouter);
server.use("/user", userRouter);
server.use("/", router);

server.listen(PORT, () => {
  console.log(`
----------------------------
::: Servidor funcionando :::
::: Puerto: ${PORT}         :::
----------------------------
`);
});
