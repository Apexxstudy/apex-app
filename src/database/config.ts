import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Estas chaves serão preenchidas com os seus dados reais quando criarmos a conta no site do Firebase.
// Por enquanto, deixaremos a estrutura profissional pronta para receber as credenciais.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyFakeKey_ApexPlaceholder",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "://firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "apex-app-placeholder",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "://appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "000000000000",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:000000000000:web:abcdef0123456"
};

// Inicializa o Firebase garantindo que não crie conexões duplicadas em segundo plano
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Exporta os serviços de Autenticação (Login) e Banco de Dados (Firestore) prontos para uso
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
