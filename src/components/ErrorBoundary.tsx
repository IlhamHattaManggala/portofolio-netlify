import { Component } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <section className="dark:bg-gray-900 min-h-screen flex items-center justify-center px-6">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Error Icon */}
              <motion.div
                className="flex justify-center mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="w-24 h-24 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-12 h-12 text-red-600 dark:text-red-400" />
                </div>
              </motion.div>

              {/* Error Message */}
              <motion.h1
                className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Terjadi Kesalahan
              </motion.h1>

              <motion.p
                className="text-gray-700 dark:text-gray-300 text-lg mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                Maaf, terjadi kesalahan yang tidak terduga. Silakan coba lagi
                atau kembali ke halaman utama.
              </motion.p>

              {this.state.error && (
                <motion.div
                  className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-left"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <p className="text-sm text-red-600 dark:text-red-400 font-mono break-all">
                    {this.state.error.message}
                  </p>
                </motion.div>
              )}

              {/* Action Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <button
                  onClick={this.handleReset}
                  className="group relative inline-flex items-center justify-center px-6 py-3 font-medium text-white bg-blue-600 border border-blue-600 rounded-lg overflow-hidden transition-all duration-300 hover:bg-blue-700"
                >
                  <RefreshCw className="mr-2 w-5 h-5" />
                  <span>Coba Lagi</span>
                </button>

                <button
                  onClick={() => (window.location.href = "/")}
                  className="group relative inline-flex items-center justify-center px-6 py-3 font-medium text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Home className="mr-2 w-5 h-5" />
                  <span>Kembali ke Beranda</span>
                </button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

