const TaskModel = require("../Models/taskServices"); 
const tasksValidator = require("../Validators/taskValidators");

exports.All = async (req, res) => {
  try {
    const all = await TaskModel.getAll();
    res.json(all);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las tareas." });
  }
};

exports.One = async (req, res) => {
  try {
    const { id } = req.params;
    const one = await TaskModel.getOne(id);
    res.json(one);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la tarea." });
  }
};

exports.New = async (req, res) => {
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
    console.error(error);
    return res.status(500).json({ error: "Error al crear la tarea." });
  }
};

exports.delete = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { usuario, id } = req.body;

    const data = {
      usuario: usuario.toLowerCase(),
      id: id,
    };

    await TaskModel.deleteTask(taskId);
    await TaskModel.deleteTask(data);

    res.send("El registro ha sido eliminado con éxito.");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error al eliminar.");
  }
};

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
//       console.log('\x1b[31m%s\x1b[0m', 'Error al eliminar la tarea');
//       res.status(500).json({
//           success: false,-
//           message: 'Error al eliminar la tarea'
//       });
