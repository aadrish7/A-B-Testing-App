import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogoSection from './components/LandingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogoSection />} />
      </Routes>
    </Router>
  );
}

export default App;
