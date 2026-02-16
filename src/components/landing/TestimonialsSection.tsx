import { motion } from 'framer-motion';
import { Star, Users } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
  gradient: string;
  rating: number;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
};

export const TestimonialsSection = ({ testimonials }: TestimonialsSectionProps) => {
  return (
    <section
      id="testimonials"
      className="min-h-screen flex items-center justify-center py-32 relative"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm font-medium mb-6 backdrop-blur-sm"
          >
            <Users className="w-4 h-4" />
            Testimonials
          </motion.span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            What People Say
          </h2>
          <p className="text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
            Don't just take our word for it. Here's what developers and companies are saying.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.01 }}
              className="relative"
            >
              <motion.div
                className="relative h-full bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/5 hover:border-white/10 transition-all duration-300"
              >
                <div className="flex items-center gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 bg-gradient-to-br ${testimonial.gradient} rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-lg text-white">{testimonial.name}</div>
                    <div className="text-white/50 text-sm">{testimonial.role}</div>
                  </div>
                </div>

                <p className="text-white/70 leading-relaxed text-lg">"{testimonial.content}"</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
