import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

// ============================================
// INPUT VARIANTS - Design System
// ============================================

const inputVariants = cva(
  // Base styles
  [
    'flex w-full',
    'rounded-lg', // Soft rounded corners
    'bg-background',
    'border border-input',
    'text-sm text-foreground',
    'placeholder:text-muted-foreground',
    'transition-all duration-150 ease-premium',
    'file:border-0 file:bg-transparent file:text-sm file:font-medium',
    // Focus states
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    // Disabled states
    'disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-50',
  ],
  {
    variants: {
      // Size variants
      size: {
        sm: ['h-8', 'px-3', 'py-1.5', 'text-xs', 'rounded-md'],
        default: ['h-10', 'min-h-[44px]', 'px-3', 'py-2', 'sm:min-h-0'],
        lg: ['h-12', 'px-4', 'py-3', 'text-base'],
        xl: ['h-14', 'px-5', 'py-4', 'text-lg', 'rounded-xl'],
      },

      // Variant styles
      variant: {
        default: ['border-input', 'focus-visible:border-primary'],
        filled: [
          'border-transparent bg-muted',
          'hover:bg-muted/80',
          'focus-visible:border-primary focus-visible:bg-background',
        ],
        outlined: [
          'border-2 border-input bg-transparent',
          'focus-visible:border-primary focus-visible:bg-background',
        ],
        ghost: [
          'border-transparent bg-transparent',
          'hover:bg-muted/50',
          'focus-visible:bg-muted focus-visible:ring-0',
        ],
        elevated: [
          'border-0 bg-background',
          'shadow-elevation-1',
          'focus-visible:shadow-elevation-2 focus-visible:ring-offset-0',
        ],
      },

      // State modifiers
      state: {
        default: '',
        error: [
          'border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20',
        ],
        success: ['border-success focus-visible:border-success focus-visible:ring-success/20'],
        warning: ['border-warning focus-visible:border-warning focus-visible:ring-warning/20'],
      },
    },

    defaultVariants: {
      size: 'default',
      variant: 'default',
      state: 'default',
    },
  }
)

// ============================================
// INPUT INTERFACE
// ============================================

export interface InputProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  errorMessage?: string
  helpText?: string
}

// ============================================
// INPUT COMPONENT
// ============================================

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      size,
      variant,
      state,
      leftIcon,
      rightIcon,
      errorMessage,
      helpText,
      ...props
    },
    ref
  ) => {
    // Auto-detect error state from errorMessage
    const inputState = errorMessage ? 'error' : state

    return (
      <div className="w-full space-y-1.5">
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="pointer-events-none absolute left-3 flex items-center justify-center text-muted-foreground">
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              inputVariants({ size, variant, state: inputState }),
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className
            )}
            ref={ref}
            {...props}
          />
          {rightIcon && (
            <div className="pointer-events-none absolute right-3 flex items-center justify-center text-muted-foreground">
              {rightIcon}
            </div>
          )}
        </div>
        {(errorMessage || helpText) && (
          <p className={cn('text-xs', errorMessage ? 'text-destructive' : 'text-muted-foreground')}>
            {errorMessage || helpText}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

// ============================================
// TEXTAREA COMPONENT
// ============================================

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>, VariantProps<typeof inputVariants> {
  errorMessage?: string
  helpText?: string
  resizable?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, state, errorMessage, helpText, resizable = true, ...props }, ref) => {
    const inputState = errorMessage ? 'error' : state

    return (
      <div className="w-full space-y-1.5">
        <textarea
          className={cn(
            inputVariants({ variant, state: inputState }),
            'min-h-[80px] py-3',
            !resizable && 'resize-none',
            className
          )}
          ref={ref}
          {...props}
        />
        {(errorMessage || helpText) && (
          <p className={cn('text-xs', errorMessage ? 'text-destructive' : 'text-muted-foreground')}>
            {errorMessage || helpText}
          </p>
        )}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'

// ============================================
// INPUT GROUP COMPONENT
// ============================================

interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex overflow-hidden rounded-lg border border-input',
        'focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
)
InputGroup.displayName = 'InputGroup'

// ============================================
// INPUT GROUP TEXT (Addon)
// ============================================

interface InputGroupTextProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: 'left' | 'right'
}

const InputGroupText = React.forwardRef<HTMLDivElement, InputGroupTextProps>(
  ({ className, position = 'left', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center bg-muted px-3 py-2 text-sm text-muted-foreground',
        position === 'left' && 'border-r border-input',
        position === 'right' && 'border-l border-input',
        className
      )}
      {...props}
    />
  )
)
InputGroupText.displayName = 'InputGroupText'

// ============================================
// INPUT GROUP INPUT (Modified for group)
// ============================================

interface InputGroupInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  inputSize?: 'sm' | 'default' | 'lg'
}

const InputGroupInput = React.forwardRef<HTMLInputElement, InputGroupInputProps>(
  ({ className, inputSize = 'default', ...props }, ref) => {
    const sizeClasses = {
      sm: 'h-8 text-xs',
      default: 'h-10 text-sm',
      lg: 'h-12 text-base',
    }

    return (
      <input
        ref={ref}
        className={cn(
          'flex-1 bg-background px-3 py-2 text-foreground',
          'placeholder:text-muted-foreground',
          'focus:outline-none',
          sizeClasses[inputSize],
          className
        )}
        {...props}
      />
    )
  }
)
InputGroupInput.displayName = 'InputGroupInput'

export { Input, inputVariants, Textarea, InputGroup, InputGroupText, InputGroupInput }
export type { InputGroupProps, InputGroupTextProps, InputGroupInputProps }
