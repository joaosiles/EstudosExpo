const express = require('express');
const firebase = require('./firebase-connect');

const app = express();
const port = 8081;

app.get('/api/leitura', async (req, res) => {
  try {
    const db = firebase.firestore();
    const nomesCollection = db.collection('Nomes');
    const snapshot = await nomesCollection.get();

    const data = [];
    snapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar dados', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});