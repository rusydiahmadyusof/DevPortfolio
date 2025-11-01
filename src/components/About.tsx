import { motion } from 'framer-motion'

const About = () => {
  return (
    <section id="about" className="py-12 scroll-mt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-12 text-center"
        >
          About Me
        </motion.h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
              I'm a frontend developer with 3+ years of experience in building responsive 
              and user-friendly web applications. I'm passionate about creating clean, 
              accessible and performant websites.
            </p>
            <p className="text-lg text-slate-600 dark:text-text/80 leading-relaxed">
              My expertise lies in crafting intuitive user interfaces using modern 
              technologies like React, TypeScript, and TailwindCSS. I believe in writing 
              clean, maintainable code that not only looks great but also performs 
              exceptionally well.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
