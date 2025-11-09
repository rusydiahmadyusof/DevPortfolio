import { memo, type ReactNode, type CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'

interface CardProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  borderColor?: 'blue' | 'yellow' | 'green' | 'pink' | 'purple'
}

/**
 * Card Component
 * A reusable card container with gradient border, hover animations, and shadow effects.
 * Features Framer Motion animations for interactive hover states.
 * @param children - Content to be displayed inside the card
 * @param className - Additional CSS classes to merge with default card styles
 * @param style - Optional inline styles to apply to the card
 */
const Card = memo(({ children, className, style, borderColor = 'blue' }: CardProps) => {
  const borderColorClasses = {
    blue: 'border-accent-blue',
    yellow: 'border-accent-yellow',
    green: 'border-accent-green',
    pink: 'border-accent-pink',
    purple: 'border-accent-purple',
  };

  return (
    <motion.div
      className={clsx(
        'relative rounded-2xl border-2',
        borderColorClasses[borderColor],
        'h-full group',
        className
      )}
      style={style}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="rounded-xl bg-surface p-4 md:p-6 transition-all duration-300 h-full flex flex-col overflow-hidden">{children}</div>
    </motion.div>
  )
})

Card.displayName = 'Card'

export default Card
