import { motion } from 'framer-motion'

/**
 * About Section Component
 * Displays information about the developer with animated content.
 * Features two-column layout with image placeholder and descriptive text.
 * Uses Framer Motion for scroll-triggered animations.
 */
const About = () => {
  return (
    <section id="about" className="h-screen flex items-center justify-center py-12 scroll-mt-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex flex-col items-center justify-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-8 md:mb-12 text-center"
        >
          About Me
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full flex-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full h-64 md:h-80 rounded-xl bg-slate-100 dark:bg-surface/60 border border-primary/20 flex items-center justify-center transition-colors duration-200"
          >
            <span className="text-slate-400 dark:text-text/40 text-sm font-mono">About Image</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <p className="text-lg text-slate-600 dark:text-text/80 leading-relaxed">
            I'm a passionate Front-End Web Developer who loves turning ideas into interactive, user-friendly websites. I specialize in building responsive, modern interfaces using React and Tailwind CSS. My focus is on writing clean, maintainable code and crafting seamless digital experiences that blend design with functionality. I'm always exploring new tools and frameworks to stay ahead in the fast-evolving world of web development.
            </p>
            
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About

