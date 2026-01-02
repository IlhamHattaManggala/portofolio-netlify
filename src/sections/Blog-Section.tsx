import { useNavigate } from "react-router-dom";
import type { TArticle } from "../components/types";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { useLiveViews } from "../hooks/useLiveViews";
import { motion } from "framer-motion";

const BlogSection = () => {
  const { articles: staticArticles, loading } = usePortfolioData();
  const articles = useLiveViews(staticArticles);
  const navigate = useNavigate();

  const handleArticleClick = (article: TArticle) => {
    // Navigate to article detail page
    navigate(`/article/${article.slug}`);
  };

  if (loading) {
    return (
      <section className="dark:bg-gray-900 py-16 px-6 min-h-screen" id="blog">
        <div className="max-w-6xl mx-auto">
          <p className="text-gray-600 dark:text-gray-400 text-center">Memuat artikel...</p>
        </div>
      </section>
    );
  }

  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="dark:bg-gray-900 py-16 px-6 min-h-screen" id="blog">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Artikel & Blog
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Artikel dan tulisan tentang teknologi, pengembangan, dan pengalaman
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => handleArticleClick(article)}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleArticleClick(article);
                }
              }}
            >
              {article.featured_image && (
                <img
                  src={article.featured_image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {article.title}
                </h3>
                {article.excerpt && (
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                )}
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  {article.published_at && (
                    <span>
                      {format(new Date(article.published_at), "dd MMM yyyy", { locale: id })}
                    </span>
                  )}
                  <span>{article.views} views</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;

