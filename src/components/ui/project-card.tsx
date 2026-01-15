import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Smartphone, Globe } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

interface ProjectCardProps {
  _id: string;
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  category: string;
  price: number;
  isFree: boolean;
  thumbnailUrl?: string;
  images: string[];
  demoLink: string;
  githubLink?: string;
  techStack: string[];
  features: string[];
  rating: number;
  purchases: number;
  downloads: number;
  index?: number;
}

export const ProjectCard = ({
  _id,
  slug = _id,
  title,
  shortDescription,
  description,
  category,
  price,
  isFree,
  thumbnailUrl,
  images = [],
  demoLink,
  githubLink,
  techStack = [],
  features = [],
  rating = 0,
  purchases = 0,
  downloads = 0,
  index = 0,
}: ProjectCardProps) => {
  const CategoryIcon = category === 'mobile' ? Smartphone : Globe;
  const imageUrl = thumbnailUrl || (images.length > 0 ? images[0] : null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="group h-full overflow-hidden border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
        <CardHeader className="p-0">
          <div className="relative aspect-video overflow-hidden bg-muted">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                <CategoryIcon className="h-12 w-12 text-muted-foreground/50" />
              </div>
            )}
            <div className="absolute top-3 left-3">
              <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
                <CategoryIcon className="h-3 w-3 mr-1" />
                {category === 'full-stack' ? 'Full-Stack' : category === 'mobile' ? 'Mobile' : category}
              </Badge>
            </div>
            <div className="absolute top-3 right-3">
              <Badge className="bg-blitz-gradient text-primary-foreground">
                {isFree ? 'Free' : `$${price.toFixed(0)}`}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
            {shortDescription || description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {techStack.slice(0, 4).map((tech) => (
              <Badge key={tech} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
            {techStack.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{techStack.length - 4}
              </Badge>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button asChild variant="ghost" className="w-full group/btn">
            <Link to={`/projects/${slug}`}>
              View Details
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
