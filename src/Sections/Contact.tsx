import { type KeyboardEvent, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Instagram, Github, Mail, ExternalLink } from 'lucide-react';

/**
 * Contact Section Component
 * Displays contact information with social media links in a vertical stack.
 * Features code-like background graphics.
 */
const Contact = () => {
  /**
   * Handles keyboard accessibility for social media links
   */
  const handleKeyDown = useCallback((
    e: KeyboardEvent<HTMLAnchorElement>,
    action: () => void
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  }, []);

  // Social media profiles and contact information (memoized for performance)
  const socialLinks = useMemo(
    () => [
      {
        name: 'LinkedIn',
        icon: Linkedin,
        url: 'https://linkedin.com/in/rusydiahmadyusof', // Update with your LinkedIn profile URL
      },
      {
        name: 'Instagram',
        icon: Instagram,
        url: 'https://instagram.com/rusydiahmadyusof', // Update with your Instagram profile URL
      },
      {
        name: 'GitHub',
        icon: Github,
        url: 'https://github.com/rusydiahmadyusof',
      },
      {
        name: 'Email',
        icon: Mail,
        url: 'mailto:rusydi@example.com', // Update with your email address
      },
    ],
    []
  );

  /**
   * Handles link opening with error handling
   */
  const handleLinkOpen = useCallback((url: string, isEmail: boolean) => {
    try {
      if (isEmail) {
        window.location.href = url;
      } else {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
        if (!newWindow && import.meta.env.DEV) {
          console.warn('Popup blocked or failed to open:', url);
        }
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error opening link:', error);
      }
    }
  }, []);

  return (
    <section
      id='contact'
      className='relative min-h-screen flex items-center py-0 md:py-20 px-4 overflow-hidden'
    >
      {/* Code-like background graphics */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <svg
          className='absolute top-0 left-0 w-full h-full opacity-10'
          xmlns='http://www.w3.org/2000/svg'
        >
          <defs>
            <linearGradient id='contactLineGradient' x1='0%' y1='0%' x2='100%' y2='0%'>
              <stop offset='0%' stopColor='#10B981' stopOpacity='0.3' />
              <stop offset='25%' stopColor='#8B5CF6' stopOpacity='0.3' />
              <stop offset='50%' stopColor='#3B82F6' stopOpacity='0.3' />
              <stop offset='75%' stopColor='#F59E0B' stopOpacity='0.3' />
              <stop offset='100%' stopColor='#FFFFFF' stopOpacity='0.3' />
            </linearGradient>
          </defs>
          {/* Horizontal lines */}
          <line x1='0' y1='15%' x2='100%' y2='15%' stroke='url(#contactLineGradient)' strokeWidth='2' />
          <line x1='0' y1='35%' x2='100%' y2='35%' stroke='url(#contactLineGradient)' strokeWidth='2' />
          <line x1='0' y1='55%' x2='100%' y2='55%' stroke='url(#contactLineGradient)' strokeWidth='2' />
          <line x1='0' y1='75%' x2='100%' y2='75%' stroke='url(#contactLineGradient)' strokeWidth='2' />
          <line x1='0' y1='95%' x2='100%' y2='95%' stroke='url(#contactLineGradient)' strokeWidth='2' />
        </svg>
      </div>

      <div className='container mx-auto max-w-2xl w-full flex flex-col items-center justify-center relative z-10 text-center flex-1 pt-4 md:pt-0'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='mb-4 md:mb-8'
        >
          <p className='text-xs md:text-base text-accent-pink mb-1 md:mb-2 font-medium'>
            Contact
          </p>
          <h2 className='text-2xl md:text-4xl lg:text-5xl font-extrabold text-text mb-2 md:mb-4'>
            Liked my work?
          </h2>
          <p className='text-sm md:text-lg text-text/70 mb-6 md:mb-12'>
            Get in touch or follow my social media!
          </p>
        </motion.div>

        {/* Social Media Links */}
        <div className='w-full max-w-md space-y-2 md:space-y-4'>
          {socialLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.name}
                href={link.url}
                target={link.name === 'Email' ? undefined : '_blank'}
                rel={link.name === 'Email' ? undefined : 'noopener noreferrer'}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: 'easeOut',
                }}
                onKeyDown={(e) =>
                  handleKeyDown(e, () => handleLinkOpen(link.url, link.name === 'Email'))
                }
                onClick={(e) => {
                  if (link.name !== 'Email') {
                    e.preventDefault();
                    handleLinkOpen(link.url, false);
                  }
                }}
                className='flex items-center justify-between w-full p-4 rounded-xl bg-surface border border-white/10 hover:border-white/20 hover:bg-surface-light transition-all duration-300 group cursor-pointer'
                aria-label={link.name}
                tabIndex={0}
              >
                <div className='flex items-center gap-4'>
                  <Icon className='w-5 h-5 text-text' />
                  <span className='text-base md:text-lg font-medium text-text'>
                    {link.name}
                  </span>
                </div>
                <ExternalLink className='w-4 h-4 text-text/60 group-hover:text-text transition-colors duration-300' />
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Contact;

