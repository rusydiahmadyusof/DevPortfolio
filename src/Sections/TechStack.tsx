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
      className='relative min-h-screen flex items-center py-0 md:py-20 px-4 overflow-hidden'
    >
      {/* Background graphics */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <svg
          className='absolute top-0 left-0 w-full h-full opacity-5'
          xmlns='http://www.w3.org/2000/svg'
        >
          <defs>
            <linearGradient id='techLineGradient' x1='0%' y1='0%' x2='100%' y2='0%'>
              <stop offset='0%' stopColor='#FF6B9D' stopOpacity='0.4' />
              <stop offset='25%' stopColor='#3B82F6' stopOpacity='0.4' />
              <stop offset='50%' stopColor='#F59E0B' stopOpacity='0.4' />
              <stop offset='75%' stopColor='#10B981' stopOpacity='0.4' />
              <stop offset='100%' stopColor='#8B5CF6' stopOpacity='0.4' />
            </linearGradient>
          </defs>
          {/* Curved lines */}
          <path d='M 0 20 Q 400 10, 800 20 T 1600 20' stroke='url(#techLineGradient)' strokeWidth='2' fill='none' />
          <path d='M 0 40 Q 400 50, 800 40 T 1600 40' stroke='url(#techLineGradient)' strokeWidth='2' fill='none' />
          <path d='M 0 60 Q 400 70, 800 60 T 1600 60' stroke='url(#techLineGradient)' strokeWidth='2' fill='none' />
          <path d='M 0 80 Q 400 90, 800 80 T 1600 80' stroke='url(#techLineGradient)' strokeWidth='2' fill='none' />
        </svg>
        {/* Animated gradient orbs */}
        <div className='absolute top-10 right-20 w-80 h-80 bg-accent-yellow/10 rounded-full blur-3xl animate-pulse' />
        <div className='absolute bottom-10 left-20 w-96 h-96 bg-accent-green/10 rounded-full blur-3xl animate-pulse' style={{ animationDelay: '1.5s' }} />
      </div>

      <div className='container mx-auto max-w-6xl w-full relative z-10 flex-1 flex flex-col justify-center pt-4 md:pt-0'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='mb-4 md:mb-12 lg:mb-16 text-center'
        >
          <h2 className='text-2xl md:text-4xl lg:text-5xl font-extrabold text-text mb-2 md:mb-4'>
            Tech Stack
          </h2>
        </motion.div>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 lg:gap-6 w-full'>
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
              whileHover={{ scale: 1.1, y: -12 }}
              className='group relative rounded-xl md:rounded-2xl bg-surface backdrop-blur-sm border-2 border-white/10 p-3 md:p-6 lg:p-8 flex flex-col items-center justify-center space-y-2 md:space-y-4 hover:border-white/20 transition-all duration-300 cursor-pointer'
            >
              {/* Glow effect on hover */}
              <div className='absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary/0 via-accent/0 to-primary/0 group-hover:from-primary/10 group-hover:via-accent/10 group-hover:to-primary/10 transition-all duration-300 opacity-0 group-hover:opacity-100' />

              <div
                className={`${tech.color} relative z-10 transition-transform duration-300 group-hover:scale-110`}
              >
                {tech.icon}
              </div>
              <span className='text-xs md:text-sm lg:text-base font-mono font-semibold text-text-light relative z-10 transition-colors duration-300 group-hover:text-primary-light text-center'>
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
