import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { clsx } from 'clsx'

/**
 * Button variant configurations using class-variance-authority
 * Defines three button styles: primary (filled), outline (bordered), and ghost (minimal)
 * All variants include hover effects, focus states, and disabled states
 */
const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-2xl px-5 py-2.5 font-semibold transition-all duration-200 hover:scale-105 hover:shadow-[0_0_20px_rgba(37,99,235,0.2)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-white hover:bg-primary/90 focus:ring-primary',
        outline: 'border-2 border-primary text-primary bg-transparent hover:bg-primary/10 focus:ring-primary',
        ghost: 'text-primary bg-transparent hover:bg-primary/10 focus:ring-primary',
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
