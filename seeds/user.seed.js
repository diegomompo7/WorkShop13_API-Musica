const mongoose = require("mongoose");
const { connect } = require("../db.js");
const { User } = require("../models/User.js");
const { faker } = require("@faker-js/faker");

const userSeed = async () => {
  try {
    // Conexion
    await connect();
    console.log(`
    ********************************************
    *** Conectando a la BBDD desde user.seed ***
    ********************************************
    `);

    // Borrado de datos
    await User.collection.drop();
    console.log(`
    XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    XXX Limpieza de la colección User realizada XXX
    XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    `);

    const userList = [];

    for (let i = 0; i < 10; i++) {
      let newUser = {};
      try {
        newUser = {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          email: faker.internet.email()
        };
      } catch (error) {
        console.log(error);
      }
      userList.push(newUser);
    }

    // Insercion de usuarios
    const documents = userList.map((user) => new User(user));
    await User.insertMany(documents);
    console.log(`
    vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    vvv Usuarios insertados correctamente vvv
    vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    `);
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
};

userSeed();
