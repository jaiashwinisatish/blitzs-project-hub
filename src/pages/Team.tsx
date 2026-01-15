import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

const teamMembers = [
  {
    name: 'Alex Chen',
    role: 'Full-Stack Developer & Founder',
    bio: 'Passionate about building scalable web applications with modern technologies. 8+ years of experience in React, Node.js, and cloud architecture.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'MongoDB'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'alex@blitzs.com'
  },
  {
    name: 'Sarah Johnson',
    role: 'UI/UX Designer',
    bio: 'Creating beautiful and intuitive user experiences. Specialized in design systems, user research, and accessibility.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
    skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research', 'Design Systems'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'sarah@blitzs.com'
  },
  {
    name: 'Michael Rodriguez',
    role: 'Mobile Developer',
    bio: 'Expert in cross-platform mobile development. Building native-feeling apps with React Native and Flutter.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    skills: ['React Native', 'Flutter', 'iOS', 'Android', 'Firebase'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'michael@blitzs.com'
  },
  {
    name: 'Emily Watson',
    role: 'Backend Engineer',
    bio: 'Specializing in building robust APIs and microservices. Expert in database design and system architecture.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    skills: ['Python', 'Node.js', 'PostgreSQL', 'Docker', 'Kubernetes'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'emily@blitzs.com'
  },
  {
    name: 'David Kim',
    role: 'DevOps Engineer',
    bio: 'Ensuring smooth deployment and infrastructure management. Expert in CI/CD pipelines and cloud optimization.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    skills: ['AWS', 'Docker', 'Jenkins', 'Terraform', 'Monitoring'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'david@blitzs.com'
  },
  {
    name: 'Lisa Anderson',
    role: 'Project Manager',
    bio: 'Keeping projects on track and teams aligned. PMP certified with 10+ years in tech project management.',
    avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400',
    skills: ['Agile', 'Scrum', 'Risk Management', 'Team Leadership', 'Stakeholder Communication'],
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'lisa@blitzs.com'
  }
];

const Team = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Meet Our Team
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The talented individuals behind Blitzs, dedicated to building exceptional software solutions
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      {/* Avatar */}
                      <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Name & Role */}
                      <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                      <Badge variant="secondary" className="mb-4">
                        {member.role}
                      </Badge>

                      {/* Bio */}
                      <p className="text-muted-foreground text-sm mb-6 line-clamp-3">
                        {member.bio}
                      </p>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-1 justify-center mb-6">
                        {member.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      {/* Social Links */}
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" asChild>
                          <a href={member.github} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4" />
                          </a>
                        </Button>
                        <Button size="sm" variant="outline" asChild>
                          <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                            <Linkedin className="h-4 w-4" />
                          </a>
                        </Button>
                        <Button size="sm" variant="outline" asChild>
                          <a href={`mailto:${member.email}`}>
                            <Mail className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold mb-6">
              Want to Join Our Team?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              We're always looking for talented developers, designers, and innovators to help us build the future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="mailto:careers@blitzs.com">
                  <Mail className="mr-2 h-5 w-5" />
                  Send Your Resume
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/contact">
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Open Positions
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: '50+', label: 'Projects Delivered' },
              { number: '30+', label: 'Happy Clients' },
              { number: '6+', label: 'Team Members' },
              { number: '5+', label: 'Years Experience' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
