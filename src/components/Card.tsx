import { ReactNode, CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'

interface CardProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

/**
 * Card Component
 * A reusable card container with gradient border, hover animations, and shadow effects.
 * Features Framer Motion animations for interactive hover states.
 * @param children - Content to be displayed inside the card
 * @param className - Additional CSS classes to merge with default card styles
 * @param style - Optional inline styles to apply to the card
 */
const Card = ({ children, className, style }: CardProps) => {
  return (
    <motion.div
      className={clsx(
        'relative rounded-2xl p-[1.5px]',
        'bg-gradient-to-br from-primary/40 via-accent/40 to-primary/40',
        'h-full group',
        className
      )}
      style={style}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="rounded-2xl bg-white dark:bg-surface/95 backdrop-blur-sm p-4 md:p-6 transition-all duration-300 h-full flex flex-col overflow-hidden border border-primary/10 dark:border-primary/20 group-hover:border-primary/30">{children}</div>
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
        }}
      />
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        initial={{ boxShadow: 'none' }}
        whileHover={{
          boxShadow: '0 20px 25px -5px rgba(59, 130, 246, 0.2), 0 10px 10px -5px rgba(139, 92, 246, 0.1)',
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}

export default Card
