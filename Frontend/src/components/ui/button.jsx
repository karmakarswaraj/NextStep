import * as React from "react";
import { cn } from "@/lib/utils"; // Ensure this utility exists and works

export const Button = React.forwardRef(
  (
    { className, variant = "default", size = "md", asChild = false, ...props },
    ref
  ) => {
    const Component = asChild ? React.Fragment : "button";

    const variants = {
      default: "bg-primary text-white hover:bg-primary-dark",
      outline: "border border-primary text-primary hover:bg-primary/10",
      ghost: "bg-transparent hover:bg-primary/10",
      link: "text-primary underline-offset-2 hover:underline",
    };

    const sizes = {
      sm: "px-2 py-1 text-sm",
      md: "px-4 py-2 text-md",
      lg: "px-6 py-3 text-lg",
    };

    return (
      <Component
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium ",
          variants[variant],
          sizes[size],
          className // Custom className should always come last
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
