import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { clsx } from 'clsx'

/**
 * Button variant configurations using class-variance-authority
 * Defines three button styles: primary (filled), outline (bordered), and ghost (minimal)
 * All variants include hover effects, focus states, and disabled states
 */
const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-gradient-to-r from-primary to-primary-dark text-white hover:from-primary-light hover:to-primary hover:shadow-glow hover:scale-[1.02] focus:ring-primary active:scale-[0.98]',
        outline: 'border-2 border-primary/50 text-primary bg-transparent/80 backdrop-blur-sm hover:bg-primary/10 hover:border-primary hover:shadow-glow focus:ring-primary active:scale-[0.98]',
        ghost: 'text-primary bg-transparent hover:bg-primary/10 hover:shadow-sm focus:ring-primary active:scale-[0.98]',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

/**
 * Reusable Button Component
 * Provides a consistent button interface with variant support and accessibility features.
 * Supports ref forwarding for integration with form libraries and animation libraries.
 * @param className - Additional CSS classes to merge with variant classes
 * @param variant - Button style variant (primary, outline, or ghost)
 * @param ref - Forwarded ref for accessing the underlying button element
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <button
        className={clsx(buttonVariants({ variant }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'

export default Button
