import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, Smartphone, Users, Zap, Sparkles, CheckCircle, Palette, Rocket, Wrench, Cloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/ui/section-header';
import { DeveloperCard } from '@/components/ui/developer-card';
import { supabaseRealService } from '../services/supabase-real';

// Simple ProjectCard component
const ProjectCard = ({ title, description, category, price, isFree }: any) => (
  <div className="border rounded-lg p-4">
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-gray-600">{description}</p>
    <div className="flex justify-between items-center mt-2">
      <span className="text-sm text-gray-500">{category}</span>
      <span className="font-bold">{isFree ? 'Free' : `$${price}`}</span>
    </div>
  </div>
);

const Index = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [teamMembers, setTeamMembers] = useState([]);
  const [teamLoading, setTeamLoading] = useState(true);

  const services = [
    { icon: Code2, title: 'Ready-made Projects', description: 'Production-ready applications you can deploy instantly' },
    { icon: Rocket, title: 'Web Application Development', description: 'Scalable, secure, modern web apps for businesses' },
    { icon: Smartphone, title: 'Mobile App Development', description: 'Cross-platform iOS & Android applications' },
    { icon: Users, title: 'Custom Development', description: 'Tailored software built to your exact requirements' },
    { icon: Palette, title: 'UI / UX Design', description: 'Clean, intuitive, user-focused designs' },
    { icon: Cloud, title: 'SaaS Development', description: 'End-to-end SaaS products from idea to launch' },
    { icon: Wrench, title: 'Maintenance & Support', description: 'Long-term support, updates & optimization' },
  ];

  // Fetch featured projects and team members from your real Supabase database
  useEffect(() => {
    // First, diagnose your database structure
    supabaseRealService.diagnoseDatabase();

    const fetchFeaturedProjects = async () => {
      try {
        setProjectsLoading(true);
        const response = await supabaseRealService.getAllProjects({ 
          limit: 6, 
          sortBy: 'created_at' 
        });
        
        if (response.success) {
          setFeaturedProjects(response.data.projects);
        }
      } catch (error) {
        console.error('Error fetching featured projects:', error);
      } finally {
        setProjectsLoading(false);
      }
    };

    const fetchTeamMembers = async () => {
      try {
        setTeamLoading(true);
        const response = await supabaseRealService.getAllDevelopers();
        
        if (response.success) {
          setTeamMembers(response.data.developers || []);
        }
      } catch (error) {
        console.error('Error fetching team members:', error);
      } finally {
        setTeamLoading(false);
      }
    };

    fetchFeaturedProjects();
    fetchTeamMembers();
  }, []);
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-slow" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-primary/10 border border-primary/20"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Expert Developers, Exceptional Solutions</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Build Your Next Project with{' '}
              <span className="text-blitz-gradient">Blitzs</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              A team of expert developers delivering production-ready software and custom solutions. From web apps to mobile platforms, we build it all.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-blitz-gradient hover:opacity-90 text-lg px-8">
                <Link to="/projects">
                  Explore Projects
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8">
                <Link to="/contact">Hire Us</Link>
              </Button>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="grid grid-cols-3 gap-8 mt-16 max-w-lg mx-auto"
            >
              {[
                { value: '50+', label: 'Projects' },
                { value: '100+', label: 'Happy Clients' },
                { value: '5+', label: 'Years Experience' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <SectionHeader badge="What We Offer" title="Our Services" description="From ready-made solutions to fully custom software, we've got you covered" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all group hover:shadow-lg"
              >
                <div className="w-12 h-12 rounded-lg bg-blitz-gradient flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <service.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeader badge="Our Work" title="Featured Projects" description="Discover our latest production-ready applications" />
          
          {projectsLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-muted rounded-xl h-80"></div>
                </div>
              ))}
            </div>
          ) : featuredProjects.length === 0 ? (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                  <Code2 className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No projects yet</h3>
                <p className="text-muted-foreground">
                  Check back soon for our latest projects!
                </p>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project, index) => (
                <ProjectCard key={project._id} id={project._id} slug={project._id} {...project} index={index} />
              ))}
            </div>
          )}
          
          <div className="text-center mt-10">
            <Button asChild variant="outline" size="lg">
              <Link to="/projects">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <SectionHeader badge="The Team" title="Meet Our Experts" description="Talented developers ready to bring your vision to life" />
          
          {teamLoading ? (
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-muted rounded-xl h-80"></div>
                </div>
              ))}
            </div>
          ) : teamMembers.length === 0 ? (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No team members yet</h3>
                <p className="text-muted-foreground">
                  Our team is growing! Check back soon to meet our talented developers.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {teamMembers.map((member, index) => (
                <DeveloperCard 
                  key={member.id || member.name} 
                  name={member.name}
                  title={member.experience || 'Developer'}
                  avatarUrl={member.avatar}
                  bio={member.bio}
                  specializations={member.skills ? member.skills.slice(0, 3) : []}
                  skills={member.skills || []}
                  githubUrl={member.github}
                  linkedinUrl={member.linkedin}
                  portfolioUrl={member.portfolio}
                  experienceYears={0} // Database doesn't have this field
                  index={index} 
                />
              ))}
            </div>
          )}
          
          <div className="text-center mt-10">
            <Button asChild variant="outline" size="lg">
              <Link to="/team">View Full Team</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl bg-blitz-gradient p-8 md:p-12 text-center"
          >
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Ready to Build Something Amazing?
              </h2>
              <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
                Let's discuss your project and turn your ideas into reality.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary" className="text-lg">
                  <Link to="/contact">
                    Start Your Project
                    <Zap className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  <Link to="/how-to-use">Learn How It Works</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
