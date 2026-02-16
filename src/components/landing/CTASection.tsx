import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Rocket } from 'lucide-react';

export const CTASection = () => {
  return (
    <section
      id="cta"
      className="min-h-screen flex items-center justify-center py-32 relative"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative max-w-5xl mx-auto"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl blur-3xl opacity-20"
          />
          
          <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-12 md:p-16 text-center border border-white/10">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: 'spring' }}
              className="inline-flex items-center justify-center w-24 h-24 mb-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl shadow-2xl shadow-purple-500/50"
            >
              <Rocket className="w-12 h-12 text-white" />
            </motion.div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Ready to Build Something Amazing?
            </h2>
            
            <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join thousands of developers who are already using Blitzs to ship faster and build better products.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-6 py-4 bg-white/10 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full sm:w-96 backdrop-blur-sm"
              />
              <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 flex items-center justify-center gap-2">
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-white/40 mb-12">
              No spam, unsubscribe at any time.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-8 pt-8 border-t border-white/10">
              <Link
                to="/projects"
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
              >
                <span>Browse Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
              >
                <span>Contact Us</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/team"
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
              >
                <span>Meet the Team</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
