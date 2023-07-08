exports.validateUserServices = (email) => {
  const errores = [];

  // //Valido que sea obligatorio el ingreso de email,
  // Validar si ya existe el email,
  // Validar el  formato de email.
  if (!email || email.trim() === "") {
    errores.push("El email es obligatorio");
  }

  return errores;
};
