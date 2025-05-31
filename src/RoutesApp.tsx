import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import ReadmeGenerator from "./pages/ReadmeGenerator";

const RoutesApp = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/readme-generator" element={<ReadmeGenerator />} />
      </Routes>
    </Router>
  );
};

export default RoutesApp;
