import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  type KeyboardEvent,
} from 'react';
import { Home, User, Code, FolderKanban, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

/**
 * Navbar Component
 * Floating bottom navigation bar with icon-based navigation.
 * Features glassmorphism design and active section highlighting.
 */
const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolling, setIsScrolling] = useState(false);

  /**
   * Memoized sections array for performance
   */
  const sections = useMemo(
    () => ['home', 'about', 'skills', 'projects', 'contact'],
    []
  );

  /**
   * Optimized scroll handler with useCallback
   */
  const handleScroll = useCallback(() => {
    if (isScrolling) return;

    try {
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          // Check if section is in viewport
          if (rect.top <= 200 && rect.bottom >= 100) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    } catch (error) {
      // Silently handle errors to prevent breaking the app
      if (import.meta.env.DEV) {
        console.error('Error in scroll handler:', error);
      }
    }
  }, [isScrolling, sections]);

  /**
   * Handles scroll events to track active section based on scroll position
   * Uses debouncing to work smoothly with programmatic scrolling
   */
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    const debouncedHandleScroll = () => {
      // Clear previous timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // Debounce scroll handler
      timeoutId = setTimeout(handleScroll, 150);
    };

    window.addEventListener('scroll', debouncedHandleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [handleScroll]);

  // Navigation links configuration with icons (memoized for performance)
  const navLinks = useMemo(
    () => [
      { name: 'Home', href: '#home', icon: Home },
      { name: 'About', href: '#about', icon: User },
      { name: 'Skills', href: '#skills', icon: Code },
      { name: 'Projects', href: '#projects', icon: FolderKanban },
      { name: 'Contact', href: '#contact', icon: Mail },
    ],
    []
  );

  /**
   * Custom smooth scroll function with easing animation (memoized)
   */
  const smoothScrollTo = useCallback(
    (targetY: number, duration: number = 1000) => {
      try {
        const startY = window.scrollY;
        const distance = targetY - startY;
        const startTime = performance.now();
        setIsScrolling(true);

        // Easing function: easeInOutCubic for smooth acceleration and deceleration
        const easeInOutCubic = (t: number): number => {
          return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        };

        const animateScroll = (currentTime: number) => {
          try {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = easeInOutCubic(progress);

            window.scrollTo(0, startY + distance * ease);

            if (progress < 1) {
              requestAnimationFrame(animateScroll);
            } else {
              setIsScrolling(false);
            }
          } catch (error) {
            setIsScrolling(false);
            if (import.meta.env.DEV) {
              console.error('Error in scroll animation:', error);
            }
          }
        };

        requestAnimationFrame(animateScroll);
      } catch (error) {
        setIsScrolling(false);
        if (import.meta.env.DEV) {
          console.error('Error initiating scroll:', error);
        }
      }
    },
    []
  );

  /**
   * Handles navigation link clicks with smooth scrolling animation
   */
  const handleLinkClick = useCallback(
    (
      e:
        | React.MouseEvent<HTMLAnchorElement>
        | React.KeyboardEvent<HTMLAnchorElement>,
      href: string
    ) => {
      e.preventDefault();

      try {
        const targetId = href.replace('#', '');
        const targetSection = document.getElementById(targetId);

        if (!targetSection) {
          if (import.meta.env.DEV) {
            console.warn(`Section with id "${targetId}" not found`);
          }
          return;
        }

        const viewportHeight = window.innerHeight;
        const sectionTop = targetSection.offsetTop;
        const sectionHeight = targetSection.offsetHeight;

        // Get navbar element to calculate its actual height
        const navbar = document.querySelector('nav');
        const navbarHeight = navbar ? navbar.offsetHeight + 32 : 100; // Add some spacing

        // Calculate position to center section vertically in viewport
        // Center the section's midpoint at the viewport's midpoint
        // Account for navbar at bottom: adjust so content appears centered accounting for navbar space
        const sectionMidpoint = sectionTop + sectionHeight / 2;

        // Calculate scroll position: move section midpoint to viewport midpoint
        // Subtract navbar height from viewport to account for bottom navbar overlap
        const adjustedViewportHeight = viewportHeight - navbarHeight;
        const adjustedViewportMidpoint = adjustedViewportHeight / 2;

        const targetPosition = Math.max(
          0,
          sectionMidpoint - adjustedViewportMidpoint
        );

        // Use custom smooth scroll instead of native smooth scroll
        smoothScrollTo(targetPosition, 1000);

        // Update active section immediately for visual feedback
        setActiveSection(targetId);
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error('Error in handleLinkClick:', error);
        }
      }
    },
    []
  );

  /**
   * Handles keyboard accessibility for interactive elements
   */
  const handleKeyDown = (
    e: KeyboardEvent<HTMLAnchorElement>,
    action: () => void
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  return (
    <nav className='fixed bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-50 px-4 w-full max-w-fit'>
      <motion.div
        className='relative flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-full bg-white/10 backdrop-blur-2xl border border-white/30 shadow-2xl'
        animate={
          isScrolling ? { scale: 0.98, opacity: 0.9 } : { scale: 1, opacity: 1 }
        }
        transition={{ duration: 0.2 }}
      >
        {/* Outer glow */}
        <div className='absolute inset-0 rounded-full bg-gradient-to-r from-white/10 via-white/5 to-white/10 blur-xl -z-10' />
        {/* Inner shine effect */}
        <div className='absolute inset-0 rounded-full bg-gradient-to-t from-white/20 via-transparent to-transparent opacity-50 pointer-events-none' />
        {/* Subtle background overlay */}
        <div className='absolute inset-0 rounded-full bg-gradient-to-br from-white/5 via-transparent to-white/5 pointer-events-none' />
        {navLinks.map((link) => {
          const sectionId = link.href.replace('#', '');
          const isActive = activeSection === sectionId;
          const Icon = link.icon;

          return (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              onKeyDown={(e) =>
                handleKeyDown(e, () => handleLinkClick(e, link.href))
              }
              className={clsx(
                'p-2 sm:p-3 rounded-full transition-all duration-300',
                'cursor-pointer relative z-10',
                isActive
                  ? 'bg-accent/30 text-accent scale-110 backdrop-blur-sm'
                  : 'text-text/60 hover:text-text hover:bg-white/10 hover:backdrop-blur-sm'
              )}
              aria-label={link.name}
              tabIndex={0}
            >
              <Icon
                className='w-4 h-4 sm:w-5 sm:h-5'
                aria-hidden='true'
              />
              {isActive && (
                <motion.div
                  className='absolute inset-0 rounded-full bg-accent/20 -z-10'
                  layoutId='activeNavItem'
                  transition={{
                    type: 'spring',
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}
            </a>
          );
        })}
      </motion.div>
    </nav>
  );
};

export default Navbar;
