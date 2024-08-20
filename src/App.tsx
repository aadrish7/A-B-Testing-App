import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogoSection from "./components/LandingPage";

type ABTestVersion = "A" | "B";
function getABTestVersion(): ABTestVersion {
  let version = localStorage.getItem("ab-test-version") as ABTestVersion | null;
  if (!version) {
    version = Math.random() < 0.5 ? "A" : "B";
    console.log("Randomly assigned", version);
    localStorage.setItem("ab-test-version", version);
  }
  console.log("Version is already assigned:", version);
  return version;
}

function App() {
  const version = getABTestVersion();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogoSection version={version} />} />
      </Routes>
    </Router>
  );
}

export default App;
