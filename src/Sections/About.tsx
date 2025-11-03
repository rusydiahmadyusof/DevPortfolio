import { motion } from 'framer-motion'

/**
 * About Section Component
 * Displays information about the developer with animated content.
 * Features two-column layout with image placeholder and descriptive text.
 * Uses Framer Motion for scroll-triggered animations.
 */
const About = () => {
  return (
    <section id="about" className="relative min-h-screen flex items-center justify-center py-12 sm:py-16 md:py-20 scroll-mt-24 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent dark:via-primary/10" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center justify-center relative z-10 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-12 md:mb-16 text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center w-full max-w-6xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative order-2 lg:order-1"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 blur-2xl opacity-50" />
            
            {/* Image container */}
            <div className="relative w-full h-56 sm:h-64 md:h-80 lg:h-96 rounded-2xl bg-gradient-to-br from-primary/30 via-accent/30 to-primary/30 p-1 shadow-glow overflow-hidden">
              <div className="w-full h-full rounded-2xl bg-white dark:bg-surface border-2 border-primary/30 dark:border-primary/40 overflow-hidden backdrop-blur-sm">
                <img
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
            className="space-y-4 sm:space-y-6 order-1 lg:order-2"
          >
            <p className="text-base sm:text-lg md:text-xl text-slate-700 dark:text-text-light leading-relaxed">
              I'm a passionate <span className="font-semibold text-primary dark:text-primary-light">Front-End Web Developer</span> who loves turning ideas into interactive, user-friendly websites. I specialize in building responsive, modern interfaces using React and Tailwind CSS.
            </p>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-text-muted leading-relaxed">
              My focus is on writing clean, maintainable code and crafting seamless digital experiences that blend design with functionality. I'm always exploring new tools and frameworks to stay ahead in the fast-evolving world of web development.
            </p>
            <div className="pt-2 sm:pt-4">
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light font-medium text-xs sm:text-sm border border-primary/20">
                  Clean Code
                </span>
                <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-accent/10 dark:bg-accent/20 text-accent dark:text-accent-light font-medium text-xs sm:text-sm border border-accent/20">
                  User Experience
                </span>
                <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light font-medium text-xs sm:text-sm border border-primary/20">
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

