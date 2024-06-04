import React, { useState, useEffect } from "react";

export default function MisFavoritos() {
  const [favoriteQuotes, setFavoriteQuotes] = useState([]);

  useEffect(() => {
    // Obtiene los "me gusta" almacenados en localStorage
    const storedLikes = localStorage.getItem('likes');
    if (storedLikes) {
      const likesObj = JSON.parse(storedLikes);
      const favoriteQuotesIds = Object.keys(likesObj).filter(id => likesObj[id]);
      // Obtiene las citas almacenadas en localStorage
      const storedQuotes = JSON.parse(localStorage.getItem('quotes')) || [];
      // Filtra las citas que tienen like
      const favorites = storedQuotes.filter(quote => favoriteQuotesIds.includes(quote.id));
      setFavoriteQuotes(favorites);
    }
  }, []);

  return (
    <div>
      <h2>Mis Favoritos</h2>
      {favoriteQuotes.length > 0 ? (
        <div>
          {favoriteQuotes.map((quote) => (
            <div key={quote.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
              <table border="1" style={{ width: '80%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th>Quote</th>
                    <th>Fecha</th>
                    <th>Categorías</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{quote.value}</td>
                    <td>{new Date(quote.created_at).toLocaleDateString()}</td>
                    <td>{quote.categories.length > 0 ? quote.categories.join(", ") : "Sin categoría"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      ) : (
        <p>No tienes citas favoritas.</p>
      )}
    </div>
  );
}
