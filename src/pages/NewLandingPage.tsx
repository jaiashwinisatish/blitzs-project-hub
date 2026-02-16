import { useEffect, useState } from 'react';
import { useScroll, useTransform, useSpring } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import { 
  LandingNavbar, 
  HeroSection, 
  FeaturesSection, 
  ProjectsSection, 
  TestimonialsSection, 
  CTASection, 
  ContactSection, 
  Footer 
} from '@/components/landing';
import { ScrollProgress } from '@/components/shared';
import { Zap, Code2, Globe, Rocket, Lock, Puzzle } from 'lucide-react';

const NewLandingPage = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
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

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <LandingNavbar 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
      />

      <div className="relative z-10">
        <HeroSection 
          translateY={translateY} 
          opacity={opacity} 
          scale={scale} 
          blur={blur} 
        />
        <FeaturesSection features={features} />
        <ProjectsSection projects={projects} />
        <TestimonialsSection testimonials={testimonials} />
        <CTASection />
        <ContactSection />
        <Footer />
      </div>

      <ScrollProgress scrollProgress={scrollProgress} />
    </div>
  );
};

export default NewLandingPage;
