import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogoSection from './components/LandingPage';
import AdminPage from './components/AdminPage';

function App() {
 

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogoSection/>} />
        <Route path="/admin" element={<AdminPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
