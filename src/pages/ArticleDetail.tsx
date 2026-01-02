import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import type { TArticle } from "../components/types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingSocials from "../components/FloatingSocials";
import DynamicHead from "../components/DynamicHead";
import { useRef } from "react";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { incrementArticleView, onArticleViewChange } from "../services/firebase";

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { articles } = usePortfolioData();
  const [article, setArticle] = useState<TArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [liveViews, setLiveViews] = useState<number>(0);
  const viewIncremented = useRef(false);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const loadArticle = () => {
      if (!slug) {
        setError("Slug artikel tidak ditemukan");
        setLoading(false);
        return;
      }

      setLoading(true);
      const foundArticle = articles.find((a) => a.slug === slug);
      
      if (foundArticle) {
        setArticle(foundArticle);
        // Initialize with static views, but override if live views are available
        setLiveViews(foundArticle.views || 0);

        // Increment view count only once per page load
        if (!viewIncremented.current) {
          incrementArticleView(slug);
          viewIncremented.current = true;
        }

        // Listen for real-time view updates
        unsubscribe = onArticleViewChange(slug, (views) => {
          setLiveViews(views);
        });
      } else {
        setError("Artikel tidak ditemukan");
      }
      setLoading(false);
    };

    loadArticle();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [slug, articles]);

  if (loading) {
    return (
      <>
        <DynamicHead />
        <Navbar />
        <main className="min-h-screen dark:bg-gray-900 py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-600 dark:text-gray-400 text-center">Memuat artikel...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !article) {
    return (
      <>
        <DynamicHead />
        <Navbar />
        <main className="min-h-screen dark:bg-gray-900 py-16 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {error || "Artikel tidak ditemukan"}
            </h1>
            <button
              onClick={() => navigate("/blog")}
              className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Kembali ke Blog
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <DynamicHead 
        title={article.meta_title || article.title}
        description={article.meta_description || article.excerpt || undefined}
        keywords={article.meta_keywords || undefined}
      />
      <Navbar />
      <main className="min-h-screen dark:bg-gray-900 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Back Button */}
            <button
              onClick={() => navigate("/blog")}
              className="mt-8 mb-6 flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Kembali ke Blog
            </button>

            {/* Article Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 text-left">
                {article.title}
              </h1>
              
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
                {article.published_at && (
                  <span>
                    {format(new Date(article.published_at), "dd MMMM yyyy", { locale: id })}
                  </span>
                )}
                <span>{liveViews} views</span>
              </div>

              {article.featured_image && (
                <img
                  src={article.featured_image}
                  alt={article.title}
                  className="w-full h-96 object-cover rounded-lg mb-6"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              )}

              {article.excerpt && (
                <p className="text-lg text-gray-600 dark:text-gray-400 italic mb-6 text-left">
                  {article.excerpt}
                </p>
              )}
            </div>

            {/* Article Content */}
            <div className="max-w-none text-left">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  ol: ({node, ...props}) => <ol className="list-decimal list-outside ms-8 my-4 space-y-2 text-gray-900 dark:text-gray-100" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc list-outside ms-8 my-4 space-y-2 text-gray-900 dark:text-gray-100" {...props} />,
                  li: ({node, ...props}) => <li className="pl-2" {...props} />,
                  p: ({node, ...props}) => <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed" {...props} />,
                  h1: ({node, ...props}) => <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-white block" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white block" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-xl font-bold mt-6 mb-3 text-gray-900 dark:text-white block" {...props} />,
                }}
              >
                {article.content}
              </ReactMarkdown>
            </div>
          </motion.div>
        </div>
      </main>
      <FloatingSocials />
      <Footer />
    </>
  );
};

export default ArticleDetail;

