const taskController = require("../../../Controllers/taskController");
const userController = require("../../../Controllers/userController");

const express = require("express");
const router = express.Router();

//* Para Tareas
// http://localhost:3000/api/tasks/
router.get("/", taskController.All);
router.get("/:id", taskController.One);
router.post("/", taskController.New);
router.delete('/:id', taskController.delete);

//* Para Usuarios
// http://localhost:3000/api/tasks/user
router.post("/user", userController.createUser);

// router.put('/:id', taskController.update);

module.exports = router;
