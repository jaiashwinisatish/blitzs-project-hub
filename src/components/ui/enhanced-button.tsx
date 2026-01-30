import React from 'react';
import { Button } from '@/components/ui/button';

interface SimpleButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: boolean;
  onClick?: () => void;
}

export const EnhancedButton: React.FC<SimpleButtonProps> = ({
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
    secondary: "bg-secondary hover:bg-secondary/80 text-secondary-foreground border"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const buttonContent = (
    <span className="flex items-center gap-2">
      <span>{children}</span>
      {icon && (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14"></path>
          <path d="M12 5l7 7-7 7"></path>
        </svg>
      )}
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
      size={size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : undefined}
      onClick={onClick}
    >
      {buttonContent}
    </Button>
  );
};
