import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { simpleService } from '../services/simple-service';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Search, Filter, ShoppingCart, ExternalLink, Star, Download, Eye } from 'lucide-react';

const Projects = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: 'all',
    search: '',
    sortBy: 'created_at',
    isFree: 'all'
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalProjects: 0
  });

  useEffect(() => {
    fetchProjects();
  }, [filters, pagination.currentPage]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await simpleService.getAllProjects({
        page: pagination.currentPage,
        limit: 12,
        ...(filters.category !== 'all' && { category: filters.category }),
        ...(filters.search && { search: filters.search }),
        sortBy: filters.sortBy,
        ...(filters.isFree !== 'all' && { isFree: filters.isFree === 'true' })
      });
      
      if (response.success) {
        setProjects(response.data.projects);
        setPagination(response.data.pagination);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (projectId: string) => {
    if (!user) {
      toast.error('Please login to purchase projects');
      return;
    }

    try {
      const response = await simpleService.purchaseProject(projectId);
      if (response.success) {
        toast.success(response.message);
        if (!response.data.isFree) {
          // Refresh projects to update purchase count
          fetchProjects();
        }
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Purchase failed');
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'web', label: 'Web Applications' },
    { value: 'mobile', label: 'Mobile Apps' },
    { value: 'desktop', label: 'Desktop Apps' },
    { value: 'ai', label: 'AI/Machine Learning' },
    { value: 'blockchain', label: 'Blockchain' },
    { value: 'game', label: 'Games' },
    { value: 'other', label: 'Other' }
  ];

  const sortOptions = [
    { value: 'created_at', label: 'Newest First' },
    { value: 'price', label: 'Price: Low to High' },
    { value: '-price', label: 'Price: High to Low' },
    { value: 'purchases', label: 'Most Popular' },
    { value: 'rating', label: 'Highest Rated' }
  ];

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
              Explore Our Projects
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover production-ready projects built with modern technologies
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search projects..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange('sortBy', value)}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filters.isFree} onValueChange={(value) => handleFilterChange('isFree', value)}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="true">Free</SelectItem>
                  <SelectItem value="false">Paid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {projects.length === 0 ? (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No projects found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters or search terms
                </p>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {projects.map((project: any, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden">
                        <img
                          src={project.images && project.images.length > 0 ? project.images[0] : 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400'}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg line-clamp-2">{project.title}</CardTitle>
                        <div className="flex items-center gap-1 ml-2">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{(project.rating || 0).toFixed(1)}</span>
                        </div>
                      </div>
                      <CardDescription className="line-clamp-2">
                        {project.shortDescription}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="flex flex-wrap gap-1 mb-4">
                        {project.techStack.slice(0, 3).map((tech: string) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {project.techStack.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.techStack.length - 3}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <span>{project.purchases} purchases</span>
                        <span>{project.downloads} downloads</span>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-3">
                      <div className="flex items-center justify-between w-full">
                        <div>
                          <div className="text-2xl font-bold">
                            {project.isFree ? 'Free' : `$${project.price}`}
                          </div>
                          <Badge variant={project.isFree ? 'default' : 'secondary'}>
                            {project.isFree ? 'Open Source' : 'Premium'}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" asChild>
                            <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                              <Eye className="h-4 w-4" />
                            </a>
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handlePurchase(project._id)}
                            disabled={!user}
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            {project.isFree ? 'Get' : 'Buy'}
                          </Button>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              <Button
                variant="outline"
                disabled={pagination.currentPage === 1}
                onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage - 1 }))}
              >
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              <Button
                variant="outline"
                disabled={pagination.currentPage === pagination.totalPages}
                onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }))}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Projects;
