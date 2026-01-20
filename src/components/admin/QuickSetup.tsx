import React, { useState } from 'react';
import { createFirstAdmin, setAdminRole } from '@/utils/create-admin';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const QuickSetup = () => {
  const [loading, setLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState('');
  const [adminData, setAdminData] = useState({
    email: '',
    password: '',
    fullName: ''
  });

  const createAdmin = async () => {
    if (!adminData.email || !adminData.password || !adminData.fullName) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    setDebugInfo('Creating admin account...');
    
    try {
      const result = await createFirstAdmin(
        adminData.email,
        adminData.password,
        adminData.fullName
      );
      
      if (result.success) {
        setDebugInfo('✅ Admin account created successfully!');
        toast.success('Admin account created successfully!');
        toast.info('Please check your email to verify the account, then you can login.');
        
        // Add sample data
        await addSampleData();
      } else {
        setDebugInfo(`❌ Error: ${result.message}`);
        toast.error(result.message);
      }
    } catch (error) {
      setDebugInfo(`❌ Setup failed: ${error.message}`);
      toast.error('Setup failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const checkExistingUser = async () => {
    if (!adminData.email) {
      toast.error('Please enter an email first');
      return;
    }

    setLoading(true);
    setDebugInfo('Checking existing user...');
    
    try {
      // Try to get user by email
      const { data: users, error } = await supabase.auth.admin.listUsers();
      
      if (error) {
        setDebugInfo(`❌ Error checking users: ${error.message}`);
        return;
      }

      const existingUser = users.users.find(u => u.email === adminData.email);
      
      if (existingUser) {
        setDebugInfo(`✅ User found: ${existingUser.id}`);
        
        // Try to set admin role manually
        const roleResult = await setAdminRole(existingUser.id);
        
        if (roleResult.success) {
          setDebugInfo(`✅ Admin role set for existing user!`);
          toast.success('Admin role set for existing user!');
        } else {
          setDebugInfo(`❌ Failed to set admin role: ${roleResult.message}`);
          toast.error('Failed to set admin role: ' + roleResult.message);
        }
      } else {
        setDebugInfo(`❌ No user found with email: ${adminData.email}`);
        toast.error('No user found with that email');
      }
    } catch (error) {
      setDebugInfo(`❌ Error: ${error.message}`);
      toast.error('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const addSampleData = async () => {
    try {
      setDebugInfo(prev => prev + '\n📦 Adding sample data...');
      
      // Add sample developer
      await supabase.from('developers').insert({
        name: 'John Developer',
        email: 'john@blitzs.dev',
        bio: 'Full-stack developer with 5+ years of experience in React, Node.js, and cloud technologies.',
        skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS'],
        experience: 'advanced',
        github: 'https://github.com/johndeveloper',
        linkedin: 'https://linkedin.com/in/johndeveloper',
        portfolio: 'https://johndeveloper.dev'
      });

      // Add sample project
      await supabase.from('projects').insert({
        title: 'E-Commerce Platform',
        description: 'A full-featured e-commerce platform built with React and Node.js, featuring user authentication, payment processing, admin dashboard, and real-time inventory management.',
        short_description: 'Modern e-commerce solution with React, Node.js, and Stripe integration',
        price: 99.99,
        category: 'web',
        tech_stack: ['React', 'TypeScript', 'Node.js', 'Stripe', 'PostgreSQL', 'Tailwind CSS'],
        features: [
          'User Authentication & Authorization',
          'Shopping Cart & Wishlist',
          'Payment Processing with Stripe',
          'Admin Dashboard',
          'Real-time Inventory',
          'Order Tracking',
          'Email Notifications'
        ],
        images: [
          'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop',
          'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop'
        ],
        demo_link: 'https://demo.blitzs-ecommerce.com',
        github_link: 'https://github.com/blitzs/ecommerce-platform',
        difficulty: 'intermediate',
        is_free: false,
        is_published: true,
        tags: ['ecommerce', 'react', 'nodejs', 'stripe', 'fullstack']
      });

      setDebugInfo(prev => prev + '\n✅ Sample data added successfully!');
    } catch (error) {
      console.error('Error adding sample data:', error);
      setDebugInfo(prev => prev + '\n⚠️ Sample data failed: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Quick Admin Setup</CardTitle>
          <CardDescription>
            Create your admin account and add sample data to get started
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Admin User"
                value={adminData.fullName}
                onChange={(e) => setAdminData(prev => ({ ...prev, fullName: e.target.value }))}
                disabled={loading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={adminData.email}
                onChange={(e) => setAdminData(prev => ({ ...prev, email: e.target.value }))}
                disabled={loading}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="•••••••••"
              value={adminData.password}
              onChange={(e) => setAdminData(prev => ({ ...prev, password: e.target.value }))}
              disabled={loading}
            />
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={createAdmin} 
              disabled={loading}
              className="flex-1"
            >
              {loading ? 'Creating Admin Account...' : 'Create Admin Account'}
            </Button>
            
            <Button 
              onClick={checkExistingUser} 
              disabled={loading}
              variant="outline"
              className="flex-1"
            >
              {loading ? 'Checking...' : 'Check Existing User'}
            </Button>
          </div>

          {debugInfo && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <h4 className="font-semibold mb-2">Debug Info:</h4>
              <pre className="text-xs whitespace-pre-wrap">{debugInfo}</pre>
            </div>
          )}

          <div className="text-sm text-muted-foreground space-y-2">
            <p><strong>Instructions:</strong></p>
            <p>1. Fill in the form and click "Create Admin Account"</p>
            <p>2. Check your email and verify the account</p>
            <p>3. Login with your credentials</p>
            <p>4. Go to /admin-dashboard</p>
            <p className="text-orange-600">If it fails, run the SQL in server/admin-fix.sql</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickSetup;
