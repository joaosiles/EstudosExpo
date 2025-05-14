import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_APP_ID,
};

firebase.initializeApp(firebaseConfig);

export async function GET(request: Request) {
  const nomesCollection = firebase.firestore().collection('Nomes');
        const snapshot = await nomesCollection.get();
  
        const data: { id: string; }[] = [];
        snapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
  console.log('dados',data)
  return Response.json(data);
  // return Response.json({ hello: 'world' });
}
