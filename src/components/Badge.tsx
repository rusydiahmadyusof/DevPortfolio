import { ReactNode } from 'react'
import { clsx } from 'clsx'

interface BadgeProps {
  children: ReactNode
  className?: string
}

const Badge = ({ children, className }: BadgeProps) => {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-3 py-1 rounded-full',
        'text-sm font-mono',
        'bg-slate-100/80 dark:bg-surface/60 text-primary',
        'border border-primary/20',
        'transition-all duration-200',
        'hover:border-primary/40 hover:shadow-[0_0_10px_rgba(37,99,235,0.3)]',
        className
      )}
    >
      {children}
    </span>
  )
}

export default Badge
