import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogoSection from './components/LandingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogoSection version={"B"} />} />
      </Routes>
    </Router>
  );
}

export default App;
