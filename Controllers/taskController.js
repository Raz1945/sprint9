const TaskModel = require("../Models/taskServices");
const tasksValidator = require("../Validators/taskValidators");
const { body, param, validationResult } = require("express-validator");

exports.All = async (req, res) => {
  try {
    const all = await TaskModel.getAll();
    res.json(all);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las tareas." });
  }
};

exports.One = [
  // Validación del parámetro de la solicitud
  param("id").notEmpty().isInt().withMessage("El ID debe ser un número entero"),

  async (req, res) => {
    try {
      const { id } = req.params;

      const errores = validationResult(req);
      if (!errores.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Parámetros inválidos", errors: errores.array() });
      }

      const one = await TaskModel.getOne(id);
      res.json(one);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener la tarea." });
    }
  },
];

exports.New = [
  // Validación del cuerpo de la solicitud
  body("usuario")
    .notEmpty()
    .withMessage("El campo usuario no puede estar vacío")
    .isEmail()
    .withMessage("El campo usuario debe ser un email válido"),
  body("tarea").notEmpty().withMessage("El campo tarea no puede estar vacío"),

  async (req, res) => {
    try {
      const { usuario, tarea, prioridad } = req.body;

      const data = {
        usuario: usuario.toLowerCase(),
        titulo: tarea,
        prioridad_id: isNaN(prioridad)
          ? prioridad.toLowerCase()
          : parseInt(prioridad),
      };

      const invvalid = validationResult(req);
      if (!invvalid.isEmpty()) {
        return res.status(400).json({ invvalid: invvalid.array() });
      }

      const errores = tasksValidator.validatePrioridad(data.prioridad_id);
      if (errores.length > 0) {
        return res
          .status(400)
          .json({ message: "Parámetros inválidos", errors: errores });
      }

      const priorityData = await TaskModel.findPriority(data.prioridad_id);
      data.prioridad_id = priorityData.id;

      const userData = await TaskModel.findUser(data);
      const user = userData.id;

      const taskData = await TaskModel.create(data, user);
      const task = taskData[0];

      return res.send({
        message: "La tarea ha sido creada con éxito.",
        Task: task,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error al crear la tarea." });
    }
  },
];

exports.Delete = [
  // Validación del cuerpo de la solicitud
  body("usuario")
    .notEmpty()
    .withMessage("El campo usuario no puede estar vacío")
    .isEmail()
    .withMessage("El campo usuario debe ser un email válido"),
  body("task_id")
    .notEmpty()
    .withMessage("El campo task_id no puede estar vacío")
    .isInt()
    .withMessage("El ID debe ser un número entero"),

  async (req, res) => {
    try {
      const { usuario, task_id } = req.body;

      const data = {
        usuario: usuario.toLowerCase(),
        task_id: task_id,
      };

      const errores = validationResult(req);
      if (!errores.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Parámetros inválidos", errors: errores.array() });
      }

      if (data.usuario !== "" && data.task_id !== "") {
        await TaskModel.deleteTask(data);
      } else {
        return res.status(400).json({ message: "Falta información requerida" });
      }

      res.send("El registro ha sido eliminado con éxito.");
    } catch (error) {
      console.error(error);
      return res.status(500).send("Error al eliminar.");
    }
  },
];

// exports.Update = [
//   // Validación del cuerpo de la solicitud
//   body("usuario")
//     .notEmpty()
//     .withMessage("El campo usuario no puede estar vacío")
//     .isEmail()
//     .withMessage("El campo usuario debe ser un email válido"),

//   body("task_id").custom((value, { req }) => {
//     if (!Number.isInteger(Number(value))) {
//       throw new Error("El campo task_id debe ser un número entero");
//     }
//     return true;
//   }),

//   body("prioridad")
//     // puede ser un número entero o letras solamente
//     .custom((value, { req }) => {
//       if (isNaN(value) && isNaN(value.toLowerCase())) {
//         throw new Error(
//           "El campo prioridad debe ser un número entero o letras"
//         );
//       }
//       return true;
//     }),

//   body("completado")
//     // puede ser un booleano o letras solamente
//     .custom((value, { req }) => {
//       if (
//         typeof value !== "boolean" &&
//         (isNaN(value) || isNaN(value.toLowerCase()))
//       ) {
//         throw new Error("El campo completado debe ser un booleano o letras");
//       }
//       return true;
//     }),

//   async (req, res) => {
//     try {
//       const { usuario, task_id, tarea, prioridad, completado } = req.body;

//       const data = {
//         usuario: usuario.toLowerCase(),
//         task_id: task_id,
//       };

//       let updatedData = {
//         titulo: tarea,
//         prioridad_id: isNaN(prioridad)
//           ? prioridad.toLowerCase()
//           : parseInt(prioridad),
//         completado:
//           typeof completado === "boolean"
//             ? completado
//             : isNaN(completado)
//             ? completado.toLowerCase()
//             : completado,
//       };

//       const erroresPrioridad = tasksValidator.validatePrioridad(
//         updatedData.prioridad_id
//       );
//       const erroresEstado = tasksValidator.validateEstado(
//         updatedData.completado
//       );
//       const errores = [...erroresPrioridad, ...erroresEstado];

//       if (errores.length > 0) {
//         return res
//           .status(400)
//           .json({ message: "Parámetros inválidos", errors: errores });
//       }

//       const priorityData = await TaskModel.findPriority(
//         updatedData.prioridad_id
//       );
//       updatedData.prioridad_id = priorityData.id;

//       if (!data.usuario || !data.task_id) {
//         return res.status(400).json({ message: "Falta información requerida" });
//       }

//       await TaskModel.update(data, updatedData);

//       res.send("El registro ha sido actualizado con éxito.");
//     } catch (error) {
//       console.error(error);
//       return res.status(500).send("Error al actualizar el registro.");
//     }
//   },
// ];

exports.Update = [
  // Validación del cuerpo de la solicitud
  body("usuario")
    .notEmpty()
    .withMessage("El campo usuario no puede estar vacío")
    .isEmail()
    .withMessage("El campo usuario debe ser un email válido"),
  body("prioridad")
    // puede ser un número entero o letras solamente
    .custom((value, { req }) => {
      if (isNaN(value) && !isNaN(value.toLowerCase())) {
        throw new Error(
          "El campo prioridad debe ser un número entero o letras"
        );
      }
      return true;
    }),
  body("completado")
    // puede ser un booleano o string
    .custom((value, { req }) => {
      if (typeof value !== "boolean" && typeof value !== "string") {
        throw new Error("El campo completado debe ser un booleano o un string");
      }
      return true;
    }),
  body("task_id").custom((value, { req }) => {
    if (!Number.isInteger(Number(value))) {
      throw new Error("El campo task_id debe ser un número entero");
    }
    return true;
  }),
  async (req, res) => {
    try {
      const { usuario, task_id, tarea, prioridad, completado } = req.body;

      const data = {
        usuario: usuario.toLowerCase(),
        task_id: task_id,
      };

      let updatedData = {
        titulo: tarea,
        prioridad_id: isNaN(prioridad)
          ? prioridad.toLowerCase()
          : parseInt(prioridad),
        completado:
          typeof completado === "boolean"
            ? completado
            : isNaN(completado)
            ? completado.toLowerCase()
            : completado, // Aplicar toLowerCase() solo si completado es una cadena de caracteres
      };

      const erroresPrioridad = tasksValidator.validatePrioridad(
        updatedData.prioridad_id
      );
      const erroresEstado = tasksValidator.validateEstado(
        updatedData.completado
      );
      const errores = [...erroresPrioridad, ...erroresEstado];

      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty() || errores.length > 0) {
        const errors = [...validationErrors.array(), ...errores];
        return res
          .status(400)
          .json({ message: "Parámetros inválidos", errors });
      }

      const priorityData = await TaskModel.findPriority(
        updatedData.prioridad_id
      );
      updatedData.prioridad_id = priorityData.id;

      if (!data.usuario || !data.task_id) {
        return res.status(400).json({ message: "Falta información requerida" });
      }

      await TaskModel.update(data, updatedData);

      res.send("El registro ha sido actualizado con éxito.");
    } catch (error) {
      console.error(error);
      return res.status(500).send("Error al actualizar el registro.");
    }
  },
];
