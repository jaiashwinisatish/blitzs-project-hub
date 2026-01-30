import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import {
  useProjects,
  useCreateProject,
  useUpdateProject,
  useDeleteProject
} from '@/hooks/useProjects';
import {
  useDevelopers,
  useAddDeveloper,
  useUpdateDeveloper,
  useDeleteDeveloper,
  useDashboardStats
} from '@/hooks/useAdmin';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
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

const AdminDashboard = () => {
  const { user, signOut } = useAuth();

  // Use hooks instead of direct service calls
  const { data: projects = [], isLoading: projectsLoading } = useProjects({ limit: 100 });
  const { data: developers = [], isLoading: developersLoading } = useDevelopers();
  const { data: dashboardStats } = useDashboardStats();

  // Mutations
  const createProjectMutation = useCreateProject();
  const updateProjectMutation = useUpdateProject();
  const deleteProjectMutation = useDeleteProject();
  const addDeveloperMutation = useAddDeveloper();
  const updateDeveloperMutation = useUpdateDeveloper();
  const deleteDeveloperMutation = useDeleteDeveloper();

  const [showAddForm, setShowAddForm] = useState(false);
  const [showAddDeveloperForm, setShowAddDeveloperForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingDeveloper, setEditingDeveloper] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'web',
    price: 0,
    github: '',
    demo: '',
    featured: false
  });
  const [developerFormData, setDeveloperFormData] = useState({
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

  // Remove old useEffect and fetch functions - now using hooks

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const projectData = {
        title: formData.title,
        description: formData.description,
        shortDescription: formData.description.substring(0, 200),
        category: formData.category,
        price: Number(formData.price),
        techStack: [],
        features: [],
        images: [],
        demoLink: formData.demo,
        githubLink: formData.github,
        difficulty: 'intermediate',
        isFree: formData.price === 0,
        isPublished: true,
        tags: []
      };

      let response;
      if (editingProject) {
        await updateProjectMutation.mutateAsync({
          projectId: editingProject.id,
          updateData: projectData
        });
      } else {
        await createProjectMutation.mutateAsync(projectData);
      }

      toast.success(editingProject ? 'Project updated successfully!' : 'Project added successfully!');
      setShowAddForm(false);
      setEditingProject(null);
      setFormData({
        title: '',
        description: '',
        category: 'web',
        price: 0,
        github: '',
        demo: '',
        featured: false
      });
    } catch (error: any) {
      console.error('Error saving project:', error);
      toast.error('Failed to save project');
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      category: project.category,
      price: project.price,
      github: project.githubLink,
      demo: project.demoLink,
      featured: false
    });
    setShowAddForm(true);
  };

  const handleDeleteProject = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      await deleteProjectMutation.mutateAsync(projectId);
      toast.success('Project deleted successfully!');
    } catch (error: any) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
    }
  };

  const handleAddDeveloper = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const developerData = {
        ...developerFormData,
        skills: developerFormData.skills.split(',').map(s => s.trim()).filter(s => s),
        isActive: true
      };

      if (editingDeveloper) {
        await updateDeveloperMutation.mutateAsync({
          developerId: editingDeveloper.id,
          updateData: developerData
        });
      } else {
        await addDeveloperMutation.mutateAsync(developerData);
      }

      toast.success(editingDeveloper ? 'Developer updated successfully!' : 'Developer added successfully!');
      setShowAddDeveloperForm(false);
      setEditingDeveloper(null);
      setDeveloperFormData({
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
    } catch (error: any) {
      console.error('Error saving developer:', error);
      toast.error('Failed to save developer');
    }
  };

  const handleEditDeveloper = (developer: any) => {
    setEditingDeveloper(developer);
    setDeveloperFormData({
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
    setShowAddDeveloperForm(true);
  };

  const handleDeleteDeveloper = async (developerId: string) => {
    if (!confirm('Are you sure you want to delete this developer?')) return;

    try {
      await deleteDeveloperMutation.mutateAsync(developerId);
      toast.success('Developer deleted successfully!');
    } catch (error: any) {
      console.error('Error deleting developer:', error);
      toast.error('Failed to delete developer');
    }
  };

  if (projectsLoading || developersLoading) {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Skeleton */}
          <div className="mb-8 flex justify-between items-center">
            <div>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-5 w-64" />
            </div>
            <Skeleton className="h-10 w-24" />
          </div>

          {/* Stats Cards Skeleton */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-16" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tabs Skeleton */}
          <div className="space-y-6">
            <Skeleton className="h-10 w-full grid-cols-4" />

            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-40 mb-2" />
                <Skeleton className="h-4 w-64" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <Skeleton className="h-5 w-48 mb-1" />
                          <Skeleton className="h-4 w-64 mb-2" />
                          <div className="flex gap-2 mt-2">
                            <Skeleton className="h-6 w-20" />
                            <Skeleton className="h-6 w-16" />
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Skeleton className="h-8 w-8" />
                          <Skeleton className="h-8 w-8" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
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
          <Button onClick={signOut} variant="outline" className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
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
              <div className="text-2xl font-bold">{dashboardStats?.totalProjects || projects.length}</div>
              <p className="text-xs text-muted-foreground">Projects in database</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Developers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats?.totalDevelopers || developers.length}</div>
              <p className="text-xs text-muted-foreground">Team members</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats?.totalUsers || 0}</div>
              <p className="text-xs text-muted-foreground">Registered users</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${dashboardStats?.totalRevenue || 0}</div>
              <p className="text-xs text-muted-foreground">From project sales</p>
            </CardContent>
          </Card>
        </div>

        {/* Add Project Button */}
        <div className="mb-6">
          <Button 
            onClick={() => setShowAddForm(true)} 
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add New Project
          </Button>
        </div>

        {/* Add Project Form */}
        {showAddForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Add New Project</CardTitle>
              <CardDescription>
                Fill in the details to add a new project to your portfolio.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddProject} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Title
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter project title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe your project"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="web">Web App</option>
                      <option value="mobile">Mobile App</option>
                      <option value="desktop">Desktop App</option>
                      <option value="design">UI/UX Design</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price ($)
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value) || 0})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      GitHub URL (optional)
                    </label>
                    <input
                      type="url"
                      value={formData.github}
                      onChange={(e) => setFormData({...formData, github: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://github.com/username/repo"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Demo URL (optional)
                    </label>
                    <input
                      type="url"
                      value={formData.demo}
                      onChange={(e) => setFormData({...formData, demo: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://demo.example.com"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                    Featured Project
                  </label>
                </div>

                <div className="flex gap-3">
                  <Button type="submit">
                    Add Project
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowAddForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Projects List */}
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Your Projects
            </h3>
            
            {projects.length === 0 ? (
              <div className="text-center py-12">
                <Package className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No projects yet</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GitHub URL (optional)
                  </label>
                  <input
                    type="url"
                    value={formData.github}
                    onChange={(e) => setFormData({...formData, github: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://github.com/username/repo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Demo URL (optional)
                  </label>
                  <input
                    type="url"
                    value={formData.demo}
                    onChange={(e) => setFormData({...formData, demo: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://demo.example.com"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="featured" className="ml-2 block text-sm text-gray-700">
                  Featured Project
                </label>
              </div>

              <div className="flex gap-3">
                <Button type="submit">
                  Add Project
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Projects List */}
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
              <div className="mb-6">
                <Button 
                  onClick={() => {
                    setEditingProject(null);
                    setFormData({
                      title: '',
                      description: '',
                      category: 'web',
                      price: 0,
                      github: '',
                      demo: '',
                      featured: false
                    });
                    setShowAddForm(true);
                  }} 
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add New Project
                </Button>
              </div>
              <div className="space-y-4">
                {projects.map((project: any, index) => (
                  <div key={project.id} className="border rounded-lg p-4">
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
                        <Button size="sm" variant="outline" onClick={() => handleDeleteProject(project.id)}>
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
              <div className="mb-6">
                <Button 
                  onClick={() => {
                    setEditingDeveloper(null);
                    setDeveloperFormData({
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
                    setShowAddDeveloperForm(true);
                  }} 
                  className="flex items-center gap-2"
                >
                  <UserPlus className="h-4 w-4" />
                  Add New Developer
                </Button>
              </div>
              <div className="space-y-4">
                {developers.map((developer: any, index) => (
                  <div key={developer.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{developer.name}</h3>
                        <p className="text-sm text-muted-foreground">{developer.bio}</p>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline">{developer.experience || 'Developer'}</Badge>
                          {developer.isActive ? (
                            <Badge variant="default">Active</Badge>
                          ) : (
                            <Badge variant="destructive">Inactive</Badge>
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <Eye className="h-4 w-4" />
                            </a>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteProject(project.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
