import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('https://89nutx8pxe.execute-api.eu-central-1.amazonaws.com/dev');
      setData(result.data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Dati dall'API</h1>
      {data && <p>{data}</p>}
    </div>
  );
}

export default App;