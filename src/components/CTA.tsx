import { type KeyboardEvent } from 'react'
import { motion } from 'framer-motion'
import Button from './Button'

/**
 * Call-to-Action (CTA) Section Component
 * Displays a contact invitation with a call-to-action button.
 * Encourages user engagement and provides smooth scroll navigation.
 */
const CTA = () => {
  /**
   * Scrolls to the contact section with smooth animation
   * Accounts for navbar height (64px) to ensure proper section visibility
   */
  const handleContact = () => {
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

  /**
   * Handles keyboard accessibility for the CTA button
   * Enables Enter or Space key to trigger the contact scroll action
   * @param e - Keyboard event
   * @param action - Function to execute when Enter or Space is pressed
   */
  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      action()
    }
  }

  return (
    <section id="contact" className="relative h-screen flex items-center justify-center py-12 scroll-mt-24 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-40 dark:opacity-20" />
      <div className="absolute inset-0 bg-gradient-radial from-accent/10 via-transparent to-primary/10 dark:from-accent/20 dark:to-primary/20" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex items-center justify-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center max-w-4xl mx-auto w-full space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
              Let's Work <span className="gradient-text">Together!</span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-8" />
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-slate-700 dark:text-text-light leading-relaxed max-w-2xl mx-auto"
          >
            I'm always open to discussing new projects, creative ideas, or opportunities
            to be part of your visions. Let's build something amazing together.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Button
              onClick={handleContact}
              onKeyDown={(e) => handleKeyDown(e, handleContact)}
              variant="primary"
              className="text-lg px-10 py-4 shadow-glow-lg"
              tabIndex={0}
              aria-label="Get in touch"
            >
              Get In Touch
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTA
