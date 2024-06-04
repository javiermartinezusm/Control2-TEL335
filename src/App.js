import React from "react";
import './App.css';
import Component from './Component';
import MisFavoritos from './MisFavoritos';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

function App() {
  const redirectToFavorites = () => {
    window.location.href = "/mis-favoritos";
  };
  const redirectToHome = () => {
    window.location.href = "/";
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <div className="button-container">
          <button onClick={redirectToHome}>
            <FontAwesomeIcon icon={faHome} />
          </button>
          <button onClick={redirectToFavorites}>Mis Favoritos</button>
        </div>
        {window.location.pathname === '/mis-favoritos' ? (
          <MisFavoritos />
        ) : (
          <Component />
        )}
      </header>
    </div>
  );
}

export default App;
