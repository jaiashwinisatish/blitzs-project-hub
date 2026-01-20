import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Globe } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface DeveloperCardProps {
  name: string;
  title: string;
  avatarUrl?: string;
  bio?: string;
  specializations: string[];
  skills: string[];
  githubUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  portfolioUrl?: string;
  experienceYears?: number;
  index?: number;
}

export const DeveloperCard = ({
  name,
  title,
  avatarUrl,
  bio,
  specializations,
  skills,
  githubUrl,
  linkedinUrl,
  twitterUrl,
  portfolioUrl,
  experienceYears,
  index = 0,
}: DeveloperCardProps) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="group h-full overflow-hidden border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center">
            {/* Avatar */}
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-blitz-gradient rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
              <Avatar className="relative h-24 w-24 border-2 border-background">
                <AvatarImage src={avatarUrl} alt={name} />
                <AvatarFallback className="bg-blitz-gradient text-primary-foreground text-xl">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Info */}
            <h3 className="font-semibold text-lg mb-1">{name}</h3>
            <p className="text-primary text-sm mb-2">{title}</p>
            {experienceYears && experienceYears > 0 && (
              <Badge variant="secondary" className="mb-3">
                {experienceYears}+ years experience
              </Badge>
            )}

            {bio && (
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                {bio}
              </p>
            )}

            {/* Specializations */}
            <div className="flex flex-wrap gap-1.5 justify-center mb-4">
              {specializations.slice(0, 3).map((spec) => (
                <Badge key={spec} className="bg-primary/10 text-primary text-xs">
                  {spec}
                </Badge>
              ))}
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-1 justify-center mb-4">
              {skills.slice(0, 5).map((skill) => (
                <Badge key={skill} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {skills.length > 5 && (
                <Badge variant="outline" className="text-xs">
                  +{skills.length - 5}
                </Badge>
              )}
            </div>

            {/* Social Links */}
            <div className="flex gap-2">
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <Github className="h-4 w-4" />
                </a>
              )}
              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              )}
              {twitterUrl && (
                <a
                  href={twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <Twitter className="h-4 w-4" />
                </a>
              )}
              {portfolioUrl && (
                <a
                  href={portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <Globe className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
