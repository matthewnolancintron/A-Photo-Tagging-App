import React from 'react';

//  full version of ReactDOM
// import ReactDOM from 'react-dom';

// a version ReactDOM that is optimized
//  for client-side rendering in production.
import ReactDOM from 'react-dom/client'

import App from './App.jsx'
import './index.css'

import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator, collection, getDocs, query, collectionGroup, where } from "firebase/firestore";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};

initializeApp(firebaseConfig);

const db = getFirestore();
connectFirestoreEmulator(db, 'localhost', 8080);

const auth = getAuth();
connectAuthEmulator(auth, "http://localhost:9099");

async function fetchLevelsData() {
  const levelsQuery = query(collectionGroup(db, 'levels'));
  const levelsSnapshot = await getDocs(levelsQuery);

  const levelsData = [];

  for (const levelDoc of levelsSnapshot.docs) {
    const levelData = levelDoc.data();
    const levelId = levelDoc.id;

    const itemsQuery = query(collection(levelDoc.ref, 'items'));
    const itemsSnapshot = await getDocs(itemsQuery);
    const itemsData = itemsSnapshot.docs.map((itemDoc) => itemDoc.data());

    levelData.items = itemsData;
    levelsData.push(levelData);
  }

  return levelsData;
}

// Get a reference to the warning element
const warningElement = document.querySelector('.firebase-emulator-warning');

// Check if the warning element exists
if (warningElement) {
  // Remove the warning element from its parent
  warningElement.parentNode.removeChild(warningElement);
}


async function renderApp() {
  const levelsData = await fetchLevelsData();
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App db={db} levelsData={levelsData} />
    </React.StrictMode>
  );
}

renderApp();