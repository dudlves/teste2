import { useState, useEffect } from 'react';
import Login from './components/Login';
import Alunos from './components/Alunos';
import Cursos from './components/Cursos';
import { isAuthenticated, logout } from './services/api';
import './App.css';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('alunos');

  useEffect(() => {
    setAuthenticated(isAuthenticated());
  }, []);

  const handleLogin = () => {
    setAuthenticated(true);
  };

  const handleLogout = () => {
    logout();
    setAuthenticated(false);
  };

  if (!authenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="navbar-brand">
          <h1>Sistema Acadêmico</h1>
        </div>
        <div className="navbar-menu">
          <button 
            className={activeTab === 'alunos' ? 'active' : ''} 
            onClick={() => setActiveTab('alunos')}
          >
            Alunos
          </button>
          <button 
            className={activeTab === 'cursos' ? 'active' : ''} 
            onClick={() => setActiveTab('cursos')}
          >
            Cursos
          </button>
          <button onClick={handleLogout} className="btn-logout">
            Sair ({localStorage.getItem('username')})
          </button>
        </div>
      </nav>

      <main className="main-content">
        {activeTab === 'alunos' && <Alunos />}
        {activeTab === 'cursos' && <Cursos />}
      </main>
    </div>
  );
}

export default App;
