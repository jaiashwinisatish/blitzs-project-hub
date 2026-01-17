import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { adminService } from '@/services/admin.service';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import {
  Users,
  Package,
  ShoppingCart,
  FileText,
  TrendingUp,
  LogOut,
  Eye,
  Edit,
  Trash2,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

const AdminDashboard = () => {
  const { user, signOut } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProjects: 0,
    totalOrders: 0,
    totalRequests: 0,
    totalRevenue: 0
  });
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, usersRes, projectsRes, requestsRes] = await Promise.all([
          adminService.getDashboardStats(),
          adminService.getAllUsers({ limit: 10 }),
          adminService.getAllProjectsAdmin({ limit: 10 }),
          adminService.getAllClientRequests({ limit: 10 })
        ]);
        
        if (statsRes.success) setStats(statsRes.data.stats);
        if (usersRes.success) setUsers(usersRes.data.users);
        if (projectsRes.success) setProjects(projectsRes.data.projects);
        if (requestsRes.success) setRequests(requestsRes.data.requests);
      } catch (error) {
        console.error('Error fetching admin data:', error);
        toast.error('Failed to load admin dashboard');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const handleToggleUserStatus = async (userId: string) => {
    try {
      const response = await adminService.toggleUserStatus(userId);
      if (response.success) {
        toast.success('User status updated successfully');
        // Refresh users list
        const usersRes = await adminService.getAllUsers({ limit: 10 });
        if (usersRes.success) setUsers(usersRes.data.users);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update user status');
    }
  };

  const handleUpdateRequestStatus = async (requestId: string, status: string) => {
    try {
      const response = await adminService.updateRequestStatus(requestId, { status });
      if (response.success) {
        toast.success('Request status updated successfully');
        // Refresh requests list
        const requestsRes = await adminService.getAllClientRequests({ limit: 10 });
        if (requestsRes.success) setRequests(requestsRes.data.requests);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update request status');
    }
  };

  const handleLogout = async () => {
    await signOut();
    toast.success('Logged out successfully');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your platform efficiently</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProjects}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Client Requests</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalRequests}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalRevenue}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="requests">Client Requests</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage platform users and their roles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((userItem: any) => (
                    <div key={userItem._id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">{userItem.fullName}</h3>
                          <p className="text-sm text-muted-foreground">{userItem.email}</p>
                          <div className="flex gap-2 mt-2">
                            <Badge variant={userItem.role === 'admin' ? 'default' : 'secondary'}>
                              {userItem.role}
                            </Badge>
                            <Badge variant={userItem.isActive ? 'default' : 'destructive'}>
                              {userItem.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleToggleUserStatus(userItem._id)}
                          >
                            {userItem.isActive ? (
                              <ToggleRight className="h-4 w-4" />
                            ) : (
                              <ToggleLeft className="h-4 w-4" />
                            )}
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle>Project Management</CardTitle>
                <CardDescription>Manage all platform projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projects.map((project: any) => (
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
                            <Badge variant={project.isPublished ? 'default' : 'destructive'}>
                              {project.isPublished ? 'Published' : 'Draft'}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
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
                <div className="space-y-4">
                  {requests.map((request: any) => (
                    <div key={request._id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{request.name}</h3>
                          <p className="text-sm text-muted-foreground">{request.email}</p>
                          <p className="text-sm mt-2">{request.description}</p>
                          <div className="flex gap-2 mt-2">
                            <Badge variant="outline">{request.projectType}</Badge>
                            <Badge variant="outline">{request.budget}</Badge>
                            <Badge variant="outline">{request.timeline}</Badge>
                            <Badge variant={
                              request.status === 'completed' ? 'default' :
                              request.status === 'pending' ? 'secondary' : 'outline'
                            }>
                              {request.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <select
                            className="text-sm border rounded px-2 py-1"
                            value={request.status}
                            onChange={(e) => handleUpdateRequestStatus(request._id, e.target.value)}
                          >
                            <option value="pending">Pending</option>
                            <option value="reviewing">Reviewing</option>
                            <option value="contacted">Contacted</option>
                            <option value="quoted">Quoted</option>
                            <option value="accepted">Accepted</option>
                            <option value="rejected">Rejected</option>
                            <option value="completed">Completed</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
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
                <div className="text-center text-muted-foreground py-8">
                  <ShoppingCart className="mx-auto h-12 w-12 mb-4 opacity-50" />
                  <p>Order management interface</p>
                  <p className="text-sm">Full order management features coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
