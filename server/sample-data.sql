-- Sample Data for Projects and Developers
-- Run this in Supabase SQL Editor to add sample data

-- Add Sample Developers
INSERT INTO developers (
  name, 
  email, 
  bio, 
  avatar, 
  skills, 
  experience, 
  github, 
  linkedin, 
  portfolio,
  is_active
) VALUES 
(
  'Sarah Chen',
  'sarah@blitzs.dev',
  'Full-stack developer with 5+ years of experience in React, Node.js, and cloud technologies. Specializes in building scalable web applications and RESTful APIs.',
  'https://images.unsplash.com/photo-1494790108757-9c3e5f7d5a?w=400',
  ARRAY['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS', 'Docker'],
  'advanced',
  'https://github.com/sarahchen',
  'https://linkedin.com/in/sarahchen',
  'https://sarahchen.dev',
  true
),
(
  'Mike Johnson',
  'mike@blitzs.dev',
  'Frontend specialist passionate about creating beautiful and responsive user interfaces. Expert in React, Vue.js, and modern CSS frameworks.',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
  ARRAY['React', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  'intermediate',
  'https://github.com/mikejohnson',
  'https://linkedin.com/in/mikejohnson',
  'https://mikejohnson.dev',
  true
),
(
  'Emily Rodriguez',
  'emily@blitzs.dev',
  'Backend developer with expertise in Node.js, Python, and database design. Loves building efficient APIs and working with complex data structures.',
  'https://images.unsplash.com/photo-1438761681033-6c21a3ad549?w=400',
  ARRAY['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'Redis', 'GraphQL'],
  'advanced',
  'https://github.com/emilyrodriguez',
  'https://linkedin.com/in/emilyrodriguez',
  'https://emilyrodriguez.dev',
  true
),
(
  'David Kim',
  'david@blitzs.dev',
  'Mobile app developer specializing in React Native and Flutter. Created several successful apps for iOS and Android platforms.',
  'https://images.unsplash.com/photo-1507591064342-8c6e0b6ddd6?w=400',
  ARRAY['React Native', 'Flutter', 'Dart', 'JavaScript', 'Firebase'],
  'intermediate',
  'https://github.com/davidkim',
  'https://linkedin.com/in/davidkim',
  'https://davidkim.dev',
  true
);

-- Add Sample Projects
INSERT INTO projects (
  title,
  description,
  short_description,
  price,
  category,
  tech_stack,
  features,
  images,
  demo_link,
  github_link,
  difficulty,
  is_free,
  is_published,
  downloads,
  purchases,
  rating,
  tags,
  added_by
) VALUES
(
  'Task Management System',
  'A comprehensive task management application with real-time collaboration, team management, and progress tracking. Features include drag-and-drop task organization, deadline management, file attachments, and team workspaces.',
  'Modern task management app with real-time collaboration and team features',
  49.99,
  'web',
  ARRAY['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Socket.io', 'Tailwind CSS'],
  ARRAY['Real-time Updates', 'Team Collaboration', 'Drag & Drop Interface', 'Deadline Management', 'File Attachments', 'Analytics Dashboard'],
  ARRAY[
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop'
  ],
  'https://taskmanager-demo.blitzs.dev',
  'https://github.com/blitzs/task-manager',
  'intermediate',
  false,
  true,
  125,
  89,
  4.5,
  ARRAY['productivity', 'collaboration', 'react', 'typescript'],
  (SELECT id FROM profiles WHERE email = 'sarah@blitzs.dev' LIMIT 1)
),
(
  'E-Commerce Platform',
  'A full-featured e-commerce platform with shopping cart, payment processing, inventory management, and admin dashboard. Includes user authentication, order tracking, and email notifications.',
  'Complete e-commerce solution with React, Node.js, and Stripe integration',
  99.99,
  'web',
  ARRAY['React', 'Node.js', 'Stripe', 'PostgreSQL', 'Redux', 'Tailwind CSS'],
  ARRAY['Shopping Cart', 'Payment Processing', 'Admin Dashboard', 'Inventory Management', 'Order Tracking', 'Email Notifications'],
  ARRAY[
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop'
  ],
  'https://ecommerce-demo.blitzs.dev',
  'https://github.com/blitzs/ecommerce-platform',
  'intermediate',
  false,
  true,
  234,
  167,
  4.7,
  ARRAY['ecommerce', 'react', 'nodejs', 'stripe'],
  (SELECT id FROM profiles WHERE email = 'mike@blitzs.dev' LIMIT 1)
),
(
  'Weather Dashboard',
  'A beautiful weather dashboard with real-time updates, location search, and detailed weather information. Features include 7-day forecast, weather maps, and severe weather alerts.',
  'Modern weather dashboard with real-time updates and location-based forecasts',
  29.99,
  'web',
  ARRAY['React', 'TypeScript', 'OpenWeather API', 'Chart.js', 'Tailwind CSS'],
  ARRAY['Real-time Updates', 'Location Search', '7-Day Forecast', 'Weather Maps', 'Severe Weather Alerts'],
  ARRAY[
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop'
  ],
  'https://weather-demo.blitzs.dev',
  'https://github.com/blitzs/weather-dashboard',
  'beginner',
  false,
  true,
  412,
  298,
  4.8,
  ARRAY['weather', 'dashboard', 'api', 'react'],
  (SELECT id FROM profiles WHERE email = 'emily@blitzs.dev' LIMIT 1)
),
(
  'Social Media Analytics',
  'Analytics dashboard for social media managers with post scheduling, engagement tracking, and competitor analysis. Supports multiple platforms and detailed reporting.',
  'Social media analytics platform with scheduling and engagement tracking',
  79.99,
  'web',
  ARRAY['React', 'Node.js', 'MongoDB', 'Twitter API', 'Chart.js', 'Material-UI'],
  ARRAY['Post Scheduling', 'Engagement Analytics', 'Competitor Analysis', 'Multi-platform Support', 'Custom Reports'],
  ARRAY[
    'https://images.unsplash.com/photo-1460995809289-5d5a576a95b?w=800&h=400&fit=crop',
    'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop'
  ],
  'https://analytics-demo.blitzs.dev',
  'https://github.com/blitzs/social-analytics',
  'advanced',
  false,
  true,
  156,
  89,
  4.6,
  ARRAY['analytics', 'social', 'marketing', 'dashboard'],
  (SELECT id FROM profiles WHERE email = 'david@blitzs.dev' LIMIT 1)
);

-- Verify data was inserted
SELECT 'Sample data inserted successfully!' as status;
