import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MousePointerClick } from 'lucide-react';

export const ContactSection = () => {
  return (
    <section
      id="contact"
      className="min-h-[70vh] flex items-center justify-center py-32 relative"
    >
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            Let's Build Together
          </h2>
          <p className="text-xl text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed">
            Ready to create something amazing? Get in touch with us today.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-10 py-5 bg-white text-black rounded-xl font-bold hover:shadow-2xl hover:shadow-white/10 transition-all duration-300 group text-lg"
          >
            <span>Contact Us</span>
            <MousePointerClick className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
