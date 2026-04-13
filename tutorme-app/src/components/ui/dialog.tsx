'use client'

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

// ============================================
// DIALOG CONTENT VARIANTS
// ============================================

const dialogContentVariants = cva(
  [
    'z-modal fixed',
    'w-full',
    'bg-background',
    'border-border/50 border',
    'shadow-elevation-5',
    'ease-premium duration-300',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
    'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
  ],
  {
    variants: {
      size: {
        sm: 'max-w-sm',
        default: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        '2xl': 'max-w-6xl',
        full: 'max-w-[95vw]',
      },
      position: {
        center: [
          'left-[50%] top-[50%]',
          'translate-x-[-50%] translate-y-[-50%]',
          'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
          'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
        ],
        top: [
          'left-[50%] top-[10%]',
          'translate-x-[-50%]',
          'data-[state=closed]:slide-out-to-top-[48%]',
          'data-[state=open]:slide-in-from-top-[48%]',
        ],
        bottom: [
          'bottom-[5%] left-[50%]',
          'translate-x-[-50%]',
          'data-[state=closed]:slide-out-to-bottom-[48%]',
          'data-[state=open]:slide-in-from-bottom-[48%]',
        ],
      },
      rounded: {
        default: 'rounded-2xl',
        lg: 'rounded-3xl',
        none: 'rounded-none',
      },
    },
    defaultVariants: {
      size: 'default',
      position: 'center',
      rounded: 'default',
    },
  }
)

// ============================================
// DIALOG COMPONENTS
// ============================================

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal
const DialogClose = DialogPrimitive.Close

// ============================================
// DIALOG OVERLAY
// ============================================

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> & {
    blur?: boolean
  }
>(({ className, blur = true, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'z-modal-backdrop fixed inset-0',
      'bg-background/80',
      blur && 'backdrop-blur-sm',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

// ============================================
// DIALOG CONTENT
// ============================================

interface DialogContentProps
  extends
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof dialogContentVariants> {
  showCloseButton?: boolean
  blurOverlay?: boolean
}

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(
  (
    {
      className,
      children,
      size,
      position,
      rounded,
      showCloseButton = true,
      blurOverlay = true,
      ...props
    },
    ref
  ) => (
    <DialogPortal>
      <DialogOverlay blur={blurOverlay} />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(dialogContentVariants({ size, position, rounded }), className)}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            className={cn(
              'absolute right-4 top-4',
              'flex items-center justify-center',
              'h-8 w-8 rounded-lg',
              'text-muted-foreground',
              'opacity-70',
              'transition-all duration-150',
              'hover:bg-accent hover:opacity-100',
              'focus:ring-ring focus:outline-none focus:ring-2 focus:ring-offset-2',
              'disabled:pointer-events-none'
            )}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
)
DialogContent.displayName = DialogPrimitive.Content.displayName

// ============================================
// DIALOG HEADER
// ============================================

const DialogHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    bordered?: boolean
    spacing?: 'sm' | 'default' | 'lg'
  }
>(({ className, bordered = false, spacing = 'default', ...props }, ref) => {
  const spacingClasses = {
    sm: 'p-4 pb-2',
    default: 'p-6 pb-4',
    lg: 'p-8 pb-6',
  }

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col space-y-2',
        'text-center sm:text-left',
        spacingClasses[spacing],
        bordered && 'border-border/50 border-b',
        className
      )}
      {...props}
    />
  )
})
DialogHeader.displayName = 'DialogHeader'

// ============================================
// DIALOG FOOTER
// ============================================

const DialogFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    bordered?: boolean
    spacing?: 'sm' | 'default' | 'lg'
    align?: 'start' | 'center' | 'end' | 'between'
  }
>(({ className, bordered = false, spacing = 'default', align = 'end', ...props }, ref) => {
  const spacingClasses = {
    sm: 'p-4 pt-2',
    default: 'p-6 pt-4',
    lg: 'p-8 pt-6',
  }

  const alignClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
  }

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col-reverse gap-2 sm:flex-row sm:gap-3',
        alignClasses[align],
        spacingClasses[spacing],
        bordered && 'border-border/50 border-t',
        className
      )}
      {...props}
    />
  )
})
DialogFooter.displayName = 'DialogFooter'

// ============================================
// DIALOG TITLE
// ============================================

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> & {
    size?: 'sm' | 'default' | 'lg'
  }
>(({ className, size = 'default', ...props }, ref) => {
  const sizeClasses = {
    sm: 'text-base',
    default: 'text-lg',
    lg: 'text-xl',
  }

  return (
    <DialogPrimitive.Title
      ref={ref}
      className={cn(
        'text-foreground font-semibold leading-tight tracking-tight',
        sizeClasses[size],
        className
      )}
      {...props}
    />
  )
})
DialogTitle.displayName = DialogPrimitive.Title.displayName

// ============================================
// DIALOG DESCRIPTION
// ============================================

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description> & {
    size?: 'sm' | 'default'
  }
>(({ className, size = 'default', ...props }, ref) => {
  const sizeClasses = {
    sm: 'text-xs',
    default: 'text-sm',
  }

  return (
    <DialogPrimitive.Description
      ref={ref}
      className={cn('text-muted-foreground', sizeClasses[size], className)}
      {...props}
    />
  )
})
DialogDescription.displayName = DialogPrimitive.Description.displayName

// ============================================
// DIALOG BODY
// ============================================

const DialogBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    scrollable?: boolean
    spacing?: 'sm' | 'default' | 'lg'
    maxHeight?: string
  }
>(({ className, scrollable = false, spacing = 'default', maxHeight, ...props }, ref) => {
  const spacingClasses = {
    sm: 'px-4 py-3',
    default: 'px-6 py-4',
    lg: 'px-8 py-6',
  }

  return (
    <div
      ref={ref}
      className={cn(
        spacingClasses[spacing],
        scrollable && ['scrollbar-thin overflow-y-auto', maxHeight && `max-h-[${maxHeight}]`],
        className
      )}
      {...props}
    />
  )
})
DialogBody.displayName = 'DialogBody'

// ============================================
// ALERT DIALOG (Simplified Dialog for confirmations)
// ============================================

interface AlertDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel?: () => void
  variant?: 'default' | 'destructive'
}

function AlertDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  variant = 'default',
}: AlertDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent size="sm" position="center" className="text-center sm:text-left">
        <DialogHeader className="space-y-3">
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <button
              onClick={onCancel}
              className={cn(
                'inline-flex items-center justify-center',
                'rounded-lg px-4 py-2 text-sm font-medium',
                'bg-muted text-muted-foreground',
                'hover:bg-muted/80',
                'transition-colors'
              )}
            >
              {cancelLabel}
            </button>
          </DialogClose>
          <button
            onClick={onConfirm}
            className={cn(
              'inline-flex items-center justify-center',
              'rounded-lg px-4 py-2 text-sm font-medium',
              'transition-all duration-150',
              variant === 'destructive'
                ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                : 'bg-primary text-primary-foreground shadow-elevation-2 hover:bg-primary/90'
            )}
          >
            {confirmLabel}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogBody,
  AlertDialog,
  dialogContentVariants,
}
export type { DialogContentProps, AlertDialogProps }
