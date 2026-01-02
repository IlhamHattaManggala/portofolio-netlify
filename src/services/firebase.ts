import { initializeApp } from "firebase/app";
import { getDatabase, ref, runTransaction, onValue, DataSnapshot } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDk_oRk8CIwxZTOP90CtQkiDnzG4TEG1_c",
  authDomain: "portofolio-5690a.firebaseapp.com",
  projectId: "portofolio-5690a",
  storageBucket: "portofolio-5690a.firebasestorage.app",
  messagingSenderId: "576686727272",
  appId: "1:576686727272:web:10acedbf904c4ebbc19bdd",
  measurementId: "G-EPESDR0B43"
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
