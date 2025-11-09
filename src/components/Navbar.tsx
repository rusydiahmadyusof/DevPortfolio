import { useState, useEffect, type KeyboardEvent } from 'react';
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

  const sections = ['home', 'about', 'skills', 'projects', 'contact'];
  const navLinks = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'About', href: '#about', icon: User },
    { name: 'Skills', href: '#skills', icon: Code },
    { name: 'Projects', href: '#projects', icon: FolderKanban },
    { name: 'Contact', href: '#contact', icon: Mail },
  ];

  // Use Intersection Observer for simpler scroll tracking
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach((sectionId) => {
      const section = document.getElementById(sectionId);
      if (!section) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(sectionId);
            }
          });
        },
        {
          threshold: 0.5, // Section is active when 50% visible
          rootMargin: '-20% 0px -20% 0px', // Account for navbar
        }
      );

      observer.observe(section);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  // Simple scroll handler using native browser API
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(targetId);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLAnchorElement>, href: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleLinkClick(e, href);
    }
  };

  return (
    <nav className='fixed bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-50 px-4 w-full max-w-fit'>
      <motion.div
        className='relative flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-full bg-white/10 backdrop-blur-2xl border border-white/30 shadow-2xl'
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
              onKeyDown={(e) => handleKeyDown(e, link.href)}
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
