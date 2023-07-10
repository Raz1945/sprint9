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
        tarea: tarea,
        prioridad: isNaN(prioridad)
          ? prioridad.toLowerCase()
          : parseInt(prioridad),
      };

      const errores = tasksValidator.validateTasksServices(data);
      if (errores.length > 0) {
        return res
          .status(400)
          .json({ message: "Parámetros inválidos", errors: errores });
      }

      const userData = await TaskModel.findUser(data);
      const user = userData[0].id;

      const priorityData = await TaskModel.findPriority(data);
      const priority = priorityData[0].id;

      const taskData = await TaskModel.create(data, user, priority);
      const task = taskData[0];

      return res.send({
        message: "La tarea ha sido creada con éxito.",
        Task: task,
      });
    } catch (error) {
      console.error("\x1b[31m%s\x1b[0m", error);
      return res.status(500).json({ error: "Error al crear la tarea." });
    }
  },
];

exports.delete = [
  // Validación del cuerpo de la solicitud
  body("usuario")
    .notEmpty()
    .withMessage("El campo usuario no puede estar vacío")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .withMessage("El campo usuario debe ser un email válido"),
  body("task_id")
    .notEmpty()
    .withMessage("El campo task_id no puede estar vacío"),
  body("task_id").isInt().withMessage("El ID debe ser un número entero"),

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
        await TaskModel.deleteTaskWhithUser(data);
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

// todo Ver que conviene hacer, si una archivo middleware para ingresar las dintintas validaciones de express?

//? Ruta para eliminar una tarea por ID
// router.delete('/:id', async (req, res) => {
//   try {
//       const taskId = req.params.id;

//       const deletedTask = await Task.destroy({
//           where: {
//               id: taskId
//           }
//       });

//       if (deletedTask > 0) {
//           console.log('\x1b[36m%s\x1b[0m', 'Tarea eliminada exitosamente');
//           res.json({
//               success: true,
//               message: 'Tarea eliminada exitosamente'
//           });
//       } else {
//           console.log('\x1b[31m%s\x1b[0m', 'No se encontró la tarea');
//           res.status(404).json({
//               success: false,
//               message: 'No se encontró la tarea'
//           });
//       }
//   } catch (error) {
// console.log('\x1b[31m%s\x1b[0m', 'Error al eliminar la tarea');
//       res.status(500).json({
//           success: false,-
//           message: 'Error al eliminar la tarea'
//       });
