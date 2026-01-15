import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowRight, BookOpen, Video, FileText, Users, Zap, Shield, Headphones } from 'lucide-react';

const Guide = () => {
  const steps = [
    {
      number: '1',
      title: 'Browse Projects',
      description: 'Explore our collection of ready-to-use projects. Filter by category, price, or technology stack.',
      icon: <BookOpen className="h-6 w-6" />,
      features: ['Advanced search', 'Category filters', 'Tech stack filtering', 'Price sorting']
    },
    {
      number: '2',
      title: 'Choose Your Project',
      description: 'Select the perfect project for your needs. View demos, check features, and read reviews.',
      icon: <Zap className="h-6 w-6" />,
      features: ['Live demos', 'Detailed descriptions', 'User reviews', 'Tech stack info']
    },
    {
      number: '3',
      title: 'Purchase & Download',
      description: 'Complete your purchase securely and get instant access to the source code.',
      icon: <Shield className="h-6 w-6" />,
      features: ['Secure payment', 'Instant download', 'License included', '5 download attempts']
    },
    {
      number: '4',
      title: 'Deploy & Customize',
      description: 'Deploy your project immediately or customize it to fit your specific requirements.',
      icon: <Users className="h-6 w-6" />,
      features: ['Deployment guides', 'Customization docs', 'Support available', 'Community forum']
    }
  ];

  const features = [
    {
      title: 'Production Ready',
      description: 'All projects are built with best practices and ready for production deployment.',
      icon: <CheckCircle2 className="h-8 w-8" />
    },
    {
      title: 'Modern Tech Stack',
      description: 'We use the latest technologies and frameworks to ensure scalability and performance.',
      icon: <Zap className="h-8 w-8" />
    },
    {
      title: 'Full Documentation',
      description: 'Every project includes comprehensive documentation and setup instructions.',
      icon: <FileText className="h-8 w-8" />
    },
    {
      title: 'Video Tutorials',
      description: 'Step-by-step video guides to help you understand and customize your projects.',
      icon: <Video className="h-8 w-8" />
    },
    {
      title: '24/7 Support',
      description: 'Our team is always available to help you with any questions or issues.',
      icon: <Headphones className="h-8 w-8" />
    },
    {
      title: 'Regular Updates',
      description: 'Projects are regularly updated with new features and security patches.',
      icon: <Shield className="h-8 w-8" />
    }
  ];

  const categories = [
    {
      name: 'Web Applications',
      description: 'Full-stack web apps with authentication, databases, and modern UI.',
      projects: '15+ Projects',
      tech: ['React', 'Node.js', 'Vue.js', 'Angular']
    },
    {
      name: 'Mobile Apps',
      description: 'Cross-platform mobile applications for iOS and Android.',
      projects: '8+ Projects',
      tech: ['React Native', 'Flutter', 'Ionic', 'Native']
    },
    {
      name: 'AI & Machine Learning',
      description: 'AI-powered applications with machine learning capabilities.',
      projects: '5+ Projects',
      tech: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI']
    },
    {
      name: 'Blockchain',
      description: 'Decentralized applications and smart contract solutions.',
      projects: '3+ Projects',
      tech: ['Solidity', 'Web3.js', 'Ethereum', 'NFTs']
    }
  ];

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
              How to Use Blitzs
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get started with our platform in four simple steps and launch your next project
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        {step.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary" className="text-lg px-3 py-1">
                            {step.number}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{step.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">
                      {step.description}
                    </CardDescription>
                    <div className="space-y-2">
                      {step.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Blitzs?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We provide everything you need to succeed with your projects
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="text-center">
                  <CardHeader>
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Project Categories</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore projects across different categories and technologies
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <Badge variant="secondary">{category.projects}</Badge>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">
                      {category.description}
                    </CardDescription>
                    <div className="flex flex-wrap gap-1">
                      {category.tech.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of developers who have accelerated their projects with Blitzs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <a href="/projects">
                    <Zap className="mr-2 h-5 w-5" />
                    Browse Projects
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="/contact">
                    <Users className="mr-2 h-5 w-5" />
                    Get Custom Help
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-6">
              {[
                {
                  question: 'What do I get when I purchase a project?',
                  answer: 'You get the complete source code, database setup scripts, documentation, deployment guides, and a license to use the project in commercial applications.'
                },
                {
                  question: 'Can I customize the projects?',
                  answer: 'Yes! All projects come with full source code and documentation. You can customize them to fit your specific needs.'
                },
                {
                  question: 'Do you provide support?',
                  answer: 'We provide 24/7 support via email and our community forum. Premium support packages are also available.'
                },
                {
                  question: 'What if I need a custom project?',
                  answer: 'We offer custom development services. Contact us through the "Hire Us" page to discuss your requirements.'
                },
                {
                  question: 'Are the projects production-ready?',
                  answer: 'Yes, all projects are built with production in mind, including proper error handling, security measures, and scalability considerations.'
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{faq.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Guide;
