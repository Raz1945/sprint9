exports.validateTasksServices = (data) => {
  const errores = [];

  if (!data.usuario || data.usuario.trim() === "") {
    errores.push("El email es obligatorio");
  }

  if (
    data.prioridad !== "" &&
    !["baja", "media", "alta", 1, 2, 3].includes(data.prioridad)
  ) {
    errores.push("La prioridad debe ser 'baja', 'media', 'alta' o vacía");
  }

  return errores;
};
