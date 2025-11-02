import { type KeyboardEvent } from 'react'
import { motion } from 'framer-motion'
import Button from '../components/Button'

const Hero = () => {
  const handleViewProjects = () => {
    const projectsSection = document.getElementById('projects')
    if (projectsSection) {
      const navbarHeight = 64
      const targetPosition = projectsSection.offsetTop - navbarHeight

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      })
    }
  }

  const handleContactMe = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      const navbarHeight = 64
      const targetPosition = contactSection.offsetTop - navbarHeight

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      })
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      action()
    }
  }

  return (
    <section id="home" className="h-screen flex items-center justify-center py-12 scroll-mt-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex flex-col items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              Hi, I'm Rusydi 👋
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-4">
              Frontend Developer & UI/UX Enthusiast
            </h2>
            <p className="text-lg md:text-xl text-slate-600 dark:text-text/80 mb-8 max-w-lg">
              I build responsive, accessible, and delightful web experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleViewProjects}
                onKeyDown={(e) => handleKeyDown(e, handleViewProjects)}
                variant="primary"
                className="w-full sm:w-auto"
                tabIndex={0}
                aria-label="View Projects"
              >
                View Projects
              </Button>
              <Button
                onClick={handleContactMe}
                onKeyDown={(e) => handleKeyDown(e, handleContactMe)}
                variant="outline"
                className="w-full sm:w-auto"
                tabIndex={0}
                aria-label="Contact Me"
              >
                Contact Me
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-slate-100 dark:bg-surface/60 border-2 border-primary/20 flex items-center justify-center transition-colors duration-200">
              <span className="text-slate-400 dark:text-text/40 text-sm font-mono">Profile Image</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero

