import React from "react";
import { Button } from "./moving-border";
import { cn } from "@/lib/utils";

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  borderRadius?: string;
  as?: any;
  to?: string;
}

export const PrimaryButton = ({ 
  children, 
  className, 
  containerClassName,
  borderRadius = "1.75rem",
  as,
  ...props 
}: PrimaryButtonProps) => {
  return (
    <Button
      as={as}
      borderRadius={borderRadius}
      containerClassName={cn("h-14 w-auto min-w-[180px]", containerClassName)}
      className={cn(
        "bg-primary text-primary-foreground font-bold px-8 py-3",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};
