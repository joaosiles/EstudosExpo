import { Button, FlatList, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';

type Usuario = {
  id: string;
  Nome: string;
  Sobrenome: string;
};

export default function App() {
  const [nomes, setNomes] = useState<Usuario[]>([]);

  async function fetchUsuarios() {
    try {
      const response = await fetch('/api/leitura');
      const snapshot = await response.json();

      const usuarios: Usuario[] = snapshot.map((usuario: any) => ({
        id: usuario.id,
        Nome: usuario.Nome,
        Sobrenome: usuario.Sobrenome,
      }));

      setNomes(usuarios);
      console.log(usuarios);
    } catch (error) {
      console.error('Erro na API:', error);
    }
  }

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Button onPress={fetchUsuarios} title="Buscar Dados Console.log" />
      <FlatList
        data={nomes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text>{item.Nome} {item.Sobrenome}</Text>
        )}
      />
    </View>
  );
}
