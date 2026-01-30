import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, ExternalLink, Edit, Trash2, UserPlus, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import {
  useDevelopers,
  useAddDeveloper,
  useUpdateDeveloper,
  useDeleteDeveloper
} from '../hooks/useAdmin';

const Team = () => {
  const { user } = useAuth();
  const { data: developers = [], isLoading: loading } = useDevelopers();
  const addDeveloperMutation = useAddDeveloper();
  const updateDeveloperMutation = useUpdateDeveloper();
  const deleteDeveloperMutation = useDeleteDeveloper();

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingDeveloper, setEditingDeveloper] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    bio: '',
    avatar_url: '',
    skills: '',
    github_url: '',
    linkedin_url: ''
  });

  const handleAddDeveloper = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const developerData = {
        ...formData,
        skills: formData.skills.split(',').map(s => s.trim()).filter(s => s)
      };

      let result;
      if (editingDeveloper) {
        result = await updateDeveloperMutation.mutateAsync({
          developerId: editingDeveloper.id,
          updateData: developerData
        });
      } else {
        result = await addDeveloperMutation.mutateAsync(developerData);
      }

      if (result.success) {
        toast.success(editingDeveloper ? 'Developer updated successfully!' : 'Developer added successfully!');
        setShowAddForm(false);
        setEditingDeveloper(null);
        setFormData({
          name: '',
          role: '',
          bio: '',
          avatar_url: '',
          skills: '',
          github_url: '',
          linkedin_url: ''
        });
      } else {
        toast.error(result.message || 'Failed to save developer');
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
      await adminService.deleteDeveloper(developerId);
      toast.success('Developer deleted successfully!');
      fetchDevelopers();
    } catch (error: any) {
      console.error('Error deleting developer:', error);
      toast.error(error.response?.data?.message || 'Failed to delete developer');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header Skeleton */}
        <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <Skeleton className="h-12 w-64 mx-auto mb-6" />
              <Skeleton className="h-6 w-96 mx-auto mb-8" />
              <Skeleton className="h-10 w-40 mx-auto" />
            </div>
          </div>
        </section>

        {/* Team Grid Skeleton */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[...Array(6)].map((_, index) => (
                <Card key={index} className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <Skeleton className="w-16 h-16 rounded-full" />
                      <div className="flex-1">
                        <Skeleton className="h-6 w-32 mb-1" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    </div>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4 mb-4" />
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-6 w-14" />
                    </div>
                    <div className="flex gap-2">
                      <Skeleton className="h-8 w-8" />
                      <Skeleton className="h-8 w-8" />
                      <Skeleton className="h-8 w-8" />
                      <Skeleton className="h-8 w-8" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Meet Our <span className="text-blitz-gradient">Team</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Talented developers passionate about creating exceptional digital experiences
            </p>

            {user && user.role === 'admin' && (
              <Button onClick={() => setShowAddForm(true)} className="mb-8">
                <UserPlus className="h-4 w-4 mr-2" />
                Add Developer
              </Button>
            )}
          </motion.div>
        </div>
      </section>

      {/* Add Developer Form */}
      {showAddForm && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto"
            >
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6">
                    {editingDeveloper ? 'Edit Developer' : 'Add New Developer'}
                  </h2>
                  <form onSubmit={handleAddDeveloper} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Name</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full p-3 border rounded-lg"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full p-3 border rounded-lg"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Bio</label>
                      <textarea
                        value={formData.bio}
                        onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                        className="w-full p-3 border rounded-lg h-32"
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Avatar URL</label>
                        <input
                          type="url"
                          value={formData.avatar}
                          onChange={(e) => setFormData(prev => ({ ...prev, avatar: e.target.value }))}
                          className="w-full p-3 border rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Experience</label>
                        <select
                          value={formData.experience}
                          onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                          className="w-full p-3 border rounded-lg"
                        >
                          <option value="junior">Junior</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="senior">Senior</option>
                          <option value="lead">Lead</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Skills (comma-separated)</label>
                      <input
                        type="text"
                        value={formData.skills}
                        onChange={(e) => setFormData(prev => ({ ...prev, skills: e.target.value }))}
                        className="w-full p-3 border rounded-lg"
                        placeholder="React, TypeScript, Node.js..."
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">GitHub</label>
                        <input
                          type="url"
                          value={formData.github}
                          onChange={(e) => setFormData(prev => ({ ...prev, github: e.target.value }))}
                          className="w-full p-3 border rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">LinkedIn</label>
                        <input
                          type="url"
                          value={formData.linkedin}
                          onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
                          className="w-full p-3 border rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Portfolio</label>
                        <input
                          type="url"
                          value={formData.portfolio}
                          onChange={(e) => setFormData(prev => ({ ...prev, portfolio: e.target.value }))}
                          className="w-full p-3 border rounded-lg"
                        />
                      </div>
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
            </motion.div>
          </div>
        </section>
      )}

      {/* Team Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {developers.length === 0 ? (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                  <UserPlus className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No team members yet</h3>
                <p className="text-muted-foreground">
                  Our team is growing! Check back soon to meet our talented developers.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {developers.map((developer, index) => (
                <motion.div
                  key={developer.id || developer.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden bg-muted">
                          <img
                            src={developer.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'}
                            alt={developer.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold">{developer.name}</h3>
                          <p className="text-sm text-muted-foreground">{developer.experience || 'Developer'}</p>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4">{developer.bio}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {(developer.skills || []).slice(0, 3).map((skill: string) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {(developer.skills || []).length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{(developer.skills || []).length - 3}
                          </Badge>
                        )}
                      </div>

                      <div className="flex gap-2">
                        {developer.github && (
                          <Button size="sm" variant="outline" asChild>
                            <a href={developer.github} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        {developer.linkedin && (
                          <Button size="sm" variant="outline" asChild>
                            <a href={developer.linkedin} target="_blank" rel="noopener noreferrer">
                              <Linkedin className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        {developer.email && (
                          <Button size="sm" variant="outline" asChild>
                            <a href={`mailto:${developer.email}`}>
                              <Mail className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        {developer.portfolio && (
                          <Button size="sm" variant="outline" asChild>
                            <a href={developer.portfolio} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        )}

                        {/* Admin Actions */}
                        {user && user.role === 'admin' && (
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
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Team;
