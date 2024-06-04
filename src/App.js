import React from "react";
import './App.css';
import Component from './Component';
import MisFavoritos from './MisFavoritos';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

function App() {
  const redirectToFavorites = () => {
    // Redirige al usuario a la página de Mis Favoritos
    window.location.href = "/mis-favoritos";
  };
  const redirectToHome = () => {
    // Redirige al usuario al inicio de la aplicación
    window.location.href = "/";
  };
  
  return (
    <div className="App">
      <header className="App-header">
        {/* Contenedor para los botones */}
        <div className="button-container">
          <button onClick={redirectToFavorites}>Mis Favoritos</button>
          <button onClick={redirectToHome}>
            <FontAwesomeIcon icon={faHome} />
          </button>
        </div>
        {/* Renderizado condicional para determinar qué componente mostrar */}
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
