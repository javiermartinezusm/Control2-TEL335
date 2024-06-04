import React, { useState, useEffect } from "react";

export default function Component() {
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const textOnChange = (event) => {
    setText(event.target.value);
  };

  const buttonOnClick = () => {
    setSearch(text);
  };

  useEffect(() => {
    if (search) {
      setLoading(true);
      fetch(`https://api.chucknorris.io/jokes/search?query=${search}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error en la solicitud');
          }
          return response.json();
        })
        .then((data) => {
          setData(data);
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
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}