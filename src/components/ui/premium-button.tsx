import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface SimplePremiumButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  icon?: boolean;
  onClick?: () => void;
}

export const PremiumButton: React.FC<SimplePremiumButtonProps> = ({
  children,
  href,
  variant = 'primary',
  size = 'lg',
  className = '',
  icon = true,
  onClick
}) => {
  const baseClasses = "transition-all duration-200 ease-out";
  
  const variants = {
    primary: "bg-primary hover:bg-primary/90 text-primary-foreground",
    secondary: "bg-secondary hover:bg-secondary/80 text-secondary-foreground border",
    ghost: "hover:bg-accent hover:text-accent-foreground"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm rounded-md",
    md: "px-6 py-3 text-base rounded-md",
    lg: "px-8 py-4 text-lg rounded-lg",
    xl: "px-10 py-5 text-xl rounded-xl"
  };

  const buttonContent = (
    <span className="flex items-center gap-2">
      <span>{children}</span>
      {icon && <ArrowRight className="w-4 h-4" />}
    </span>
  );

  if (href) {
    return (
      <a 
        href={href} 
        className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
        onClick={onClick}
      >
        {buttonContent}
      </a>
    );
  }

  return (
    <Button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      size={size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : size === 'xl' ? 'lg' : undefined}
      onClick={onClick}
    >
      {buttonContent}
    </Button>
  );
};

// Export a simple button group component without animations
interface ButtonGroupProps {
  children: React.ReactNode;
  className?: string;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({ children, className = '' }) => {
  return (
    <div className={`flex flex-col sm:flex-row gap-4 ${className}`}>
      {children}
    </div>
  );
};
