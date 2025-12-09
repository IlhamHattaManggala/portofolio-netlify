import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createPortal } from "react-dom";
import App from "./App";
import ReadmeGenerator from "./pages/ReadmeGenerator";
import NotFound from "./pages/NotFound";
import ArticleDetail from "./pages/ArticleDetail";
import BlogListPage from "./pages/BlogListPage";
import VisitorTracker from "./components/VisitorTracker";
import LoadingScreen from "./components/LoadingScreen";
import { useInitialLoad } from "./hooks/useInitialLoad";

const RoutesApp = () => {
  const isLoading = useInitialLoad(4000); // Minimum 4 seconds loading time

  return (
    <Router>
      {isLoading && createPortal(<LoadingScreen />, document.body)}
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
