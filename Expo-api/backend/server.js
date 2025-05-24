const express = require('express');
const firebase = require('./firebase-admin-connect');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

//importando as rotas
const nomesRoute = require('./api/nomes');
app.use('/', nomesRoute);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});