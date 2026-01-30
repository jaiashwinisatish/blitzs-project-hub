import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TypingAnimation } from '@/components/ui/typing-animation';
import { 
  Github, 
  Zap, 
  Code, 
  Users, 
  Star, 
  ArrowRight, 
  CheckCircle, 
  TrendingUp, 
  Globe, 
  Sparkles,
  Heart,
  Mail,
  ExternalLink
} from 'lucide-react';

// ============================================================================
// DESIGN SYSTEM SUMMARY
// ============================================================================
// Product Type: Portfolio/Project showcase website
// UI Style: Modern, clean, professional matching glassmorphism navbar
// Color Mood: Neutral base (slate/gray) + Indigo accent (primary)
// Typography: System fonts with clear hierarchy (Inter, SF Pro, or fallback)
// Key Interactions: Smooth scroll, hover effects, fade-in animations
// Anti-patterns: No harsh borders, no neon colors, no excessive gradients

// ============================================================================
// COLOR PALETTE (Tailwind CSS variables)
// ============================================================================
// Primary: Indigo (#6366f1) - CTA, accents, interactive elements
// Secondary: Slate/Gray (#64748b) - Muted text, backgrounds
// Accent: Indigo (#6366f1) - Highlights, hover states
// Background: White/Dark gray depending on theme
// Foreground: Dark/Light text

// ============================================================================
// TYPOGRAPHY SYSTEM
// ============================================================================
// H1: 3.5rem (56px) - Bold, tight tracking for hero headlines
// H2: 2.5rem (40px) - Bold for section titles
// H3: 1.75rem (28px) - Semibold for card titles
// H4: 1.25rem (20px) - Medium for subsection headers
// Body: 1rem (16px) - Normal for descriptions
// Caption: 0.875rem (14px) - Muted text, metadata

// ============================================================================
// SPACING SYSTEM (8px grid)
// ============================================================================
// Container: max-w-7xl (1280px) centered
// Section padding: py-20 md:py-32
// Gap: gap-6, gap-8, gap-12

// ============================================================================
// SECTION BREAKDOWN WITH UX REASONING
// ============================================================================
// 1. HERO SECTION: Immediate value proposition with animated text to capture attention
// 2. STATS SECTION: Social proof and trust indicators early in the journey
// 3. FEATURES SECTION: Value proposition with clear benefits and icons
// 4. FEATURED PROJECTS: Showcase actual work to demonstrate capabilities
// 5. TESTIMONIALS: Social proof from clients/developers
// 6. ABOUT/TEAM: Human connection and expertise demonstration
// 7. CTA SECTION: Final conversion push with email signup
// ============================================================================

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const Index = () => {
  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Lightning Fast',
      description: 'Built with modern technologies for optimal performance and minimal load times',
      color: 'bg-amber-500/10 text-amber-500'
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: 'Production Ready',
      description: 'Production-tested code patterns you can deploy confidently to production',
      color: 'bg-blue-500/10 text-blue-500'
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: 'Cross-Platform',
      description: 'Solutions that work seamlessly across web, mobile, and desktop platforms',
      color: 'bg-green-500/10 text-green-500'
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: 'Scalable Architecture',
      description: 'Built to grow with your business, from startup to enterprise scale',
      color: 'bg-purple-500/10 text-purple-500'
    }
  ];

  const stats = [
    { value: '150+', label: 'Projects Delivered', suffix: '' },
    { value: '50+', label: 'Happy Clients', suffix: '' },
    { value: '10K+', label: 'Code Commits', suffix: '' },
    { value: '99.9%', label: 'Uptime', suffix: '%' }
  ];

  const featuredProjects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with payment integration, inventory management, and analytics dashboard.',
      tags: ['React', 'Node.js', 'PostgreSQL'],
      image: 'bg-gradient-to-br from-blue-500 to-cyan-500',
      stats: { stars: 245, forks: 67 }
    },
    {
      id: 2,
      title: 'SaaS Dashboard',
      description: 'Modern SaaS admin dashboard with real-time data visualization, user management, and reporting.',
      tags: ['Vue.js', 'TypeScript', 'Tailwind'],
      image: 'bg-gradient-to-br from-purple-500 to-pink-500',
      stats: { stars: 189, forks: 42 }
    },
    {
      id: 3,
      title: 'Mobile App Starter',
      description: 'Production-ready React Native template with authentication, state management, and API integration.',
      tags: ['React Native', 'Redux', 'Firebase'],
      image: 'bg-gradient-to-br from-orange-500 to-red-500',
      stats: { stars: 312, forks: 89 }
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'CTO at TechCorp',
      content: 'Blitzs transformed our development workflow. The quality of their code and attention to detail is exceptional.',
      avatar: 'SJ',
      color: 'bg-primary/10'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Founder at StartupXYZ',
      content: 'We launched our MVP 3x faster using Blitzs components. Their documentation is top-notch and the community is amazing.',
      avatar: 'MC',
      color: 'bg-green-500/10'
    },
    {
      id: 3,
      name: 'Emily Davis',
      role: 'Senior Developer',
      content: 'As a developer, I appreciate clean code and best practices. Blitzs delivers exactly that with modern patterns and architecture.',
      avatar: 'ED',
      color: 'bg-purple-500/10'
    }
  ];

  const teamMembers = [
    { name: 'Alex Rivera', role: 'Lead Developer', avatar: 'AR', color: 'bg-primary/10' },
    { name: 'Jordan Lee', role: 'UI/UX Designer', avatar: 'JL', color: 'bg-green-500/10' },
    { name: 'Sam Taylor', role: 'Backend Engineer', avatar: 'ST', color: 'bg-purple-500/10' },
    { name: 'Casey Morgan', role: 'DevOps Engineer', avatar: 'CM', color: 'bg-orange-500/10' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* ========================================================================== */}
      {/* HERO SECTION */}
      {/* ========================================================================== */}
      {/* UX Reasoning: First impression is critical. Strong headline with animated text */}
      {/* captures attention immediately. Dual CTAs cater to different user intents - */}
      {/* exploratory (Learn More) and action-oriented (Get Started). */}
      {/* ========================================================================== */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={fadeInUp}>
              <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm">
                <Sparkles className="h-3.5 w-3.5 mr-2" />
                Production-Ready Solutions
              </Badge>
            </motion.div>

            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
            >
              Build Better Products{' '}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                <TypingAnimation
                  words={['Faster', 'Smarter', 'Together']}
                  speed={100}
                  deleteSpeed={50}
                  delayBetweenWords={2000}
                />
              </span>
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Expert developers building exceptional software solutions. 
              Production-ready projects, components, and tools to accelerate your development workflow.
            </motion.p>

            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button size="lg" className="h-12 px-8 text-base shadow-lg hover:shadow-xl transition-shadow" asChild>
                <Link to="/projects">
                  Explore Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-base" asChild>
                <Link to="/get-started">
                  Get Started
                </Link>
              </Button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div 
              variants={fadeInUp}
              className="mt-12 flex items-center justify-center gap-8 text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <Github className="h-5 w-5" />
                <span className="text-sm font-medium">Open Source</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium">Production Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                <span className="text-sm font-medium">Community Driven</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================== */}
      {/* STATS SECTION */}
      {/* ========================================================================== */}
      {/* UX Reasoning: Numbers build trust immediately. Simple grid layout with */}
      {/* counter animations (could be enhanced with Framer Motion useInView) */}
      {/* ========================================================================== */}
      <section className="py-16 bg-secondary/30 border-y border-border/40">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================== */}
      {/* FEATURES SECTION */}
      {/* ========================================================================== */}
      {/* UX Reasoning: Clear value proposition with visual icons. Grid layout adapts */}
      {/* to screen size. Hover effects provide interactive feedback. */}
      {/* ========================================================================== */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4">
              Why Blitzs
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Build Amazing Apps
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We provide production-ready solutions that help you ship faster without compromising on quality.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full border-0 shadow-lg bg-card/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================== */}
      {/* FEATURED PROJECTS SECTION */}
      {/* ========================================================================== */}
      {/* UX Reasoning: Show, don't tell. Featured projects demonstrate capabilities */}
      {/* with tags, descriptions, and social proof (stars/forks). */}
      {/* ========================================================================== */}
      <section className="py-20 md:py-28 bg-secondary/20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
          >
            <div>
              <Badge variant="outline" className="mb-4">
                Featured Work
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                Our Latest Projects
              </h2>
              <p className="text-lg text-muted-foreground">
                Explore our recent work and see what we're building
              </p>
            </div>
            <Button variant="outline" asChild className="self-start md:self-auto">
              <Link to="/projects">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full border-0 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  {/* Project image placeholder */}
                  <div className={`h-48 ${project.image} relative`}>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    <div className="absolute bottom-4 left-4 flex gap-2">
                      {project.tags.map((tag, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="flex items-center justify-between pt-0">
                    <div className="flex items-center gap-4 text-muted-foreground text-sm">
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4" />
                        {project.stats.stars}
                      </span>
                      <span className="flex items-center gap-1">
                        <Github className="h-4 w-4" />
                        {project.stats.forks}
                      </span>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/projects/${project.id}`}>
                        View Details
                        <ExternalLink className="ml-2 h-3 w-3" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================== */}
      {/* TESTIMONIALS SECTION */}
      {/* ========================================================================== */}
      {/* UX Reasoning: Social proof from real clients builds trust. Avatar + name + */}
      {/* role provides credibility. Quotes highlight specific benefits. */}
      {/* ========================================================================== */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4">
              Testimonials
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it. Here's what developers and companies are saying about working with us.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full border-0 shadow-lg bg-card/50">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className={testimonial.color}>
                          {testimonial.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================== */}
      {/* ABOUT/TEAM PREVIEW SECTION */}
      {/* ========================================================================== */}
      {/* UX Reasoning: Humanizes the brand. Shows expertise and team diversity. */}
      {/* Link to full team page for those who want to learn more. */}
      {/* ========================================================================== */}
      <section className="py-20 md:py-28 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="outline" className="mb-4">
                About Blitzs
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Building Exceptional Software, One Project at a Time
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                We're a team of passionate developers dedicated to building high-quality, production-ready solutions. 
                Our mission is to accelerate your development workflow without compromising on code quality or best practices.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                From startups to enterprise companies, we've helped hundreds of teams ship faster and build better products.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <Badge variant="secondary" className="px-3 py-1">
                  <CheckCircle className="h-3 w-3 mr-2" />
                  Best Practices
                </Badge>
                <Badge variant="secondary" className="px-3 py-1">
                  <CheckCircle className="h-3 w-3 mr-2" />
                  Clean Code
                </Badge>
                <Badge variant="secondary" className="px-3 py-1">
                  <CheckCircle className="h-3 w-3 mr-2" />
                  Modern Stack
                </Badge>
                <Badge variant="secondary" className="px-3 py-1">
                  <CheckCircle className="h-3 w-3 mr-2" />
                  Open Source
                </Badge>
              </div>
              <Button asChild>
                <Link to="/team">
                  Meet Our Team
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  {teamMembers.map((member, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-center gap-3 bg-background/50 rounded-lg p-3"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className={member.color}>
                          {member.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-sm">{member.name}</div>
                        <div className="text-xs text-muted-foreground">{member.role}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================================== */}
      {/* CTA SECTION */}
      {/* ========================================================================== */}
      {/* UX Reasoning: Final conversion opportunity. Email signup provides lead capture. */}
      {/* Secondary CTA caters to those who want to explore first. */}
      {/* ========================================================================== */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="border-0 shadow-xl bg-gradient-to-br from-primary/10 via-background to-primary/5 overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-5" />
              <CardContent className="p-8 md:p-12 relative">
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Ready to Build Something Amazing?
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                    Join thousands of developers who are already using Blitzs to ship faster and build better products.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto mb-8">
                  <div className="flex-1 flex">
                    <div className="relative flex-1">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full h-10 pl-10 pr-4 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        aria-label="Email address"
                      />
                    </div>
                  </div>
                  <Button size="lg" className="h-10 px-6">
                    Get Started
                  </Button>
                </div>

                <p className="text-center text-sm text-muted-foreground">
                  No spam, unsubscribe at any time.
                </p>

                <div className="flex flex-wrap justify-center gap-6 mt-8 pt-8 border-t border-border/50">
                  <Link 
                    to="/projects" 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                  >
                    Browse Projects <ArrowRight className="h-3 w-3" />
                  </Link>
                  <Link 
                    to="/contact" 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                  >
                    Contact Us <ArrowRight className="h-3 w-3" />
                  </Link>
                  <Link 
                    to="/team" 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                  >
                    Meet the Team <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
