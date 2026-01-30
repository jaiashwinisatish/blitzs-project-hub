// Simplified project card
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Eye } from "lucide-react";

interface ProjectCardProps {
  project: any;
  onAction: (id: string) => void;
}

export const SimpleProjectCard = ({ project, onAction }: ProjectCardProps) => {
  return (
    <Card className="h-full flex flex-col border shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
        <img
          src={
            project.images && project.images.length > 0
              ? project.images[0]
              : "/placeholder.svg"
          }
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{project.title}</CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {project.short_description}
        </p>
      </CardHeader>

      <CardContent className="flex-1 pb-3">
        <div className="flex flex-wrap gap-1 mb-3">
          {(project.tech_stack || []).slice(0, 3).map((tech: string) => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{project.purchases || 0} purchases</span>
          <span>{project.is_free ? "Free" : `$${project.price}`}</span>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <div className="flex gap-2 w-full">
          <Button size="sm" variant="outline" className="flex-1">
            <Eye className="h-4 w-4 mr-2" />
            View
          </Button>
          <Button
            size="sm"
            className="flex-1"
            onClick={() => onAction(project.id)}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {project.is_free ? "Get" : "Buy"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};