import { type KeyboardEvent } from 'react'
import { motion } from 'framer-motion'
import Button from './Button'

const CTA = () => {
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

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      action()
    }
  }

  return (
    <section id="contact" className="h-screen flex items-center justify-center py-12 scroll-mt-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto w-full"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Let's Work Together!
          </h2>
          <p className="text-lg text-slate-600 dark:text-text/80 mb-8">
            I'm always open to discussing new projects, creative ideas, or opportunities 
            to be part of your visions.
          </p>
          <Button
            onClick={handleContact}
            onKeyDown={(e) => handleKeyDown(e, handleContact)}
            variant="primary"
            className="text-lg px-8 py-3"
            tabIndex={0}
            aria-label="Get in touch"
          >
            Get In Touch
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default CTA
