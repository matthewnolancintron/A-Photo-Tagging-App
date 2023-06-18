When you initialize Firebase in the `main.jsx` file, you can make the Firebase instance available throughout your application by using React's context or a state management solution like Redux.

Here's an example of how you can set up Firebase using context in the `main.jsx` file and make it accessible to the components in your `App.jsx` file:

**main.jsx**:
```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import './index.css';
import App from './App.jsx';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};

initializeApp(firebaseConfig);

const auth = getAuth();

export const FirebaseContext = React.createContext();

ReactDOM.render(
  <FirebaseContext.Provider value={{ auth }}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root')
);
```

In this example, we create a `FirebaseContext` using React's `createContext` function and provide the `auth` instance from Firebase as the value. This makes the `auth` instance accessible to all components wrapped within the `FirebaseContext.Provider` component.

Now, in your `App.jsx` or any other component within `App.jsx`, you can access the Firebase functionality using the `FirebaseContext.Consumer` component or the `useContext` hook:

**App.jsx**:
```jsx
import React, { useContext } from 'react';
import { FirebaseContext } from './main.jsx';

const App = () => {
  const { auth } = useContext(FirebaseContext);

  // Use the `auth` instance here to interact with Firebase authentication

  return <div>Hello, Firebase!</div>;
};

export default App;
```

By consuming the `FirebaseContext` in your `App.jsx` component, you can access the `auth` instance and use it to call Firebase functions.

This approach allows you to centralize the Firebase initialization in `main.jsx` and share the Firebase instance across your application using React's context. It ensures that the Firebase functionality is accessible to the components within the `App.jsx` file.

I hope this clarifies how to work with Firebase functions in components that are separate from the `main.jsx` file. If you have any further questions, please let me know.