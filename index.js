const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const port = process.env.PORT;
const {getConnection} = require('./db/db-connection-mongo');

getConnection();

//Parseo JSON
app.use(express.json());

app.use('/usuario', require('./router/usuario'));
app.use('/estado-equipo', require('./router/estadoEquipo'));
app.use('/marca', require('./router/marca'));
app.use('/tipo-equipo', require('./router/tipoEquipo'));
app.use('/inventario', require('./router/inventario'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });