import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Github, Zap, Sparkles, Shield } from 'lucide-react';
import { ArrowUpRight } from 'lucide-react';

interface HeroSectionProps {
  translateY: any;
  opacity: any;
  scale: any;
  blur: any;
}

export const HeroSection = ({ translateY, opacity, scale, blur }: HeroSectionProps) => {
  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative pt-20"
    >
      <motion.div
        style={{ y: translateY, opacity, scale, filter: `blur(${blur}px)` }}
        className="container mx-auto px-6 text-center"
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: 'spring', bounce: 0.5 }}
          className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-10"
        >
          <motion.div
            animate={{
              boxShadow: [
                '0 0 0 0px rgba(99, 102, 241, 0.7)',
                '0 0 0 30px rgba(99, 102, 241, 0)',
                '0 0 0 0px rgba(99, 102, 241, 0.7)'
              ],
              rotate: [0, 360]
            }}
            transition={{
              boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 30, repeat: Infinity, ease: "linear" }
            }}
            className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/50"
          >
            <Sparkles className="w-12 h-12 md:w-16 md:h-16 text-white animate-pulse" />
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight tracking-tight"
        >
          Build{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
            Amazing
          </span>
          {' '}
          Products
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          Expert developers building exceptional software solutions. Production-ready projects, components, and tools to accelerate your development workflow.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <Link
            to="/projects"
            className="group px-8 py-4 bg-white text-black rounded-xl font-bold hover:shadow-2xl hover:shadow-white/10 transition-all duration-300 flex items-center gap-2 h-14"
          >
            <span>Explore Projects</span>
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
          
          <Link
            to="/get-started"
            className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold border border-white/10 hover:bg-white/20 hover:border-white/20 transition-all duration-300 flex items-center gap-2 h-14"
          >
            <Play className="w-5 h-5" />
            <span>Get Started</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-8 text-sm text-white/40"
        >
          <div className="flex items-center gap-2">
            <Github className="w-5 h-5" />
            <span>Open Source</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            <span>Lightning Fast</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            <span>Premium Quality</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-500" />
            <span>Secure</span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-8 h-8 text-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
};
