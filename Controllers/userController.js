const UserModel = require("../Models/userService");
//? --> aqui es donde se colocan las 'querys' para las peticiones con la db
const Validator = require("../Validators/userValidators");
//? --> aqui es donde se colocan las las validaciones

//? Creacion de un usuario
exports.createUser = async (req, res) => {
  try {
    // //Valido que sea obligatorio el ingreso de email,
    // Validar si ya existe el email,
    // Validar el  formato de email.
    const { email } = req.body;

    // valido el parametro de entrada
    const errores = Validator.validateUserServices(email);
    if (errores.length > 0) {
      return res.status(400).json({ errores });
    }
    // Creao el usuario
    const usuario = { email };
    // Envio respuesta
    await UserModel.create(usuario);
    res.send({
      menssage: "El registro ha sido creado con exito.",
      usuario: email,
    });
  } catch (error) {
    // log error
    console.error(error);
    // Envio respuesta del error
    res.status(500).json({ error: "error al crear el usuario." });
  }
};
