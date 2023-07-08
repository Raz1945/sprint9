const express = require("express");
const router = express.Router();

const tasks = require("./tasks");
// http://localhost:3000/api/tasks
router.use("/tasks", tasks);

module.exports = router;
