import React from "react";
import { cn } from "@/lib/utils";

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  borderRadius?: string;
  as?: any;
  to?: string;
  type?: "button" | "submit" | "reset";
}

export const PrimaryButton = ({ 
  children, 
  className, 
  containerClassName,
  borderRadius,
  as: Component = "button",
  ...props 
}: PrimaryButtonProps) => {
  return (
    <Component
      className={cn(
        "inline-flex items-center justify-center font-bold px-7 py-3 text-sm text-white bg-primary rounded-2xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300 border-none outline-none select-none cursor-pointer",
        containerClassName,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
