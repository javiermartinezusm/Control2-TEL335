import React, { useState, useEffect } from "react";

export default function MisFavoritos() {
  const [favoriteQuotes, setFavoriteQuotes] = useState([]);

  useEffect(() => {
    // Obtiene los "me gusta" almacenados en localStorage
    const storedLikes = localStorage.getItem('likes');
    // Si hay "me gusta" almacenados, los parseamos y obtenemos las citas favoritas
    if (storedLikes) {
      const likesObj = JSON.parse(storedLikes);
      const favoriteQuotesIds = Object.keys(likesObj).filter(id => likesObj[id]);
      // Aquí podrías hacer una llamada a tu API para obtener las citas favoritas
      // En este ejemplo, simplemente mostraremos las citas favoritas almacenadas en localStorage
      const storedQuotes = JSON.parse(localStorage.getItem('quotes')) || [];
      const favorites = storedQuotes.filter(quote => favoriteQuotesIds.includes(quote.id));
      setFavoriteQuotes(favorites);
    }
  }, []);

  return (
    <div>
      <h2>Mis Favoritos</h2>
      <ul>
        {favoriteQuotes.map(quote => (
          <li key={quote.id}>{quote.value}</li>
        ))}
      </ul>
    </div>
  );
}
