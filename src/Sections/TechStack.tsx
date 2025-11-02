import { motion } from 'framer-motion'
import { techItems } from '../constants/constants'

/**
 * Tech Stack Section Component
 * Displays a grid of technology icons and names.
 * Features hover animations (scale and lift) with shadow effects.
 * Cards animate on scroll with staggered delays for visual appeal.
 */
const TechStack = () => {
  return (
    <section id="skills" className="h-screen flex items-center justify-center py-12 scroll-mt-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex flex-col items-center justify-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-8 md:mb-12 text-center"
        >
          Tech Stack
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto w-full">
          {techItems.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.1, y: -8 }}
              className="rounded-xl bg-slate-100/80 dark:bg-surface/60 border border-primary/20 p-6 flex flex-col items-center justify-center space-y-4 hover:border-primary/40 transition-all duration-200 shadow-md hover:shadow-xl hover:shadow-primary/20 cursor-pointer"
            >
              <div className={tech.color}>{tech.icon}</div>
              <span className="text-sm font-mono font-bold text-slate-700 dark:text-text/80">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TechStack

