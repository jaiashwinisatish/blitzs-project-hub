import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Project from '../models/Project.js';
import Developer from '../models/Developer.js';

dotenv.config();

const seedData = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Project.deleteMany({});
    await Developer.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 12);
    const admin = await User.create({
      fullName: 'Admin User',
      email: 'admin@blitzs.com',
      password: adminPassword,
      role: 'admin'
    });
    console.log('Created admin user: admin@blitzs.com / admin123');

    // Create regular users
    const userPassword = await bcrypt.hash('user123', 12);
    const users = await User.create([
      {
        fullName: 'John Doe',
        email: 'john@example.com',
        password: userPassword,
        role: 'user'
      },
      {
        fullName: 'Jane Smith',
        email: 'jane@example.com',
        password: userPassword,
        role: 'user'
      },
      {
        fullName: 'Bob Wilson',
        email: 'bob@example.com',
        password: userPassword,
        role: 'user'
      }
    ]);
    console.log('Created 3 regular users: user@example.com / user123');

    // Create developers
    const developers = await Developer.create([
      {
        name: 'Alice Johnson',
        email: 'alice@blitzs.com',
        bio: 'Full-stack developer with 5+ years of experience in React and Node.js',
        skills: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'Tailwind CSS'],
        experience: 'advanced',
        github: 'https://github.com/alicejohnson',
        linkedin: 'https://linkedin.com/in/alicejohnson',
        portfolio: 'https://alicejohnson.dev'
      },
      {
        name: 'Charlie Brown',
        email: 'charlie@blitzs.com',
        bio: 'Mobile app developer specializing in React Native and Flutter',
        skills: ['React Native', 'Flutter', 'Firebase', 'Redux', 'GraphQL'],
        experience: 'intermediate',
        github: 'https://github.com/charliebrown',
        linkedin: 'https://linkedin.com/in/charliebrown'
      }
    ]);
    console.log('Created 2 developers');

    // Create sample projects
    const projects = await Project.create([
      {
        title: 'E-Commerce Platform',
        description: 'A full-featured e-commerce platform with user authentication, product management, shopping cart, and payment integration. Built with modern technologies and best practices.',
        shortDescription: 'Modern e-commerce platform with React and Node.js',
        price: 299,
        category: 'web',
        techStack: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
        features: [
          'User authentication and authorization',
          'Product catalog with search and filters',
          'Shopping cart functionality',
          'Payment integration with Stripe',
          'Order tracking system',
          'Admin dashboard',
          'Responsive design'
        ],
        images: [
          'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
          'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800'
        ],
        demoLink: 'https://demo-blitzs-ecommerce.vercel.app',
        githubLink: 'https://github.com/blitzs/ecommerce-platform',
        difficulty: 'intermediate',
        isFree: false,
        tags: ['ecommerce', 'react', 'nodejs', 'mongodb'],
        addedBy: admin._id
      },
      {
        title: 'Task Management App',
        description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
        shortDescription: 'Real-time task management app with team collaboration',
        price: 0,
        category: 'web',
        techStack: ['React', 'TypeScript', 'Socket.io', 'Express', 'PostgreSQL'],
        features: [
          'Real-time collaboration',
          'Drag and drop task management',
          'Team workspaces',
          'File attachments',
          'Comments and mentions',
          'Due date reminders',
          'Analytics dashboard'
        ],
        images: [
          'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800'
        ],
        demoLink: 'https://demo-blitzs-tasks.vercel.app',
        githubLink: 'https://github.com/blitzs/task-manager',
        difficulty: 'beginner',
        isFree: true,
        tags: ['task management', 'collaboration', 'react', 'typescript'],
        addedBy: admin._id
      },
      {
        title: 'Weather Dashboard',
        description: 'A beautiful weather dashboard with location-based forecasts, interactive maps, and detailed weather analytics.',
        shortDescription: 'Interactive weather dashboard with forecasts',
        price: 49,
        category: 'web',
        techStack: ['Vue.js', 'Chart.js', 'OpenWeather API', 'Geolocation API'],
        features: [
          'Current weather conditions',
          '7-day weather forecast',
          'Interactive weather maps',
          'Location search',
          'Weather alerts',
          'Historical weather data',
          'Responsive design'
        ],
        images: [
          'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800'
        ],
        demoLink: 'https://demo-blitzs-weather.vercel.app',
        githubLink: 'https://github.com/blitzs/weather-dashboard',
        difficulty: 'beginner',
        isFree: false,
        tags: ['weather', 'dashboard', 'vuejs', 'charts'],
        addedBy: admin._id
      },
      {
        title: 'Mobile Banking App',
        description: 'A secure mobile banking application with account management, transfers, bill payments, and financial insights.',
        shortDescription: 'Secure mobile banking app with financial insights',
        price: 599,
        category: 'mobile',
        techStack: ['React Native', 'Node.js', 'MongoDB', 'JWT', 'Redux'],
        features: [
          'Secure user authentication',
          'Account balance and transactions',
          'Money transfers',
          'Bill payments',
          'Budget tracking',
          'Financial insights',
          'Biometric authentication'
        ],
        images: [
          'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800'
        ],
        demoLink: 'https://demo-blitzs-banking.vercel.app',
        githubLink: 'https://github.com/blitzs/mobile-banking',
        difficulty: 'advanced',
        isFree: false,
        tags: ['banking', 'mobile', 'react native', 'security'],
        addedBy: admin._id
      },
      {
        title: 'AI Chatbot',
        description: 'An intelligent chatbot powered by machine learning for customer support and automated conversations.',
        shortDescription: 'AI-powered chatbot for customer support',
        price: 199,
        category: 'ai',
        techStack: ['Python', 'TensorFlow', 'React', 'FastAPI', 'PostgreSQL'],
        features: [
          'Natural language processing',
          'Multi-language support',
          'Sentiment analysis',
          'Context-aware responses',
          'Analytics dashboard',
          'Custom training',
          'API integration'
        ],
        images: [
          'https://images.unsplash.com/photo-1531297484015-80022131f5a1?w=800'
        ],
        demoLink: 'https://demo-blitzs-chatbot.vercel.app',
        githubLink: 'https://github.com/blitzs/ai-chatbot',
        difficulty: 'advanced',
        isFree: false,
        tags: ['ai', 'chatbot', 'machine learning', 'python'],
        addedBy: admin._id
      }
    ]);
    console.log('Created 5 sample projects');

    console.log('\n✅ Database seeded successfully!');
    console.log('\n📋 Login Credentials:');
    console.log('Admin: admin@blitzs.com / admin123');
    console.log('Users: user@example.com / user123 (john@example.com, jane@example.com, bob@example.com)');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
