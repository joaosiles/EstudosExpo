const express = require('express');
const firebase = require('./firebase-admin-connect');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

//importando as rotas
const leituraRoute = require('./api/leitura');
app.use('/', leituraRoute);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});