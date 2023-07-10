const knex = require("../Database/database");

const getAll = () => {
  // Obtener todas las tareas con información relacionada
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
  // Obtener una tarea por su ID con información relacionada
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

const create = (data, user) => {
  // Crear una nueva tarea con el usuario y prioridad especificados
  return knex("tarea")
    .insert({
      titulo: data.titulo,
      usuario_id: user,
      prioridad_id: data.prioridad_id,
    })
    .returning("*");
};

const findUser = async (data) => {
  // Buscar un usuario por su correo electrónico

  // Verificar que exista el usuario
  const userExists = await knex
    .select("*")
    .from("usuario")
    .where("email", data.usuario)
    .first();
  if (!userExists) {
    throw new Error("El usuario no existe.");
  }

  return userExists;
};

const findPriority = async (data) => {
  // Buscar la prioridad correspondiente según el tipo de dato de entrada
  //? console.log({ la_prioridad_encontrada_es: data });

  let query = knex.select("*").from("prioridad");

  if (isNaN(data)) {
    // Si la data no es un número, buscar por el nombre
    query = query.where("nombre", data);
  } else {
    // Si la data es un número, buscar por el ID
    query = query.where("id", parseInt(data));
  }

  return await query.first();
};

const findTask = async (data) => {
  // Verifica que exista la tarea
  const taskExists = await knex("tarea").where("id", data.task_id).first();

  if (!taskExists) {
    throw new Error("La tarea no existe.");
  }

  return taskExists;
};

const deleteTask = async (data) => {
  // Elimina una tarea si se cumplen las condiciones

  await findUser(data);
  await findTask(data);

  // Si ambos existen, eliminar la tarea
  await knex("tarea").where("id", data.task_id).del();
};

const update = async (data, updatedData) => {
  // Actualizar una tarea
  // ? console.log({ updatedata: updatedData });

  await findUser(data);
  await findTask(data);

  await knex("tarea as ta")
    .where("ta.id", data.task_id)
    .update(updatedData);
};
module.exports = {
  getAll,
  getOne,
  create,
  findUser,
  findPriority,
  findTask,
  deleteTask,
  update,
};
