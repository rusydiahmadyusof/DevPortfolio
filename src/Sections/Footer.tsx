import { type KeyboardEvent } from 'react';
import { Github, Linkedin } from 'lucide-react';

/**
 * Footer Component
 * Displays copyright information and social media links (GitHub, LinkedIn).
 * Provides external links with proper security attributes (rel="noopener noreferrer").
 */
const Footer = () => {
  /**
   * Handles keyboard accessibility for social media links
   * Enables Enter or Space key to open social media profiles in new tabs
   * @param e - Keyboard event
   * @param action - Function to execute when Enter or Space is pressed
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
    <footer className='relative mt-auto border-t border-primary/20 dark:border-primary/30 bg-gradient-to-b from-transparent via-primary/5 to-surface/40 dark:via-primary/10 dark:to-surface/60'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='flex flex-col items-center justify-center space-y-6'>
          <div className='flex items-center space-x-6'>
            <a
              href='https://github.com'
              target='_blank'
              rel='noopener noreferrer'
              className='group p-3 rounded-xl text-slate-600 dark:text-text-muted hover:text-primary dark:hover:text-primary-light hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-300 hover:scale-110 hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-transparent'
              aria-label='GitHub Profile'
              tabIndex={0}
              onKeyDown={(e) =>
                handleKeyDown(e, () =>
                  window.open('https://github.com', '_blank')
                )
              }
            >
              <Github
                className='w-6 h-6 transition-transform duration-300 group-hover:scale-110'
                aria-hidden='true'
              />
            </a>
            <a
              href='https://linkedin.com'
              target='_blank'
              rel='noopener noreferrer'
              className='group p-3 rounded-xl text-slate-600 dark:text-text-muted hover:text-primary dark:hover:text-primary-light hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-300 hover:scale-110 hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-transparent'
              aria-label='LinkedIn Profile'
              tabIndex={0}
              onKeyDown={(e) =>
                handleKeyDown(e, () =>
                  window.open('https://linkedin.com', '_blank')
                )
              }
            >
              <Linkedin
                className='w-6 h-6 transition-transform duration-300 group-hover:scale-110'
                aria-hidden='true'
              />
            </a>
          </div>

          <div className='flex flex-col items-center space-y-2'>
            <p className='text-sm md:text-base text-slate-700 dark:text-text-muted font-medium text-center'>
              © 2025{' '}
              <span className='font-bold text-primary dark:text-primary-light'>
                Rusydi Ahmad Yusof
              </span>
            </p>
            <p className='text-xs md:text-sm text-slate-500 dark:text-text-muted/80 font-mono text-center'>
              Built with{' '}
              <span className='text-primary dark:text-primary-light'>
                React
              </span>{' '}
              +{' '}
              <span className='text-accent dark:text-accent-light'>
                Tailwind CSS
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
