import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

export default function Component() {
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [likes, setLikes] = useState(localStorage.getItem('likes') ? JSON.parse(localStorage.getItem('likes')) : {});

  const textOnChange = (event) => {
    setText(event.target.value);
  };

  const buttonOnClick = () => {
    setSearch(text);
  };

  const toggleLike = (quoteId) => {
    const updatedLikes = { ...likes, [quoteId]: !likes[quoteId] };
    setLikes(updatedLikes);
    localStorage.setItem('likes', JSON.stringify(updatedLikes));
  };

  useEffect(() => {
    if (search) {
      setLoading(true);
      setError(null);
      fetch(`https://api.chucknorris.io/jokes/search?query=${search}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error en la solicitud');
          }
          return response.json();
        })
        .then((data) => {
          if (Array.isArray(data.result)) {
            localStorage.setItem('quotes', JSON.stringify(data.result));
            setData(data.result);
            setQuotes(data.result);
          } else {
            setData([]);
            setQuotes([]);
          }
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }
  }, [search]);

  return (
    <div>
      <input type="text" value={text} onChange={textOnChange} />
      <button onClick={buttonOnClick}>Actualizar</button>
      {loading && <p>Cargando...</p>}
      {error && <p>Error: {error.message}</p>}
      {quotes.length > 0 ? (
        <div>
          <h2>Resultados de la búsqueda:</h2>
          {quotes.map((quote) => (
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
              <div style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={() => toggleLike(quote.id)}>
                <FontAwesomeIcon 
                  icon={likes[quote.id] ? solidHeart : regularHeart} 
                  style={{ color: likes[quote.id] ? 'white' : 'black' }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading && !error && <p>No se encontraron resultados.</p>
      )}
    </div>
  );
}
