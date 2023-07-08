let express = require('express');
let router = express.Router();

// Aqui van los diferentes enpoints correspondientes a tasks
const crudRouter = require('./crud');
// Otra variable para los reportes 

router.use('/', crudRouter)

module.exports = router;