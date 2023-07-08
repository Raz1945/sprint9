const knex = require("../Database/database");

// Creo un usuario
const create = (email) => {
  return knex.insert(email).into("usuario").returning("*");
};

module.exports = { create };
