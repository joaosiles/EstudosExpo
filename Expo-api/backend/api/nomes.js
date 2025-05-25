const express = require('express');
const firebase = require('../firebase-admin-connect');
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }))

router.get('/nomes', async (req, res) => {
  try {
    const db = firebase.firestore();
    const nomesCollection = db.collection('Nomes');
    const snapshot = await nomesCollection.get();    

    const data = [];
    snapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });    
    res.status(200).json({
      data,
      message: "Success"
    });
  } catch (error) {
    res.status(500).json({
      error: 'Erro ao buscar dados',
      details: error.message
    });
  }
});

router.post('/nomes', async (req, res) => {
  const nomesCollection = firebase.firestore().collection('Nomes');
  
  if (!req.body.nome || !req.body.sobrenome) {
    return res.status(400).json({
      error: "MissingFields",
      message: "All request body fields are required."
    }); 
  }

  try {
    await nomesCollection.add({
      Nome: req.body.nome,
      Sobrenome: req.body.sobrenome
    });    
    res.status(200).json({
      content: req.body, 
      message: "Success"      
    },);
  } catch (error) {
    console.error(error);
    res.status(400).json({
      content: req.body,
      message: "Internal Server Error"
    });
  }
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