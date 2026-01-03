import { initializeApp } from "firebase/app";
import { getDatabase, ref, runTransaction, onValue, DataSnapshot } from "firebase/database";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Function to increment view count for a specific article slug
export const incrementArticleView = (slug: string) => {
  const postRef = ref(db, `articles/${slug}/views`);
  runTransaction(postRef, (currentViews: number | null) => {
    return (currentViews || 0) + 1;
  });
};

// Function to listen to view counts
export const onArticleViewChange = (slug: string, callback: (views: number) => void) => {
  const postRef = ref(db, `articles/${slug}/views`);
  return onValue(postRef, (snapshot: DataSnapshot) => {
    const views = snapshot.val();
    callback(views || 0);
  });
};
