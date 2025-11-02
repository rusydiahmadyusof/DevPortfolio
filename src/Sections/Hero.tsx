import { type KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button';

/**
 * Hero Section Component
 * Displays the main introduction section with greeting, role, and call-to-action buttons.
 * Features animated entrance effects and smooth scrolling navigation.
 */
const Hero = () => {
  /**
   * Scrolls to the Projects section with smooth animation
   * Accounts for navbar height to prevent content overlap
   */
  const handleViewProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      const navbarHeight = 64;
      const targetPosition = projectsSection.offsetTop - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  };

  /**
   * Scrolls to the Contact section with smooth animation
   * Accounts for navbar height to prevent content overlap
   */
  const handleContactMe = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const navbarHeight = 64;
      const targetPosition = contactSection.offsetTop - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  };

  /**
   * Handles keyboard accessibility for buttons
   * Enables Enter or Space key to trigger button actions
   * @param e - Keyboard event
   * @param action - Function to execute when Enter or Space is pressed
   */
  const handleKeyDown = (
    e: KeyboardEvent<HTMLButtonElement>,
    action: () => void
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  return (
    <section
      id='home'
      className='relative h-screen flex items-center justify-center py-12 scroll-mt-24 overflow-hidden'
    >
      {/* Animated background gradient */}
      <div className='absolute inset-0 bg-gradient-mesh opacity-50 dark:opacity-30' />
      <div className='absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-accent/5 dark:from-primary/10 dark:to-accent/10' />
      
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex flex-col items-center justify-center relative z-10'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className='space-y-6'
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className='text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight'>
                Hi, I'm{' '}
                <span className='gradient-text'>Rusydi</span>{' '}
                <motion.span
                  animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                  transition={{ duration: 0.5, delay: 1 }}
                  className='inline-block'
                >
                  👋
                </motion.span>
              </h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className='text-2xl md:text-3xl lg:text-4xl font-bold text-primary dark:text-primary-light mb-2'>
                Frontend Developer & UI/UX Enthusiast
              </h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className='text-lg md:text-xl text-slate-600 dark:text-text-muted mb-8 max-w-xl leading-relaxed'
            >
              I build responsive, accessible, and delightful web experiences that users love. 
              Transforming ideas into polished, performant digital solutions.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className='flex flex-col sm:flex-row gap-4'
            >
              <Button
                onClick={handleViewProjects}
                onKeyDown={(e) => handleKeyDown(e, handleViewProjects)}
                variant='primary'
                className='w-full sm:w-auto text-base'
                tabIndex={0}
                aria-label='View Projects'
              >
                View Projects
              </Button>
              <Button
                onClick={handleContactMe}
                onKeyDown={(e) => handleKeyDown(e, handleContactMe)}
                variant='outline'
                className='w-full sm:w-auto text-base'
                tabIndex={0}
                aria-label='Contact Me'
              >
                Contact Me
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className='flex justify-center lg:justify-end relative'
          >
            <div className='relative'>
              {/* Glow effect */}
              <div className='absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl animate-pulse' />
              
              {/* Profile image container */}
              <div className='relative w-64 h-64 md:w-80 md:h-80 rounded-2xl bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 p-1 shadow-glow-lg overflow-hidden'>
                <div className='w-full h-full rounded-2xl bg-white dark:bg-surface border-2 border-primary/30 dark:border-primary/40 overflow-hidden backdrop-blur-sm'>
                  <img
                    src='/images/hero.jpg'
                    alt='Rusydi Ahmad - Frontend Developer'
                    className='w-full h-full object-cover'
                    loading='eager'
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
