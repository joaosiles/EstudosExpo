import firebase from '../../firebase-connect';

export async function GET(request: Request) {
  const nomesCollection = firebase.firestore().collection('Nomes');
  const snapshot = await nomesCollection.get();

  const data: ((prevState: never[]) => never[]) | { id: string; }[] = [];
  snapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return Response.json(data);
  // return Response.json({ hello: 'world' });
}
