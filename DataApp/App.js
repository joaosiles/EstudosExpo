import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCcBwfzdzF_oHLW44E4uTvr6T4FkpdXbCI",
  authDomain: "meuprojeto-e4409.firebaseapp.com",
  projectId: "meuprojeto-e4409",
  storageBucket: "meuprojeto-e4409.appspot.com",
  messagingSenderId: "801833049160",
  appId: "1:801833049160:web:e2b8cdb976032d15830c7d"
};


firebase.initializeApp(firebaseConfig);


import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';

export default function App() {
  const [nomes, setNomes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const nomesCollection = firebase.firestore().collection('Nomes');
      const snapshot = await nomesCollection.get();

      const data = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });

      setNomes(data);
    };

    fetchData();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Lista de Nomes:</Text>
      <FlatList
        data={nomes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.Nome} {item.Sobrenome}</Text>
          </View>
        )}
      />
    </View>
  );
}
