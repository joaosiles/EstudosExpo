const express = require('express');
const firebase = require('../firebase-admin-connect');
const router = express.Router();

router.get('/nomes', async (req, res) => {
  try {
    const db = firebase.firestore();
    const nomesCollection = db.collection('Nomes');
    const snapshot = await nomesCollection.get();    

    const data = [];
    snapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    console.log('bateu');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar dados', details: error.message });
  }
});

router.post('/nomes', async (req, res) => {
  res.send('POST nomes')
});

router.delete('/nomes', async (req, res) => {
  res.send('DELETE nomes')
});

router.put('/nomes', async (req, res) => {
  res.send('PUT nomes')
});

router.get('/nome', async (req, res) => {
  res.send('GET nomes')
});

module.exports = router;