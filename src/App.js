import React, { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error('Usuário não encontrado! Tente Novamente');
      }
      const data = await response.json();
      setUserData(data);
      setError(null);
    } catch (error) {
      setError(error.message);
      setUserData(null);
    }
  };

  return (
    <div className="App">
      <h1>GitHub User Search</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Insira o username"
      />
      <button onClick={fetchUserData}>Buscar</button>
      {error && <p className="error-message">{error}</p>}
      {userData && (
        <div className="user-info">
          <p>Nome: {userData.name}</p>
          <p>Empresa: {userData.company}</p>
          <p>Seguidores: {userData.followers}</p>
          <p>Repositórios públicos: {userData.public_repos}</p>
        </div>
      )}
    </div>
  );
}

export default App;