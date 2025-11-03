import {
  ChevronDown,
  Github,
  FileCode,
  Palette,
  Atom,
  Circle,
  Code2,
} from 'lucide-react';
import { motion } from 'framer-motion';
import OptimizedImage from '../components/OptimizedImage';

/**
 * Hero Section Component
 * Centered layout with profile picture, greeting, title, description, skill badges, and scroll indicator.
 * Features code-like background graphics.
 */
const Hero = () => {
  /**
   * Scrolls to the next section with smooth animation
   */
  const handleScrollDown = () => {
    try {
      const aboutSection = document.getElementById('about');
      if (!aboutSection) {
        if (import.meta.env.DEV) {
          console.warn('About section not found');
        }
        return;
      }
      window.scrollTo({
        top: aboutSection.offsetTop - 20,
        behavior: 'smooth',
      });
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error scrolling to about section:', error);
      }
    }
  };

  // Skill badges configuration with proper icons
  const skillBadges = [
    {
      name: 'GitHub',
      icon: Github,
      iconComponent: <Github className='w-4 h-4 text-white' />,
    },
    {
      name: 'HTML',
      icon: FileCode,
      iconComponent: (
        <div className='w-4 h-4 flex items-center justify-center'>
          <span className='text-[10px] font-bold text-white'>HTML</span>
        </div>
      ),
    },
    {
      name: 'CSS',
      icon: Palette,
      iconComponent: (
        <div className='w-4 h-4 flex items-center justify-center'>
          <span className='text-[10px] font-bold text-white'>CSS</span>
        </div>
      ),
    },
    {
      name: 'JS',
      icon: FileCode,
      iconComponent: (
        <div className='w-4 h-4 bg-yellow-400 rounded flex items-center justify-center'>
          <span className='text-[8px] font-bold text-black'>JS</span>
        </div>
      ),
    },
    {
      name: 'React',
      icon: Atom,
      iconComponent: <Atom className='w-4 h-4 text-cyan-400' />,
    },
    {
      name: 'Node.js',
      icon: Circle,
      iconComponent: (
        <div className='w-4 h-4 bg-green-500 rounded-full flex items-center justify-center'>
          <span className='text-[6px] font-bold text-white'>N</span>
        </div>
      ),
    },
  ];

  return (
    <section
      id='home'
      className='relative min-h-screen flex items-center justify-center py-8 sm:py-12 md:py-16 scroll-mt-24 overflow-hidden'
    >
      {/* Code-like background graphics */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <svg
          className='absolute top-0 left-0 w-full h-full opacity-10'
          xmlns='http://www.w3.org/2000/svg'
        >
          <defs>
            <linearGradient
              id='lineGradient'
              x1='0%'
              y1='0%'
              x2='100%'
              y2='0%'
            >
              <stop
                offset='0%'
                stopColor='#10B981'
                stopOpacity='0.3'
              />
              <stop
                offset='25%'
                stopColor='#8B5CF6'
                stopOpacity='0.3'
              />
              <stop
                offset='50%'
                stopColor='#3B82F6'
                stopOpacity='0.3'
              />
              <stop
                offset='75%'
                stopColor='#F59E0B'
                stopOpacity='0.3'
              />
              <stop
                offset='100%'
                stopColor='#FFFFFF'
                stopOpacity='0.3'
              />
            </linearGradient>
          </defs>
          {/* Horizontal lines */}
          <line
            x1='0'
            y1='20%'
            x2='100%'
            y2='20%'
            stroke='url(#lineGradient)'
            strokeWidth='2'
          />
          <line
            x1='0'
            y1='40%'
            x2='100%'
            y2='40%'
            stroke='url(#lineGradient)'
            strokeWidth='2'
          />
          <line
            x1='0'
            y1='60%'
            x2='100%'
            y2='60%'
            stroke='url(#lineGradient)'
            strokeWidth='2'
          />
          <line
            x1='0'
            y1='80%'
            x2='100%'
            y2='80%'
            stroke='url(#lineGradient)'
            strokeWidth='2'
          />
        </svg>
      </div>

      <div className='container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl w-full flex flex-col items-center justify-center relative z-10 text-center py-8 sm:py-12'>
        {/* Profile Picture with Code Tag Overlay */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className='relative mb-4 sm:mb-6 md:mb-8'
        >
          <div className='relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/20'>
            <OptimizedImage
              src='/images/hero.jpg'
              alt='Profile picture of Rusydi Ahmad Yusof'
              className='w-full h-full object-cover'
              loading='eager'
            />
            {/* Code tag overlay */}
            <div className='absolute bottom-0 left-0 bg-accent-pink p-2 rounded-tr-lg'>
              <Code2 className='w-4 h-4 text-white' />
            </div>
          </div>
        </motion.div>

        {/* Greeting Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className='text-base sm:text-lg md:text-xl text-text/80 mb-2'
        >
          Hello World! My name is Rusydi and I am
        </motion.p>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-text mb-4 sm:mb-6'
        >
          Front End Web Developer
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className='text-sm sm:text-base md:text-lg text-text/70 mb-4 sm:mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed px-2'
        >
          I build responsive, accessible, and delightful web experiences that
          users love. Transforming ideas into polished, performant digital
          solutions.
        </motion.p>

        {/* Skill Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className='flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 md:mb-12 px-2'
        >
          {skillBadges.map((badge) => {
            return (
              <div
                key={badge.name}
                className='flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300'
              >
                {badge.iconComponent}
                <span className='text-sm text-white font-medium'>
                  {badge.name}
                </span>
              </div>
            );
          })}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          onClick={handleScrollDown}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleScrollDown();
            }
          }}
          className='flex flex-col items-center gap-2 text-text/60 hover:text-text transition-colors duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-lg p-2'
          aria-label='Scroll down to next section'
          tabIndex={0}
        >
          <ChevronDown className='w-6 h-6 animate-bounce' />
          <span className='text-xs opacity-0 md:opacity-100'>Scroll</span>
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;
