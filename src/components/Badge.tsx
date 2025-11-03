import { ReactNode } from 'react'
import { clsx } from 'clsx'

interface BadgeProps {
  children: ReactNode
  className?: string
}

/**
 * Badge Component
 * A small pill-shaped component used for displaying tech stack tags and labels.
 * Features hover glow effect and responsive styling for light/dark modes.
 * @param children - Text or content to display in the badge
 * @param className - Additional CSS classes to merge with default badge styles
 */
const Badge = ({ children, className }: BadgeProps) => {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-full',
        'text-[10px] sm:text-xs font-mono font-medium',
        'bg-gradient-to-r from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20',
        'text-primary dark:text-primary-light',
        'border border-primary/30 dark:border-primary/40',
        'backdrop-blur-sm',
        'transition-all duration-300',
        'hover:border-white/40 hover:scale-105',
        className
      )}
    >
      {children}
    </span>
  )
}

export default Badge
