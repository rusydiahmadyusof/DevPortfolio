import { type KeyboardEvent, useState, useEffect, useRef } from 'react';
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
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
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
    return url && url !== '#' && (url.startsWith('#') || url.startsWith('http') || url.startsWith('/'));
  };

  const handleProjectClick = (url: string) => {
    if (!isValidUrl(url)) return;

    if (url.startsWith('#')) {
      const element = document.querySelector(url);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }

    window.open(url, '_blank', 'noopener noreferrer');
  };

  // Simple scroll indicator update
  const handleScrollUpdate = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const containerWidth = container.offsetWidth;
    const cardWidth = window.innerWidth < 640 
      ? containerWidth * 0.85 
      : window.innerWidth < 1024 
        ? containerWidth * 0.7 
        : 420;
    const gap = 24;
    const index = Math.round(scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.min(Math.max(0, index), projects.length - 1));
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScrollUpdate, { passive: true });
    handleScrollUpdate();

    return () => {
      container.removeEventListener('scroll', handleScrollUpdate);
    };
  }, []);

  // Simple drag scrolling without momentum
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a')) return;

    const container = scrollContainerRef.current;
    if (!container) return;

    setIsDragging(true);
    const rect = container.getBoundingClientRect();
    startXRef.current = e.pageX - rect.left;
    scrollLeftRef.current = container.scrollLeft;
    container.style.cursor = 'grabbing';
    container.style.userSelect = 'none';
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.preventDefault();

    const container = scrollContainerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.pageX - rect.left;
    const walk = x - startXRef.current;
    container.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    const container = scrollContainerRef.current;
    if (container) {
      container.style.cursor = 'grab';
      container.style.userSelect = '';
    }
  };

  const scrollToIndex = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const validIndex = Math.min(Math.max(0, index), projects.length - 1);
    const containerWidth = container.offsetWidth;
    const cardWidth = window.innerWidth < 640 
      ? containerWidth * 0.85 
      : window.innerWidth < 1024 
        ? containerWidth * 0.7 
        : 420;
    const gap = 24;
    const scrollPosition = validIndex * (cardWidth + gap);
    
    container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
  };

  return (
    <section
      id='projects'
      className='relative h-screen flex items-center justify-center overflow-hidden'
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

      <div className='container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full flex flex-col items-center justify-center relative z-10 h-full py-4 sm:py-6'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='mb-3 sm:mb-4 text-center flex-shrink-0'
        >
          <h2 className='text-2xl sm:text-3xl md:text-4xl font-extrabold text-white'>
            Featured Projects
          </h2>
        </motion.div>

        {/* Horizontal scrollable container */}
        <div 
          ref={scrollContainerRef}
          className='flex gap-3 sm:gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide px-2 sm:px-4 w-full max-w-7xl -mx-2 sm:-mx-4 cursor-grab active:cursor-grabbing select-none flex-1 min-h-0'
          style={{ 
            scrollBehavior: isDragging ? 'auto' : 'smooth',
            WebkitOverflowScrolling: 'touch',
            overscrollBehavior: 'contain',
            scrollSnapType: 'x mandatory'
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: 'easeOut',
              }}
              className='h-full min-w-[85vw] sm:min-w-[70vw] lg:min-w-[380px] max-w-[380px] snap-center flex-shrink-0 pointer-events-auto'
            >
              <Card
                borderColor={project.borderColor || 'blue'}
                className='flex flex-col h-full group'
              >
                {/* Image container */}
                <div className='relative mb-3 -mx-4 -mt-4 rounded-t-xl overflow-hidden'>
                  <div className='relative w-full h-32 sm:h-36 lg:h-40 overflow-hidden'>
                    <OptimizedImage
                      src={project.imageUrl}
                      alt={`${project.title} preview`}
                      className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                      loading='lazy'
                    />
                  </div>
                </div>

                <div className='flex flex-col flex-1 min-h-0 px-2'>
                  <h3 className='text-base sm:text-lg lg:text-xl font-bold mb-2 text-white group-hover:text-primary-light transition-colors duration-300'>
                    {project.title}
                  </h3>
                  <p className='text-xs sm:text-sm text-text-muted mb-2 leading-relaxed line-clamp-2'>
                    {project.description}
                  </p>

                  <div className='flex flex-wrap gap-1.5 mb-2'>
                    {project.techStack.map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>

                  <div className='flex flex-row gap-2 mt-auto pt-1'>
                    <Button
                      variant='outline'
                      onClick={() => handleProjectClick(project.codeUrl)}
                      onKeyDown={(e) =>
                        handleKeyDown(e, () => handleProjectClick(project.codeUrl))
                      }
                      disabled={!isValidUrl(project.codeUrl)}
                      className={clsx(
                        'flex-1 flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm py-1.5 sm:py-2 px-2 sm:px-3',
                        !isValidUrl(project.codeUrl) && 'opacity-50 cursor-not-allowed'
                      )}
                      tabIndex={isValidUrl(project.codeUrl) ? 0 : -1}
                      aria-label={`View code for ${project.title}`}
                      title={!isValidUrl(project.codeUrl) ? 'Code not available' : undefined}
                    >
                      <Github
                        className='w-3.5 h-3.5 sm:w-4 sm:h-4'
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
                        'flex-1 flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm py-1.5 sm:py-2 px-2 sm:px-3',
                        !isValidUrl(project.demoUrl) && 'opacity-50 cursor-not-allowed'
                      )}
                      tabIndex={isValidUrl(project.demoUrl) ? 0 : -1}
                      aria-label={`View live demo for ${project.title}`}
                      title={!isValidUrl(project.demoUrl) ? 'Demo not available' : undefined}
                    >
                      <ExternalLink
                        className='w-3.5 h-3.5 sm:w-4 sm:h-4'
                        aria-hidden='true'
                      />
                      <span className='hidden sm:inline'>Demo</span>
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.article>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className='flex justify-center items-center gap-2 mt-3 sm:mt-4 flex-shrink-0'>
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
