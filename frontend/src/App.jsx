import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import './App.css';

function App() {
  const studentName = "Taniksha Shah";

  return (
    <div className="page">
      <div className="terminal-window">
        <div className="terminal-titlebar">
          <div className="terminal-buttons">
            <span className="btn btn-red"></span>
            <span className="btn btn-yellow"></span>
            <span className="btn btn-green"></span>
          </div>
          <div className="terminal-title">student@portfolio: ~</div>
        </div>

        <div className="terminal-body">
          <Navbar />

          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>

          <Footer name={studentName} />
        </div>
      </div>
    </div>
  );
}

export default App;
