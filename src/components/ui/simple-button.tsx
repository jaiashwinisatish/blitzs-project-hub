// Simple button with minimal effects
import React from "react";
import { Button as UIButton, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SimpleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  children: React.ReactNode;
}

export const SimpleButton = React.forwardRef<
  HTMLButtonElement,
  SimpleButtonProps
>(
  (
    { className, variant = "default", size = "default", children, ...props },
    ref,
  ) => {
    return (
      <UIButton
        ref={ref}
        className={cn(
          buttonVariants({ variant, size }),
          "transition-colors duration-200 ease-out hover:opacity-90",
          className,
        )}
        {...props}
      >
        {children}
      </UIButton>
    );
  },
);

SimpleButton.displayName = "SimpleButton";