import React, { useState } from 'react';

const App = () => {
  const [apiData, setApiData] = useState(null);

  const fetchData = async () => {
    try {
      const response1 = await fetch('/api1'); // Utilizzo del proxy per la prima API
      const data = await response1.json();
      // Parsing della stringa JSON contenuta nel campo body
      data.body = JSON.parse(data.body);
      setApiData(data);
    } catch (error) {
      console.error('Errore durante il recupero dei dati:', error);
    }
  };

  const handleSecondApiButtonClick = async (str, index) => {
    try {
      console.log(`Hai cliccato sul bottone per: ${str}`);
      const response = await fetch(`/api2/?body=${encodeURIComponent(str)}`);
      const data = await response.json();
      
      // Analizziamo correttamente il corpo della risposta JSON
      const body = JSON.parse(data.body);
      
      // Estraiamo il link s3Link dalla risposta
      const s3Link = body.s3Link;
      
      // Costruiamo il link utilizzando la stringa ottenuta dalla risposta
      const linkElement = <a href={s3Link} target="_blank" rel="noopener noreferrer">{str}</a>;
      
      // Aggiorniamo la lista di stringhe con il nuovo link
      setApiData(prevData => {
        const newData = [...prevData.body];
        newData[index] = linkElement;
        return { ...prevData, body: newData };
      });
    } catch (error) {
      console.error('Errore durante la richiesta all\'API:', error);
    }
  };
  
  
  
  return (
    <div>
      <h1>Dati dall'API</h1>
      <button onClick={fetchData}>Carica Dati dall'API</button>
      {apiData && (
        <div>
          <p>StatusCode: {apiData.statusCode}</p>
          <h2>Elenco delle stringhe:</h2>
          <ul>
            {apiData.body.map((str, index) => (
              <li key={index}>
                {str}
                <button onClick={() => handleSecondApiButtonClick(str, index)}>Secondo Bottone</button>

              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
