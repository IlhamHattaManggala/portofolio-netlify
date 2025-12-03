import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import ReadmeGenerator from "./pages/ReadmeGenerator";
import NotFound from "./pages/NotFound";
import ArticleDetail from "./pages/ArticleDetail";
import BlogListPage from "./pages/BlogListPage";
import VisitorTracker from "./components/VisitorTracker";

const RoutesApp = () => {
  return (
    <Router>
      <VisitorTracker />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/readme-generator" element={<ReadmeGenerator />} />
        <Route path="/blog" element={<BlogListPage />} />
        <Route path="/article/:slug" element={<ArticleDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default RoutesApp;
