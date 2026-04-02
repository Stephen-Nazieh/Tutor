import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// ============================================
// CARD VARIANTS - Elevation System
// ============================================

const cardVariants = cva(
  // Base card styles
  [
    "rounded-xl", // Soft rounded corners
    "bg-card text-card-foreground",
    "transition-all duration-250 ease-premium",
  ],
  {
    variants: {
      // Elevation levels - Floating in space effect
      elevation: {
        none: ["border border-border/50"],
        1: [
          "border border-border/50",
          "shadow-elevation-1",
        ],
        2: [
          "border border-border/40",
          "shadow-elevation-2",
        ],
        3: [
          "border border-border/30",
          "shadow-elevation-3",
        ],
        4: [
          "border border-border/20",
          "shadow-elevation-4",
        ],
        5: [
          "border-0",
          "shadow-elevation-5",
        ],
      },

      // Interactive states
      interactive: {
        true: [
          "cursor-pointer",
          "hover:shadow-hover-lift",
          "hover:-translate-y-0.5",
          "active:shadow-active-press",
          "active:translate-y-0",
        ],
        false: "",
      },

      // Variant styles
      variant: {
        default: "",
        elevated: [
          "bg-card-elevated",
          "border-0",
          "shadow-elevation-3",
        ],
        outlined: [
          "bg-transparent",
          "border-2 border-border",
          "shadow-none",
        ],
        ghost: [
          "bg-transparent",
          "border-0",
          "shadow-none",
          "hover:bg-accent/20",
        ],
        glass: [
          "bg-background/80",
          "backdrop-blur-md",
          "border border-border/50",
          "shadow-elevation-2",
        ],
        floating: [
          "bg-card",
          "border border-border/20",
          "shadow-floating",
        ],
      },

      // Padding options
      padding: {
        none: "",
        sm: "p-4",
        default: "p-6",
        lg: "p-8",
        xl: "p-10",
      },
    },

    defaultVariants: {
      elevation: 2,
      interactive: false,
      variant: "default",
      padding: "default",
    },
  }
);

// ============================================
// CARD COMPONENTS
// ============================================

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { className, elevation, interactive, variant, padding, ...props },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        cardVariants({ elevation, interactive, variant, padding }),
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

// ============================================
// CARD HEADER
// ============================================

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    spacing?: "sm" | "default" | "lg";
    bordered?: boolean;
  }
>(({ className, spacing = "default", bordered = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col space-y-1.5",
      spacing === "sm" && "p-4",
      spacing === "default" && "p-6",
      spacing === "lg" && "p-8",
      bordered && "border-b border-border/50",
      className
    )}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

// ============================================
// CARD TITLE
// ============================================

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement> & {
    size?: "sm" | "default" | "lg";
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  }
>(({ className, size = "default", as: Component = "h3", ...props }, ref) => {
  const sizeClasses = {
    sm: "text-lg",
    default: "text-xl",
    lg: "text-2xl",
  };

  return (
    <Component
      ref={ref}
      className={cn(
        "font-semibold leading-tight tracking-tight text-foreground",
        sizeClasses[size],
        className
      )}
      {...props}
    />
  );
});
CardTitle.displayName = "CardTitle";

// ============================================
// CARD DESCRIPTION
// ============================================

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & {
    size?: "sm" | "default";
  }
>(({ className, size = "default", ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-muted-foreground",
      size === "sm" && "text-xs",
      size === "default" && "text-sm",
      className
    )}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

// ============================================
// CARD CONTENT
// ============================================

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    spacing?: "none" | "sm" | "default" | "lg";
  }
>(({ className, spacing = "default", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      spacing === "none" && "",
      spacing === "sm" && "p-4",
      spacing === "default" && "p-6",
      spacing === "lg" && "p-8",
      className
    )}
    {...props}
  />
));
CardContent.displayName = "CardContent";

// ============================================
// CARD FOOTER
// ============================================

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    spacing?: "sm" | "default" | "lg";
    bordered?: boolean;
    align?: "start" | "center" | "end" | "between";
  }
>(
  (
    { className, spacing = "default", bordered = false, align = "start", ...props },
    ref
  ) => {
    const alignClasses = {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-2",
          alignClasses[align],
          spacing === "sm" && "p-4",
          spacing === "default" && "p-6",
          spacing === "lg" && "p-8",
          bordered && "border-t border-border/50",
          className
        )}
        {...props}
      />
    );
  }
);
CardFooter.displayName = "CardFooter";

// ============================================
// CARD IMAGE
// ============================================

const CardImage = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    src: string;
    alt: string;
    aspectRatio?: "video" | "square" | "portrait" | "auto";
    overlay?: boolean;
  }
>(({ className, src, alt, aspectRatio = "video", overlay = false, ...props }, ref) => {
  const aspectClasses = {
    video: "aspect-video",
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    auto: "",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden",
        aspectClasses[aspectRatio],
        className
      )}
      {...props}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      />
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      )}
    </div>
  );
});
CardImage.displayName = "CardImage";

// ============================================
// CARD BADGE
// ============================================

const CardBadge = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement> & {
    variant?: "default" | "primary" | "secondary" | "success" | "warning" | "error";
  }
>(({ className, variant = "default", ...props }, ref) => {
  const variantClasses = {
    default: "bg-accent text-accent-foreground",
    primary: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    success: "bg-success text-success-foreground",
    warning: "bg-warning text-warning-foreground",
    error: "bg-destructive text-destructive-foreground",
  };

  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
});
CardBadge.displayName = "CardBadge";

// ============================================
// CARD DIVIDER
// ============================================

const CardDivider = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    spacing?: "sm" | "default" | "lg";
  }
>(({ className, spacing = "default", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "border-t border-border/50",
      spacing === "sm" && "my-3",
      spacing === "default" && "my-4",
      spacing === "lg" && "my-6",
      className
    )}
    {...props}
  />
));
CardDivider.displayName = "CardDivider";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardImage,
  CardBadge,
  CardDivider,
  cardVariants,
};
