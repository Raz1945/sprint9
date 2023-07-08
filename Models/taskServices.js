const knex = require("../Database/database");

const getAll = () => {
  return knex
    .select({
      id: "ta.id",
      usuario: "us.email",
      tarea: "ta.titulo",
      prioridad: "pr.nombre",
      completada: "ta.completado",
    })
    .from("tarea as ta")
    .join("usuario as us", "ta.usuario_id", "us.id")
    .rightJoin("prioridad as pr", "prioridad_id", "pr.id")
    .orderBy("us.email");
};

const getOne = (id) => {
  return knex
    .select({
      id: "ta.id",
      usuario: "us.email",
      tarea: "ta.titulo",
      prioridad: "pr.nombre",
      completada: "ta.completado",
    })
    .from("tarea as ta")
    .join("usuario as us", "ta.usuario_id", "us.id")
    .rightJoin("prioridad as pr", "prioridad_id", "pr.id")
    .where("us.id", id);
};

const create = (data, user, priority) => {
  return knex("tarea")
    .insert({
      titulo: data.tarea,
      usuario_id: user,
      prioridad_id: priority,
    })
    .returning("*");
};

const findUser = (data) => {
  return knex
    .select("*")
    .from("usuario")
    .where("email", data.usuario);
};

const findPriority = (data) => {
  const { prioridad } = data;

  let query = knex.select("*").from("prioridad");

  if (isNaN(prioridad)) {
    query = query.where("nombre", prioridad);
  } else {
    query = query.where("id", parseInt(prioridad));
  }

  return query;
};

const deleteTask = (taskId) => {
  return knex("tarea").where("usuario_id", taskId).del();
};

const deleteTaskWhithUser = (taskId) => {
  return knex("tarea").where("usuario_id", taskId).del();
};

module.exports = { getAll, getOne, create, findUser, findPriority, deleteTask };
