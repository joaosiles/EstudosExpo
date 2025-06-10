const express = require('express');
const firebase = require('../firebase-admin-connect');
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

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
  const nomesCollection = firebase.firestore().collection('Nomes');
  
  if (!req.body.nome || !req.body.sobrenome) {
    return res.status(400).json({
      error: "MissingFields",
      message: "All request body fields are required."
    }); 
  }

  const snapshot = await nomesCollection
  .where('Nome', '==', req.body.nome)
  .where('Sobrenome', '==', req.body.sobrenome)
  .get();

  if (snapshot.empty) {
    return res.status(404).json({
      content: req.body,
      message: 'No matching documents found',
    });
  }

  try {
    snapshot.forEach(async (doc) => {
      await nomesCollection.doc(doc.id).delete();
    });    
    res.status(200).json({
      content: req.body, 
      message: "Register deleted with success"      
    },);
  } catch (error) {
    console.error(error);
    res.status(400).json({
      content: req.body,
      message: "Internal Server Error"
    });
  }
});

router.put('/nomes', async (req, res) => {
  const nomesCollection = firebase.firestore().collection('Nomes');

  const { nome, sobrenome, novoNome, novoSobrenome } = req.body;

  if (!nome || !sobrenome || (!novoNome && !novoSobrenome)) {
    return res.status(400).json({
      error: "MissingFields",
      message: "nome, sobrenome e pelo menos novoNome ou novoSobrenome são obrigatórios."
    }); 
  }

  try {
    const snapshot = await nomesCollection
      .where('Nome', '==', nome)
      .where('Sobrenome', '==', sobrenome)
      .get();

    if (snapshot.empty) {
      return res.status(404).json({
        message: "No matching documents found."
      });
    }

    const updates = [];

    snapshot.forEach(doc => {
      const updatedData = {};
      if (novoNome) updatedData.Nome = novoNome;
      if (novoSobrenome) updatedData.Sobrenome = novoSobrenome;

      updates.push(
        nomesCollection.doc(doc.id).update(updatedData)
      );
    });

    await Promise.all(updates);

    res.status(200).json({
      message: "Documents updated successfully",
      updatedFields: { novoNome, novoSobrenome },
      matched: snapshot.size
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      error: "InternalServerError",
      content: req.body,
      message: "Something went wrong."
    });
  }
});


router.get('/nome', async (req, res) => {
  const nomesCollection = firebase.firestore().collection('Nomes');

  if (!req.body) {
    return res.status(400).json({
      error: "MissingFields",
      message: "One of request body fields are required."
    }); 
  }

  try {
    const results = new Map();

    if (req.body.nome) {
      const [nomeSnapshot] = await Promise.all([
        nomesCollection.where('Nome', '==', req.body.nome).get()        
      ]);
      nomeSnapshot.forEach(doc => {
        results.set(doc.id, { id: doc.id, ...doc.data() });
      });      
    }

    if (req.body.sobrenome) {
      const [sobrenomeSnapshot] = await Promise.all([
        nomesCollection.where('Sobrenome', '==', req.body.sobrenome).get()        
      ]);
      sobrenomeSnapshot.forEach(doc => {
        results.set(doc.id, { id: doc.id, ...doc.data() });
      });
    }

    const finalResults = Array.from(results.values());

    console.log(finalResults);

    res.status(200).json({
      finalResults,
      message: "Success"
    });

  } catch (error) {
    console.error(error);
    res.status(400).json({
      content: req.body,
      message: "Internal Server Error"
    });
  }
});

module.exports = router;