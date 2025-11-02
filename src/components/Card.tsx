import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'

interface CardProps {
  children: ReactNode
  className?: string
}

const Card = ({ children, className }: CardProps) => {
  return (
    <motion.div
      className={clsx(
        'relative rounded-xl p-[1px]',
        'bg-gradient-to-br from-primary via-accent to-primary',
        'h-full',
        className
      )}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
    >
      <div className="rounded-xl bg-slate-100 dark:bg-surface p-3 md:p-4 transition-colors duration-200 h-full flex flex-col overflow-hidden">{children}</div>
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        initial={{ boxShadow: 'none' }}
        whileHover={{
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        }}
      />
    </motion.div>
  )
}

export default Card
