import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CancionesPage from './components/CancionesPage';
import NuevaCancionPage from './components/NuevaCancionPage';

function App() {
  return (
    <Router>
      <div className="min-vh-100 bg-light">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <a className="navbar-brand" href="/">Gestión de Canciones</a>
          </div>
        </nav>
        <main className="py-4">
          <Routes>
            <Route path="/" element={<CancionesPage />} />
            <Route path="/nueva-cancion" element={<NuevaCancionPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App; 