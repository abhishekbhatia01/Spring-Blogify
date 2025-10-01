import { motion } from "framer-motion";
import { Home, ArrowRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const NotFound404 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleGoBack = () => {
    if (location.state && location.state.from) {
      navigate(location.state.from);
    } else {
      navigate("/");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          className="text-center lg:text-left space-y-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            className="text-8xl lg:text-9xl font-bold text-muted-foreground/40"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            404
          </motion.h1>

          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl lg:text-3xl font-semibold text-foreground">
              Looks like you've got lost.
            </h2>
            <p className="text-lg text-muted-foreground max-w-md">
              The page you are looking for doesn't exist or has been moved.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <button
              onClick={handleGoBack}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:scale-105 group"
            >
              <Home className="w-5 h-5" />
              Back to home
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </motion.div>
        </motion.div>

        {/* Right Illustration */}
        <motion.div
          className="hidden lg:block"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="relative">
            {/* Abstract illustration using CSS */}
            <div className="w-full h-96 relative">
              {/* Background circles */}
              <motion.div
                className="absolute top-10 right-10 w-32 h-32 bg-primary/10 rounded-full"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-10 left-10 w-24 h-24 bg-accent/20 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              />

              {/* Central illustration placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-64 h-64 border-4 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 6, repeat: Infinity }}
                >
                  <div className="text-center space-y-2">
                    <div className="text-6xl">🔍</div>
                    <p className="text-sm text-muted-foreground font-medium">
                      Page not found
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Floating elements */}
              <motion.div
                className="absolute top-20 left-5 w-3 h-3 bg-primary rounded-full"
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-20 right-5 w-2 h-2 bg-accent rounded-full"
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound404;
