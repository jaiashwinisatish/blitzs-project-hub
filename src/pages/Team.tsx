import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, ExternalLink, Edit, Trash2, UserPlus, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

const Team = () => {
  const { user } = useAuth();
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingDeveloper, setEditingDeveloper] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    avatar: '',
    skills: '',
    experience: 'intermediate',
    github: '',
    linkedin: '',
    portfolio: ''
  });

  useEffect(() => {
    fetchDevelopers();
  }, []);

  const fetchDevelopers = async () => {
    try {
      const { data: developers, error } = await supabase
        .from('developers')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching developers:', error);
        toast.error('Failed to fetch developers');
      } else {
        setDevelopers(developers || []);
      }
    } catch (error) {
      console.error('Error fetching developers:', error);
      toast.error('Failed to fetch developers');
    } finally {
      setLoading(false);
    }
  };

  const handleAddDeveloper = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const developerData = {
        ...formData,
        skills: formData.skills.split(',').map(s => s.trim()).filter(s => s),
        is_active: true
      };

      let response;
      if (editingDeveloper) {
        const { error } = await supabase
          .from('developers')
          .update(developerData)
          .eq('id', editingDeveloper.id);
        
        response = { success: !error, message: error?.message };
      } else {
        const { error } = await supabase
          .from('developers')
          .insert(developerData);
        
        response = { success: !error, message: error?.message };
      }
      
      if (response.success) {
        toast.success(editingDeveloper ? 'Developer updated successfully!' : 'Developer added successfully!');
        setShowAddForm(false);
        setEditingDeveloper(null);
        setFormData({
          name: '',
          email: '',
          bio: '',
          avatar: '',
          skills: '',
          experience: 'intermediate',
          github: '',
          linkedin: '',
          portfolio: ''
        });
        fetchDevelopers();
      } else {
        toast.error(response.message || 'Failed to save developer');
      }
    } catch (error: any) {
      console.error('Error saving developer:', error);
      toast.error(error.message || 'Failed to save developer');
    }
  };

  const handleEditDeveloper = (developer: any) => {
    setEditingDeveloper(developer);
    setFormData({
      name: developer.name,
      email: developer.email,
      bio: developer.bio,
      avatar: developer.avatar,
      skills: developer.skills ? developer.skills.join(', ') : '',
      experience: developer.experience,
      github: developer.github,
      linkedin: developer.linkedin,
      portfolio: developer.portfolio
    });
    setShowAddForm(true);
  };

  const handleDeleteDeveloper = async (developerId: string) => {
    if (!confirm('Are you sure you want to delete this developer?')) return;
    
    try {
      const { error } = await supabase
        .from('developers')
        .delete()
        .eq('id', developerId);
      
      if (error) {
        toast.error('Failed to delete developer');
      } else {
        toast.success('Developer deleted successfully!');
        fetchDevelopers();
      }
    } catch (error: any) {
      console.error('Error deleting developer:', error);
      toast.error('Failed to delete developer');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

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
              Development Team
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The talented individuals behind Blitzs, dedicated to building exceptional software solutions
            </p>
            {user?.role === 'admin' && (
              <div className="mt-6">
                <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Developer
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Add Developer Form */}
      {showAddForm && user?.role === 'admin' && (
        <section className="py-8">
          <div className="container mx-auto px-4">
            <Card className="max-w-2xl mx-auto">
              <CardContent>
                <form onSubmit={handleAddDeveloper} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-3 py-2 border border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter developer name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-3 py-2 border border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter email address"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                    <textarea
                      required
                      value={formData.bio}
                      onChange={(e) => setFormData({...formData, bio: e.target.value})}
                      rows={4}
                      className="w-full px-3 py-2 border border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Describe the developer's background and expertise"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Avatar URL</label>
                      <input
                        type="url"
                        value={formData.avatar}
                        onChange={(e) => setFormData({...formData, avatar: e.target.value})}
                        className="w-full px-3 py-2 border border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://example.com/avatar.jpg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Skills (comma-separated)</label>
                      <input
                        type="text"
                        required
                        value={formData.skills}
                        onChange={(e) => setFormData({...formData, skills: e.target.value})}
                        className="w-full px-3 py-2 border border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="React, Node.js, TypeScript, etc."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                      <select
                        value={formData.experience}
                        onChange={(e) => setFormData({...formData, experience: e.target.value})}
                        className="w-full px-3 py-2 border border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                        <option value="expert">Expert</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">GitHub</label>
                      <input
                        type="url"
                        value={formData.github}
                        onChange={(e) => setFormData({...formData, github: e.target.value})}
                        className="w-full px-3 py-2 border border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://github.com/username"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                      <input
                        type="url"
                        value={formData.linkedin}
                        onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                        className="w-full px-3 py-2 border border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio</label>
                    <input
                      type="url"
                      value={formData.portfolio}
                      onChange={(e) => setFormData({...formData, portfolio: e.target.value})}
                      className="w-full px-3 py-2 border border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://portfolio.example.com"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button type="submit">
                      {editingDeveloper ? 'Update Developer' : 'Add Developer'}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => {
                        setShowAddForm(false);
                        setEditingDeveloper(null);
                        setFormData({
                          name: '',
                          email: '',
                          bio: '',
                          avatar: '',
                          skills: '',
                          experience: 'intermediate',
                          github: '',
                          linkedin: '',
                          portfolio: ''
                        });
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Team Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {developers.map((developer, index) => (
              <motion.div
                key={developer.id}
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
                          src={developer.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'}
                          alt={developer.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>

                      {/* Name & Role */}
                      <h3 className="text-xl font-semibold mb-2">{developer.name}</h3>
                      <Badge variant="secondary" className="mb-4">
                        {developer.experience || 'Developer'}
                      </Badge>

                      {/* Bio */}
                      <p className="text-muted-foreground text-sm mb-6 line-clamp-3">
                        {developer.bio}
                      </p>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-1 justify-center mb-6">
                        {(developer.skills || []).slice(0, 6).map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {(developer.skills || []).length > 6 && (
                          <Badge variant="outline" className="text-xs">
                            +{(developer.skills || []).length - 6}
                          </Badge>
                        )}
                      </div>

                      {/* Social Links */}
                      <div className="flex gap-2 justify-center">
                        <Button size="sm" variant="outline" asChild>
                          <a href={developer.github} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4" />
                          </a>
                        </Button>
                        <Button size="sm" variant="outline" asChild>
                          <a href={developer.linkedin} target="_blank" rel="noopener noreferrer">
                            <Linkedin className="h-4 w-4" />
                          </a>
                        </Button>
                        <Button size="sm" variant="outline" asChild>
                          <a href={`mailto:${developer.email}`}>
                            <Mail className="h-4 w-4" />
                          </a>
                        </Button>
                        {user?.role === 'admin' && (
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleEditDeveloper(developer)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleDeleteDeveloper(developer.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
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
