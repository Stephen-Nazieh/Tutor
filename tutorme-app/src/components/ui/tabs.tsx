'use client'

import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

// ============================================
// TABS LIST VARIANTS
// ============================================

const tabsListVariants = cva('inline-flex items-center justify-center', {
  variants: {
    variant: {
      default: ['bg-muted h-10 rounded-lg p-1', 'text-muted-foreground'],
      pills: ['gap-1 p-1', 'bg-transparent'],
      underline: ['h-11 gap-6', 'border-border border-b', 'rounded-none bg-transparent'],
      buttons: ['gap-2 p-1', 'bg-muted/50 rounded-xl'],
      floating: [
        'h-12 gap-1 p-1.5',
        'bg-card rounded-xl',
        'border-border/30 shadow-elevation-2 border',
      ],
    },
    size: {
      sm: 'h-8',
      default: 'h-10',
      lg: 'h-12',
    },
    fullWidth: {
      true: 'w-full',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
    fullWidth: false,
  },
})

// ============================================
// TABS TRIGGER VARIANTS
// ============================================

const tabsTriggerVariants = cva(
  [
    'inline-flex items-center justify-center',
    'whitespace-nowrap text-sm font-medium',
    'ease-premium transition-all duration-200',
    'focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        default: [
          'rounded-md px-3 py-1.5',
          'data-[state=active]:bg-background data-[state=active]:text-foreground',
          'data-[state=active]:shadow-elevation-1',
          'hover:text-foreground/80',
        ],
        pills: [
          'rounded-full px-4 py-2',
          'data-[state=active]:bg-primary data-[state=active]:text-primary-foreground',
          'data-[state=active]:shadow-elevation-2',
          'hover:bg-muted',
        ],
        underline: [
          'relative -mb-px px-1 py-2',
          'rounded-none',
          'data-[state=active]:text-foreground',
          'after:absolute after:bottom-0 after:left-0 after:right-0',
          'after:bg-primary after:h-0.5',
          'after:scale-x-0 data-[state=active]:after:scale-x-100',
          'after:transition-transform after:duration-200',
          'hover:text-foreground',
        ],
        buttons: [
          'rounded-lg px-4 py-2',
          'data-[state=active]:bg-background data-[state=active]:text-foreground',
          'data-[state=active]:shadow-elevation-2',
          'data-[state=active]:border-border/50 data-[state=active]:border',
          'hover:text-foreground/80',
        ],
        floating: [
          'rounded-lg px-4 py-2',
          'data-[state=active]:bg-background data-[state=active]:text-foreground',
          'data-[state=active]:shadow-elevation-1',
          'hover:text-foreground/80',
        ],
      },
      size: {
        sm: 'px-2 py-1 text-xs',
        default: 'px-3 py-1.5 text-sm',
        lg: 'px-4 py-2.5 text-base',
      },
      fullWidth: {
        true: 'flex-1',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      fullWidth: false,
    },
  }
)

// ============================================
// TABS COMPONENTS
// ============================================

const Tabs = TabsPrimitive.Root

// ============================================
// TABS LIST
// ============================================

interface TabsListProps
  extends
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {}

const TabsList = React.forwardRef<React.ElementRef<typeof TabsPrimitive.List>, TabsListProps>(
  ({ className, variant, size, fullWidth, ...props }, ref) => (
    <TabsPrimitive.List
      ref={ref}
      className={cn(tabsListVariants({ variant, size, fullWidth }), className)}
      {...props}
    />
  )
)
TabsList.displayName = TabsPrimitive.List.displayName

// ============================================
// TABS TRIGGER
// ============================================

interface TabsTriggerProps
  extends
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabsTriggerVariants> {}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, variant, size, fullWidth, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(tabsTriggerVariants({ variant, size, fullWidth }), className)}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

// ============================================
// TABS CONTENT
// ============================================

const tabsContentVariants = cva(
  'ring-offset-background focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  {
    variants: {
      animate: {
        true: ['data-[state=inactive]:animate-fade-out', 'data-[state=active]:animate-fade-in'],
        false: '',
      },
      padding: {
        none: '',
        sm: 'pt-3',
        default: 'pt-4',
        lg: 'pt-6',
      },
    },
    defaultVariants: {
      animate: false,
      padding: 'default',
    },
  }
)

interface TabsContentProps
  extends
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>,
    VariantProps<typeof tabsContentVariants> {}

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  TabsContentProps
>(({ className, animate, padding, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(tabsContentVariants({ animate, padding }), className)}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

// ============================================
// VERTICAL TABS (Custom Component)
// ============================================

interface VerticalTabsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const VerticalTabs = React.forwardRef<HTMLDivElement, VerticalTabsProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('flex gap-6', className)} {...props}>
      {children}
    </div>
  )
)
VerticalTabs.displayName = 'VerticalTabs'

// ============================================
// VERTICAL TABS LIST
// ============================================

const VerticalTabsList = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('bg-muted flex w-48 flex-col gap-1 rounded-xl p-2', className)}
      {...props}
    />
  )
)
VerticalTabsList.displayName = 'VerticalTabsList'

// ============================================
// VERTICAL TABS TRIGGER
// ============================================

const VerticalTabsTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { isActive?: boolean }
>(({ className, isActive, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      'flex w-full items-center rounded-lg px-3 py-2.5 text-sm font-medium',
      'transition-all duration-200',
      'focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2',
      isActive
        ? 'bg-background text-foreground shadow-elevation-1'
        : 'text-muted-foreground hover:bg-muted/80 hover:text-foreground',
      className
    )}
    {...props}
  />
))
VerticalTabsTrigger.displayName = 'VerticalTabsTrigger'

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  VerticalTabs,
  VerticalTabsList,
  VerticalTabsTrigger,
  tabsListVariants,
  tabsTriggerVariants,
  tabsContentVariants,
}
export type { TabsListProps, TabsTriggerProps, TabsContentProps, VerticalTabsProps }
