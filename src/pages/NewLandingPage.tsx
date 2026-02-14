import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import { ArrowRight, Sparkles, Play, ChevronDown, Github, Menu, X, Zap, Code2, Globe, Rocket, Users, Star, ArrowUpRight, MousePointerClick, Layers, Puzzle, Lock, Shield } from 'lucide-react';

const NewLandingPage = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  const heroInView = useInView(heroRef, { once: false, amount: 0.3 });
  const featuresInView = useInView(featuresRef, { once: false, amount: 0.3 });
  const projectsInView = useInView(projectsRef, { once: false, amount: 0.3 });
  const testimonialsInView = useInView(testimonialsRef, { once: false, amount: 0.3 });
  const ctaInView = useInView(ctaRef, { once: false, amount: 0.3 });
  
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });
  const translateY = useTransform(smoothProgress, [0, 1], [0, -400]);
  const scale = useTransform(smoothProgress, [0, 0.6], [1, 0.92]);
  const opacity = useTransform(smoothProgress, [0, 0.25], [1, 0]);
  const blur = useTransform(smoothProgress, [0, 0.2], [0, 10]);

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Lightning Fast',
      description: 'Built with cutting-edge technology for optimal performance and minimal load times',
      gradient: 'from-yellow-400 to-orange-500',
      bgColor: 'rgba(251, 191, 36, 0.1)'
    },
    {
      icon: <Code2 className="w-8 h-8" />,
      title: 'Production Ready',
      description: 'Enterprise-grade code patterns you can deploy with absolute confidence',
      gradient: 'from-blue-400 to-indigo-500',
      bgColor: 'rgba(59, 130, 246, 0.1)'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Cross-Platform',
      description: 'Seamless experience across all devices, from mobile to desktop',
      gradient: 'from-green-400 to-emerald-500',
      bgColor: 'rgba(16, 185, 129, 0.1)'
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: 'Infinitely Scalable',
      description: 'Architecture designed to grow with your business needs',
      gradient: 'from-purple-400 to-pink-500',
      bgColor: 'rgba(168, 85, 247, 0.1)'
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: 'Secure by Default',
      description: 'Built-in security features protecting your data and users',
      gradient: 'from-red-400 to-rose-500',
      bgColor: 'rgba(244, 63, 94, 0.1)'
    },
    {
      icon: <Puzzle className="w-8 h-8" />,
      title: 'Easy Integration',
      description: 'Plug and play components that integrate seamlessly',
      gradient: 'from-cyan-400 to-blue-500',
      bgColor: 'rgba(6, 182, 212, 0.1)'
    }
  ];

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce with AI-powered recommendations and real-time inventory',
      tags: ['React', 'Node.js', 'PostgreSQL', 'TypeScript'],
      gradient: 'from-cyan-400 via-blue-500 to-indigo-600',
      image: 'bg-gradient-to-br from-cyan-500 to-blue-600'
    },
    {
      title: 'SaaS Dashboard',
      description: 'Real-time analytics dashboard with team collaboration features',
      tags: ['Vue.js', 'TypeScript', 'Tailwind', 'Chart.js'],
      gradient: 'from-purple-400 via-pink-500 to-rose-600',
      image: 'bg-gradient-to-br from-purple-500 to-pink-600'
    },
    {
      title: 'Mobile App Starter',
      description: 'Cross-platform mobile application template with authentication',
      tags: ['React Native', 'Redux', 'Firebase', 'Expo'],
      gradient: 'from-orange-400 via-red-500 to-pink-600',
      image: 'bg-gradient-to-br from-orange-500 to-red-600'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CTO at TechCorp',
      content: 'Blitzs completely transformed our development workflow. The code quality and attention to detail are absolutely exceptional. We shipped 3x faster.',
      avatar: 'SJ',
      gradient: 'from-blue-400 to-indigo-600',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Founder at StartupXYZ',
      content: 'Outstanding documentation and support. We launched our MVP in record time using Blitzs components. The community is incredibly responsive.',
      avatar: 'MC',
      gradient: 'from-green-400 to-emerald-600',
      rating: 5
    },
    {
      name: 'Emily Davis',
      role: 'Senior Developer',
      content: 'Clean code, modern patterns, and best practices throughout. Blitzs delivers exactly what professional developers need. Highly recommended.',
      avatar: 'ED',
      gradient: 'from-purple-400 to-pink-600',
      rating: 5
    },
    {
      name: 'James Wilson',
      role: 'Engineering Lead',
      content: 'Scalability and maintainability are built-in. Our team saved months of development time. Best investment we ever made.',
      avatar: 'JW',
      gradient: 'from-orange-400 to-red-600',
      rating: 5
    }
  ];

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollY / docHeight;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-black/40 border-b border-white/5 transition-all duration-300">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25"
              >
                <Sparkles className="w-6 h-6 text-white" />
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
                Blitzs
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {['Home', 'Features', 'Projects', 'Testimonials', 'Contact'].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-sm font-medium text-white/70 hover:text-white transition-colors relative group"
                >
                  {item}
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                  />
                </motion.a>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Link
                to="/get-started"
                className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 text-sm flex items-center gap-2"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="md:hidden mt-4 pb-4"
            >
              {['Home', 'Features', 'Projects', 'Testimonials', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block py-3 text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                >
                  {item}
                </a>
              ))}
            </motion.div>
          )}
        </div>
      </nav>

      <div className="relative z-10">
        <section 
          ref={heroRef}
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
              <ChevronDown className="w-8 h-8 text-white/30" />
            </motion.div>
          </motion.div>
        </section>

        <section 
          ref={featuresRef}
          id="features"
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
                <Sparkles className="w-4 h-4" />
                Why Blitzs
              </motion.span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                Everything You Need
              </h2>
              <p className="text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
                Production-ready solutions that help you ship faster without compromising on quality
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative"
                >
                  <motion.div
                    className="relative h-full bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/5 hover:border-white/10 transition-all duration-300"
                  >
                    <div 
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: feature.bgColor }}
                    />
                    <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.gradient} text-white mb-6 shadow-lg`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-white/60 leading-relaxed">{feature.description}</p>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section
          ref={projectsRef}
          id="projects"
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
                <Layers className="w-4 h-4" />
                Featured Projects
              </motion.span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                Our Latest Work
              </h2>
              <p className="text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
                Explore our recent projects and see what we're building
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -12, scale: 1.02 }}
                  className="group relative"
                >
                  <motion.div
                    className="relative h-96 bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-500"
                  >
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}
                    />
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="w-40 h-40 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-sm border border-white/10"
                      />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, i) => (
                          <motion.span
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white/90 text-xs font-medium rounded-full border border-white/10"
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 group-hover:bg-clip-text transition-all">
                        {project.title}
                      </h3>
                      <p className="text-white/60">{project.description}</p>
                    </div>
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 transition-opacity duration-300 rounded-2xl"
                    >
                      <Link
                        to="/projects"
                        className="px-6 py-3 bg-white text-black rounded-xl font-semibold hover:scale-105 transition-transform flex items-center gap-2"
                      >
                        <span>View Details</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center mt-16"
            >
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 group"
              >
                <span>View All Projects</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>

        <section
          ref={testimonialsRef}
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

        <section
          ref={ctaRef}
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

        <footer className="relative py-16 border-t border-white/5">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">Blitzs</span>
              </div>
              
              <p className="text-white/40 text-center">
                Building exceptional software, one project at a time.
              </p>

              <div className="flex gap-6">
                <a href="#" className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="mt-10 pt-8 border-t border-white/5 text-center">
              <p className="text-white/30 text-sm">
                © 2024 Blitzs. All rights reserved. Built with love and code.
              </p>
            </div>
          </div>
        </footer>
      </div>

      <motion.div
        className="fixed bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 z-50"
        style={{ scaleX: scrollProgress, originX: 0 }}
      />
    </div>
  );
};

export default NewLandingPage;
