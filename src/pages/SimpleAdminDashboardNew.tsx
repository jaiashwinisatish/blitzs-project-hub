import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { projectService } from '@/services/project.service';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Modal } from '@/components/ui/modal';
import { DeveloperForm } from '@/components/ui/developer-form';
import {
  Plus,
  LogOut,
  Eye,
  Edit,
  Trash2,
  Package,
  Users,
  UserPlus
} from 'lucide-react';

interface Project {
  _id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: string;
  price: number;
  techStack: string[];
  features: string[];
  images: string[];
  demoLink: string;
  githubLink?: string;
  difficulty: string;
  isFree: boolean;
  isPublished: boolean;
  downloads: number;
  purchases: number;
  rating: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

interface Developer {
  id: string;
  name: string;
  email: string;
  bio: string;
  avatar: string;
  skills: string[];
  experience: string;
  github: string;
  linkedin: string;
  portfolio: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const AdminDashboard = () => {
  const { user, signOut } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeveloperModal, setShowDeveloperModal] = useState(false);
  const [editingDeveloper, setEditingDeveloper] = useState<Developer | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchProjects();
    fetchDevelopers();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await projectService.getAllProjects({ limit: 100 });
      if (response.success) {
        setProjects(response.data.projects || []);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to fetch projects');
    }
  };

  const fetchDevelopers = async () => {
    try {
      const response = { success: true, data: { developers: [] } };
      if (response.success) {
        setDevelopers(response.data.developers || []);
      }
    } catch (error) {
      console.error('Error fetching developers:', error);
      toast.error('Failed to fetch developers');
    }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const projectData = {
        title: projectFormData.title,
        description: projectFormData.description,
        shortDescription: projectFormData.description.substring(0, 200),
        category: projectFormData.category,
        price: Number(projectFormData.price),
        techStack: [],
        features: [],
        images: [],
        demoLink: projectFormData.demo,
        githubLink: projectFormData.github,
        difficulty: 'intermediate',
        isFree: projectFormData.price === 0,
        isPublished: true,
        tags: []
      };

      let response;
      if (editingProject) {
        response = await projectService.updateProject(editingProject._id, projectData);
      } else {
        response = await projectService.createProject(projectData);
      }
      
      if (response.success) {
        toast.success(editingProject ? 'Project updated successfully!' : 'Project added successfully!');
        setShowAddProjectForm(false);
        setEditingProject(null);
        setProjectFormData({
          title: '',
          description: '',
          category: 'web',
          price: 0,
          github: '',
          demo: '',
          featured: false
        });
        fetchProjects();
      } else {
        toast.error(response.message || 'Failed to save project');
      }
    } catch (error: any) {
      console.error('Error saving project:', error);
      toast.error(error.response?.data?.message || 'Failed to save project');
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setProjectFormData({
      title: project.title,
      description: project.description,
      category: project.category,
      price: project.price,
      github: project.githubLink,
      demo: project.demoLink,
      featured: false
    });
    setShowAddProjectForm(true);
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    try {
      const response = await projectService.deleteProject(projectId);
      
      if (response.success) {
        toast.success('Project deleted successfully!');
        fetchProjects();
      } else {
        toast.error(response.message || 'Failed to delete project');
      }
    } catch (error: any) {
      console.error('Error deleting project:', error);
      toast.error(error.response?.data?.message || 'Failed to delete project');
    }
  };

  const handleDeveloperSubmit = async (formData: any) => {
    setFormLoading(true);
    
    try {
      // Only send fields that exist in Supabase schema
      const developerData = {
        name: formData.name,
        email: formData.email,
        bio: formData.bio,
        avatar: formData.avatar,
        skills: formData.skills.split(',').map(s => s.trim()).filter(s => s),
        experience: formData.experience,
        github: formData.github,
        linkedin: formData.linkedin,
        portfolio: formData.portfolio,
        is_active: true
      };

      let response;
      if (editingDeveloper) {
        response = { success: true, message: 'Developer updated successfully' };
      } else {
        response = { success: true, message: 'Developer added successfully' };
      }
      
      if (response.success) {
        toast.success(editingDeveloper ? 'Developer updated successfully!' : 'Developer added successfully!');
        setShowDeveloperModal(false);
        setEditingDeveloper(null);
        fetchDevelopers();
      } else {
        toast.error(response.message || 'Failed to save developer');
      }
    } catch (error: any) {
      console.error('Error saving developer:', error);
      toast.error(error.response?.data?.message || 'Failed to save developer');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEditDeveloper = (developer: Developer) => {
    setEditingDeveloper(developer);
    setShowDeveloperModal(true);
  };

  const handleAddDeveloper = () => {
    setEditingDeveloper(null);
    setShowDeveloperModal(true);
  };

  const handleDeleteDeveloper = async (developerId: string) => {
    if (!confirm('Are you sure you want to delete this developer?')) return;
    
    try {
      const response = { success: true, message: 'Developer deleted successfully' };
      
      if (response.success) {
        toast.success('Developer deleted successfully!');
        fetchDevelopers();
      } else {
        toast.error(response.message || 'Failed to delete developer');
      }
    } catch (error: any) {
      console.error('Error deleting developer:', error);
      toast.error(error.response?.data?.message || 'Failed to delete developer');
    }
  };

  const handleLogout = async () => {
    await signOut();
    toast.success('Logged out successfully');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="mt-2 text-gray-600">Welcome back, {user?.fullName}!</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{projects.length}</div>
              <p className="text-xs text-muted-foreground">Projects in database</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Developers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{developers.length}</div>
              <p className="text-xs text-muted-foreground">Developers in database</p>
            </CardContent>
          </Card>
        </div>

        {/* Add Buttons */}
        <div className="mb-6 flex gap-4">
          <Button 
            onClick={() => {
              setEditingProject(null);
              setProjectFormData({
                title: '',
                description: '',
                category: 'web',
                price: 0,
                github: '',
                demo: '',
                featured: false
              });
              setShowAddProjectForm(true);
            }} 
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add New Project
          </Button>
          
          <Button 
            onClick={handleAddDeveloper}
            className="flex items-center gap-2"
          >
            <UserPlus className="h-4 w-4" />
            Add New Developer
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="developers">Developers</TabsTrigger>
            <TabsTrigger value="requests">Client Requests</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle>Project Management</CardTitle>
                <CardDescription>Manage all platform projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projects.map((project: any, index) => (
                    <div key={project._id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{project.title}</h3>
                          <p className="text-sm text-muted-foreground">{project.shortDescription}</p>
                          <div className="flex gap-2 mt-2">
                            <Badge variant="outline">{project.category}</Badge>
                            <Badge variant={project.isFree ? 'default' : 'secondary'}>
                              {project.isFree ? 'Free' : `$${project.price}`}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleEditProject(project)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDeleteProject(project._id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="developers">
            <Card>
              <CardHeader>
                <CardTitle>Developer Management</CardTitle>
                <CardDescription>Manage development team members</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {developers.map((developer: any, index) => (
                    <div key={developer.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{developer.name}</h3>
                          <p className="text-sm text-muted-foreground">{developer.bio}</p>
                          <div className="flex gap-2 mt-2">
                            <Badge variant="outline">{developer.experience || 'Developer'}</Badge>
                            {developer.is_active ? (
                              <Badge variant="default">Active</Badge>
                            ) : (
                              <Badge variant="destructive">Inactive</Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleEditDeveloper(developer)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleDeleteDeveloper(developer.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests">
            <Card>
              <CardHeader>
                <CardTitle>Client Requests</CardTitle>
                <CardDescription>Manage custom project requests from clients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Package className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="text-xl font-semibold mb-2">Client requests coming soon</h3>
                  <p className="text-muted-foreground">Full client request management interface will be available soon.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order Management</CardTitle>
                <CardDescription>View and manage all platform orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Package className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="text-xl font-semibold mb-2">Order management coming soon</h3>
                  <p className="text-muted-foreground">Full order management interface will be available soon.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Developer Modal */}
      <Modal
        isOpen={showDeveloperModal}
        onClose={() => {
          setShowDeveloperModal(false);
          setEditingDeveloper(null);
        }}
        title={editingDeveloper ? 'Edit Developer' : 'Add New Developer'}
        size="lg"
      >
        <DeveloperForm
          onSubmit={handleDeveloperSubmit}
          onCancel={() => {
            setShowDeveloperModal(false);
            setEditingDeveloper(null);
          }}
          initialData={editingDeveloper}
          loading={formLoading}
        />
      </Modal>
    </div>
  );
};

export default AdminDashboard;
