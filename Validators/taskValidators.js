const validateEstado = (data) => {
  const errores = [];

  if (data !== "" && ![true, false, "true", "false"].includes(data)) {
    errores.push("Completado debe de ser 'true' o 'false'.");
  }

  return errores
};

const validatePrioridad = (data) => {
  const errores = [];

  if (data !== "" && !["baja", "media", "alta", 1, 2, 3].includes(data)) {
    errores.push(
      "La prioridad debe ser 'baja', 'media', 'alta', 1, 2, 3 o vacía"
    );
  }

  return errores;
};
module.exports = { validatePrioridad, validateEstado };
