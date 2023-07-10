const taskController = require("../../../Controllers/taskController");
const userController = require("../../../Controllers/userController");

const express = require("express");
const router = express.Router();

//* Para Tareas
// http://localhost:3000/api/tasks/
router.get("/", taskController.All);
router.get("/:id", taskController.One);
router.post("/",taskController.New);
router.put('/', taskController.Update);


router.delete('/:id', taskController.Delete);

//* Para Usuarios
// http://localhost:3000/api/tasks/user
router.post("/user", userController.createUser);

// TODO router.delete("/user", userController.deleteUser);


module.exports = router;
