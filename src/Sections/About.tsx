import { motion } from 'framer-motion'
import OptimizedImage from '../components/OptimizedImage'

/**
 * About Section Component
 * Displays information about the developer with animated content.
 * Features two-column layout with image placeholder and descriptive text.
 * Uses Framer Motion for scroll-triggered animations.
 */
const About = () => {
  return (
    <section id="about" className="relative min-h-screen flex items-center py-0 md:py-20 px-4 overflow-hidden">
      {/* Background graphics */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <svg
          className='absolute top-0 left-0 w-full h-full opacity-5'
          xmlns='http://www.w3.org/2000/svg'
        >
          <defs>
            <linearGradient id='aboutLineGradient' x1='0%' y1='0%' x2='100%' y2='0%'>
              <stop offset='0%' stopColor='#10B981' stopOpacity='0.4' />
              <stop offset='25%' stopColor='#8B5CF6' stopOpacity='0.4' />
              <stop offset='50%' stopColor='#3B82F6' stopOpacity='0.4' />
              <stop offset='75%' stopColor='#F59E0B' stopOpacity='0.4' />
              <stop offset='100%' stopColor='#FF6B9D' stopOpacity='0.4' />
            </linearGradient>
          </defs>
          {/* Diagonal lines */}
          <line x1='0' y1='10%' x2='100%' y2='20%' stroke='url(#aboutLineGradient)' strokeWidth='2' />
          <line x1='0' y1='30%' x2='100%' y2='40%' stroke='url(#aboutLineGradient)' strokeWidth='2' />
          <line x1='0' y1='50%' x2='100%' y2='60%' stroke='url(#aboutLineGradient)' strokeWidth='2' />
          <line x1='0' y1='70%' x2='100%' y2='80%' stroke='url(#aboutLineGradient)' strokeWidth='2' />
          <line x1='0' y1='90%' x2='100%' y2='100%' stroke='url(#aboutLineGradient)' strokeWidth='2' />
        </svg>
        {/* Animated gradient orbs */}
        <div className='absolute top-20 left-10 w-72 h-72 bg-accent-purple/10 rounded-full blur-3xl animate-pulse' />
        <div className='absolute bottom-20 right-10 w-96 h-96 bg-accent-blue/10 rounded-full blur-3xl animate-pulse' style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto max-w-6xl w-full relative z-10 flex-1 flex flex-col justify-center pt-4 md:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4 md:mb-8 lg:mb-12 text-center"
        >
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-text mb-2 md:mb-4">
            About Me
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 lg:gap-16 items-center w-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 blur-2xl opacity-50" />
            
            {/* Image container */}
            <div className="relative w-full h-64 md:h-96 rounded-2xl bg-gradient-to-br from-primary/30 via-accent/30 to-primary/30 p-1 shadow-glow overflow-hidden">
              <div className="w-full h-full rounded-2xl bg-surface border-2 border-primary/40 overflow-hidden backdrop-blur-sm">
                <OptimizedImage
                  src="/images/cafe.jpg"
                  alt="Rusydi Ahmad Yusof - Frontend Developer"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-3 md:space-y-6"
          >
            <p className="text-sm md:text-lg lg:text-xl text-text-light leading-relaxed">
              I'm a passionate <span className="font-semibold text-primary-light">Front-End Web Developer</span> who builds responsive, modern websites using React and Tailwind CSS. I focus on clean code and creating great user experiences.
            </p>
            <div className="pt-2 md:pt-4">
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 rounded-lg bg-primary/20 text-primary-light font-medium text-sm border border-primary/30">
                  Clean Code
                </span>
                <span className="px-4 py-2 rounded-lg bg-accent/20 text-accent-light font-medium text-sm border border-accent/30">
                  User Experience
                </span>
                <span className="px-4 py-2 rounded-lg bg-primary/20 text-primary-light font-medium text-sm border border-primary/30">
                  Performance
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About

