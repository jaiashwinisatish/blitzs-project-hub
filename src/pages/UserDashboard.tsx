import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { authService } from '@/services/auth.service';
import { orderService } from '@/services/order.service';
import { clientService } from '@/services/client.service';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { User, ShoppingBag, FileText, Download, LogOut, Edit } from 'lucide-react';

const UserDashboard = () => {
  const { user, signOut } = useAuth();
  const [orders, setOrders] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersRes, requestsRes] = await Promise.all([
          orderService.getUserOrders(),
          clientService.getUserClientRequests()
        ]);
        
        if (ordersRes.success) setOrders(ordersRes.data.orders);
        if (requestsRes.success) setRequests(requestsRes.data.requests);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const handleDownload = async (projectId: string) => {
    try {
      const response = await orderService.downloadProject(projectId);
      if (response.success) {
        toast.success('Download started!');
        window.open(response.data.downloadUrl, '_blank');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Download failed');
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
            <h1 className="text-3xl font-bold">User Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.fullName}!</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="orders">My Orders</TabsTrigger>
            <TabsTrigger value="requests">My Requests</TabsTrigger>
            <TabsTrigger value="downloads">Downloads</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Profile Information
                </CardTitle>
                <CardDescription>Manage your account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Full Name</label>
                    <p className="text-sm text-muted-foreground">{user?.fullName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Role</label>
                    <Badge variant={user?.role === 'admin' ? 'default' : 'secondary'}>
                      {user?.role}
                    </Badge>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Member Since</label>
                    <p className="text-sm text-muted-foreground">
                      {new Date(user?.createdAt || '').toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Button variant="outline" className="mt-4">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Order History
                </CardTitle>
                <CardDescription>View your purchased projects</CardDescription>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No orders yet. Start shopping for amazing projects!
                  </p>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order: any) => (
                      <div key={order._id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{order.project.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              Order #{order.orderNumber}
                            </p>
                            <p className="text-sm">
                              ${order.amount} • {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge variant={order.status === 'completed' ? 'default' : 'secondary'}>
                              {order.status}
                            </Badge>
                            {order.status === 'completed' && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="mt-2"
                                onClick={() => handleDownload(order.project._id)}
                              >
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Custom Project Requests
                </CardTitle>
                <CardDescription>Track your custom project requests</CardDescription>
              </CardHeader>
              <CardContent>
                {requests.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No custom requests yet. Submit a request for your dream project!
                  </p>
                ) : (
                  <div className="space-y-4">
                    {requests.map((request: any) => (
                      <div key={request._id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{request.projectType} Project</h3>
                            <p className="text-sm text-muted-foreground">
                              Budget: {request.budget} • Timeline: {request.timeline}
                            </p>
                            <p className="text-sm mt-2">{request.description}</p>
                          </div>
                          <Badge variant={
                            request.status === 'completed' ? 'default' :
                            request.status === 'pending' ? 'secondary' : 'outline'
                          }>
                            {request.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="downloads">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Download className="mr-2 h-5 w-5" />
                  Available Downloads
                </CardTitle>
                <CardDescription>Download your purchased projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center text-muted-foreground py-8">
                  <Download className="mx-auto h-12 w-12 mb-4 opacity-50" />
                  <p>Your available downloads will appear here</p>
                  <p className="text-sm">Completed orders can be downloaded from the Orders tab</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserDashboard;
