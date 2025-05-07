import React, { useState } from 'react';
import './css/style.css';
import './css/main.css';
import Form from './components/Form';
import Result from './components/Result';
import Loader from './components/Loader';

const App = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const getData = async (word) => {
    try {
      setError('');
      setLoading(true);
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const json = await response.json();
      if (json && json[0]) {
        setData(json[0]);
      } else {
        throw new Error("No definition found.");
      }
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Search, Learn!</h1>
      <Form onSubmit={getData} />
      {loading && <Loader />}
      {error && <p className="error">{error}</p>}
      {data && <Result data={data} />}
    </div>
  );
};

export default App;
