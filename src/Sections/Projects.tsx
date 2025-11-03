import { type KeyboardEvent, useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import OptimizedImage from '../components/OptimizedImage';
import { Github, ExternalLink } from 'lucide-react';
import { projects } from '../constants/constants';

/**
 * Featured Projects Section Component
 * Displays a 2x3 grid of project cards with colored borders, images, descriptions, and action buttons.
 */
const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  /**
   * Handles keyboard accessibility for project action buttons
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

  /**
   * Checks if URL is valid (not a placeholder)
   */
  const isValidUrl = (url: string) => {
    return url && url !== '#' && !url.startsWith('#');
  };

  /**
   * Handles project button clicks with error handling
   */
  const handleProjectClick = useCallback((url: string) => {
    if (!isValidUrl(url)) return;

    try {
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
      if (!newWindow) {
        // Popup blocked or failed to open
        if (import.meta.env.DEV) {
          console.warn('Failed to open URL:', url);
        }
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error opening URL:', error);
      }
    }
  }, []);

  /**
   * Updates active indicator based on scroll position (mobile only)
   */
  const handleScrollUpdate = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    try {
      // Only update on mobile (when flex layout is active)
      if (window.innerWidth < 768) {
        const scrollLeft = container.scrollLeft;
        const cardWidth = container.offsetWidth * 0.85; // 85vw
        const gap = 24; // gap-6 = 24px
        const index = Math.round(scrollLeft / (cardWidth + gap));
        setActiveIndex(Math.min(Math.max(0, index), projects.length - 1));
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error in scroll update:', error);
      }
    }
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScrollUpdate, { passive: true });
    handleScrollUpdate(); // Initial check

    return () => {
      container.removeEventListener('scroll', handleScrollUpdate);
    };
  }, [handleScrollUpdate]);

  /**
   * Scrolls to a specific project index (for indicator clicks)
   */
  const scrollToIndex = useCallback((index: number) => {
    const container = scrollContainerRef.current;
    if (!container || window.innerWidth >= 768) return;

    try {
      const validIndex = Math.min(Math.max(0, index), projects.length - 1);
      const cardWidth = container.offsetWidth * 0.85; // 85vw
      const gap = 24; // gap-6 = 24px
      const scrollPosition = validIndex * (cardWidth + gap);
      
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error scrolling to index:', error);
      }
    }
  }, []);

  return (
    <section
      id='projects'
      className='relative min-h-screen flex items-center py-0 md:py-20 px-4 overflow-hidden'
    >
      {/* Background graphics */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <svg
          className='absolute top-0 left-0 w-full h-full opacity-5'
          xmlns='http://www.w3.org/2000/svg'
        >
          <defs>
            <linearGradient id='projectsLineGradient' x1='0%' y1='0%' x2='100%' y2='0%'>
              <stop offset='0%' stopColor='#3B82F6' stopOpacity='0.4' />
              <stop offset='25%' stopColor='#F59E0B' stopOpacity='0.4' />
              <stop offset='50%' stopColor='#10B981' stopOpacity='0.4' />
              <stop offset='75%' stopColor='#FF6B9D' stopOpacity='0.4' />
              <stop offset='100%' stopColor='#8B5CF6' stopOpacity='0.4' />
            </linearGradient>
          </defs>
          {/* Zigzag pattern */}
          <path d='M 0 20 L 100 30 L 200 10 L 300 40 L 400 15 L 500 35 L 600 12 L 700 38 L 800 18 L 900 32 L 1000 14 L 1100 36 L 1200 16 L 1300 34 L 1400 20 L 1500 30 L 1600 22' stroke='url(#projectsLineGradient)' strokeWidth='2' fill='none' />
          <path d='M 0 50 L 100 60 L 200 40 L 300 70 L 400 45 L 500 65 L 600 42 L 700 68 L 800 48 L 900 62 L 1000 44 L 1100 66 L 1200 46 L 1300 64 L 1400 50 L 1500 60 L 1600 52' stroke='url(#projectsLineGradient)' strokeWidth='2' fill='none' />
          <path d='M 0 80 L 100 90 L 200 70 L 300 100 L 400 75 L 500 95 L 600 72 L 700 98 L 800 78 L 900 92 L 1000 74 L 1100 96 L 1200 76 L 1300 94 L 1400 80 L 1500 90 L 1600 82' stroke='url(#projectsLineGradient)' strokeWidth='2' fill='none' />
        </svg>
        {/* Animated gradient orbs */}
        <div className='absolute top-0 right-1/4 w-96 h-96 bg-accent-blue/5 rounded-full blur-3xl animate-pulse' />
        <div className='absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-accent-pink/5 rounded-full blur-3xl animate-pulse' style={{ animationDelay: '1s' }} />
        <div className='absolute top-1/2 right-0 w-80 h-80 bg-accent-yellow/5 rounded-full blur-3xl animate-pulse' style={{ animationDelay: '2s' }} />
      </div>

      <div className='container mx-auto max-w-7xl w-full relative z-10 flex-1 flex flex-col justify-center pt-4 md:pt-0'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='mb-4 md:mb-12 lg:mb-16 text-center'
        >
          <p className='text-xs md:text-base text-accent-pink mb-1 md:mb-2 font-medium'>
            My Work
          </p>
          <h2 className='text-2xl md:text-4xl lg:text-5xl font-extrabold text-text mb-2 md:mb-4'>
            See featured projects
          </h2>
        </motion.div>

        {/* Mobile: Horizontal scrollable | Desktop: Grid */}
        <div 
          ref={scrollContainerRef}
          className='flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 snap-x snap-mandatory md:snap-none scrollbar-hide px-2 md:px-0 -mx-2 md:mx-0'
          style={{ 
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch' 
          }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: 'easeOut',
              }}
              className='h-full min-w-[85vw] md:min-w-0 snap-center md:snap-none flex-shrink-0 md:flex-shrink w-full md:w-auto'
            >
              <Card
                borderColor={project.borderColor || 'blue'}
                className='flex flex-col h-full group'
              >
                {/* Image container */}
                <div className='relative mb-4 -mx-4 -mt-4 rounded-t-xl overflow-hidden'>
                  <div className='relative w-full h-48 overflow-hidden'>
                    <OptimizedImage
                      src={project.imageUrl}
                      alt={`${project.title} preview`}
                      className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                      loading='lazy'
                    />
                  </div>
                </div>

                <div className='flex flex-col flex-1 min-h-0'>
                  <h3 className='text-xl md:text-2xl font-bold mb-2 text-text group-hover:text-accent-pink transition-colors duration-300'>
                    {project.title}
                  </h3>
                  <p className='text-sm md:text-base text-text-muted mb-4 leading-relaxed line-clamp-3'>
                    {project.description}
                  </p>

                  <div className='flex flex-wrap gap-2 mb-4'>
                    {project.techStack.map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>

                  <div className='flex flex-row gap-2 mt-auto pt-2'>
                    <Button
                      variant='outline'
                      onClick={() => handleProjectClick(project.codeUrl)}
                      onKeyDown={(e) =>
                        handleKeyDown(e, () => handleProjectClick(project.codeUrl))
                      }
                      disabled={!isValidUrl(project.codeUrl)}
                      className={clsx(
                        'flex-1 flex items-center justify-center gap-2 text-sm py-2 px-3 border-white/20 text-text hover:bg-white/10',
                        !isValidUrl(project.codeUrl) && 'opacity-50 cursor-not-allowed'
                      )}
                      tabIndex={isValidUrl(project.codeUrl) ? 0 : -1}
                      aria-label={`View code for ${project.title}`}
                      title={!isValidUrl(project.codeUrl) ? 'Code not available' : undefined}
                    >
                      <Github
                        className='w-4 h-4'
                        aria-hidden='true'
                      />
                      <span className='hidden sm:inline'>Code</span>
                    </Button>
                    <Button
                      variant='primary'
                      onClick={() => handleProjectClick(project.demoUrl)}
                      onKeyDown={(e) =>
                        handleKeyDown(e, () => handleProjectClick(project.demoUrl))
                      }
                      disabled={!isValidUrl(project.demoUrl)}
                      className={clsx(
                        'flex-1 flex items-center justify-center gap-2 text-sm py-2 px-3',
                        !isValidUrl(project.demoUrl) && 'opacity-50 cursor-not-allowed'
                      )}
                      tabIndex={isValidUrl(project.demoUrl) ? 0 : -1}
                      aria-label={`View live demo for ${project.title}`}
                      title={!isValidUrl(project.demoUrl) ? 'Demo not available' : undefined}
                    >
                      <ExternalLink
                        className='w-4 h-4'
                        aria-hidden='true'
                      />
                      <span className='hidden sm:inline'>Demo</span>
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Mobile Scroll Indicator */}
        <div className='flex md:hidden justify-center items-center gap-2 mt-6'>
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={clsx(
                'transition-all duration-300 rounded-full',
                activeIndex === index
                  ? 'w-8 h-2 bg-accent-pink'
                  : 'w-2 h-2 bg-white/30 hover:bg-white/50'
              )}
              aria-label={`Go to project ${index + 1}`}
              aria-current={activeIndex === index ? 'true' : 'false'}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
