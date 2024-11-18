import * as React from "react";
import { cn } from "@/lib/utils"; // Assuming you have this utility function for merging class names

const Separator = React.forwardRef(({ className, orientation = "horizontal", ...props }, ref) => {
  const isVertical = orientation === "vertical";

  return (
    <div
      ref={ref}
      className={cn(
        isVertical ? "border-l border-gray-300 h-full" : "border-t border-gray-300 w-full", // Vertical or horizontal separator
        "my-4", // Add margin for spacing
        className // Custom className passed by user
      )}
      {...props}
    />
  );
});

Separator.displayName = "Separator";

export  {Separator};
