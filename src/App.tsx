import React, { useEffect, useRef, useState } from 'react';
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';
import './components/styles/style.css';
import firebase from './data/firebase';


const App = () => {
  const mount = useRef(false);
  const [authStatus, setAuthStatus] = useState<boolean | null>(null);
  useEffect(() => {
    mount.current = true;
    firebase.auth().onAuthStateChanged((user:any) => {
      if (user) {
        setAuthStatus(true);
      }
      else setAuthStatus(false)
    })
  }, [])
  if (!mount.current) return <h1>Глушилка</h1>
  return (
    (authStatus ? <MainPage /> : <LoginPage />)
  );
}

export default App;
