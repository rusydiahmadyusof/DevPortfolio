import { motion } from 'framer-motion';
import { techItems } from '../constants/constants';

/**
 * Tech Stack Section Component
 * Displays a grid of technology icons and names.
 * Features hover animations (scale and lift) with shadow effects.
 * Cards animate on scroll with staggered delays for visual appeal.
 */
const TechStack = () => {
  return (
    <section
      id='skills'
      className='relative min-h-screen flex items-center justify-center py-12 sm:py-16 md:py-20 scroll-mt-24 overflow-hidden'
    >
      {/* Subtle background pattern */}
      <div className='absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent dark:via-accent/10' />

      <div className='container mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center justify-center relative z-10 py-8 sm:py-12'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='mb-8 sm:mb-12 md:mb-16 text-center'
        >
          <h2 className='text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-4'>
            Tech <span className='gradient-text'>Stack</span>
          </h2>
          <div className='w-24 h-1 bg-gradient-to-r from-accent to-primary mx-auto rounded-full' />
        </motion.div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-6xl mx-auto w-full'>
          {techItems.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: 'easeOut',
              }}
              whileHover={{ scale: 1.05, y: -8 }}
              className='group relative rounded-xl sm:rounded-2xl bg-white/80 dark:bg-surface/80 backdrop-blur-sm border-2 border-primary/20 dark:border-primary/30 p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center space-y-2 sm:space-y-3 md:space-y-4 hover:border-primary/60 dark:hover:border-primary/50 transition-all duration-300 shadow-card hover:shadow-card-hover cursor-pointer'
            >
              {/* Glow effect on hover */}
              <div className='absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/0 via-accent/0 to-primary/0 group-hover:from-primary/10 group-hover:via-accent/10 group-hover:to-primary/10 transition-all duration-300 opacity-0 group-hover:opacity-100' />

              <div
                className={`${tech.color} relative z-10 transition-transform duration-300 group-hover:scale-110 text-2xl sm:text-3xl md:text-4xl`}
              >
                {tech.icon}
              </div>
              <span className='text-xs sm:text-sm md:text-base font-mono font-semibold text-slate-700 dark:text-text-light relative z-10 transition-colors duration-300 group-hover:text-primary dark:group-hover:text-primary-light text-center'>
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
