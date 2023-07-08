require('dotenv').config(); // Variables de entorno

const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.APP_PORT || 3000;

// ? ruta al middlewares
const routes = require('./routes');
app.use(cors());

// Para trabajara con los datos en formato json
app.use(express.json());
//? middlewares
app.use('/', routes);

app.listen(port, () => {
  console.log(`La app se ejecuta en http://localhost:${port}`);
});
