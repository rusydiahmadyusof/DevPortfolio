import { useState, useEffect, type KeyboardEvent } from 'react'
import { Menu, X } from 'lucide-react'
import { clsx } from 'clsx'

/**
 * Navbar Component
 * Displays the main navigation bar with logo, navigation links, and mobile menu toggle.
 * Handles smooth scrolling to sections and manages scroll-based styling changes.
 */
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  /**
   * Handles scroll events to update navbar styling when scrolled past 20px
   * Adds visual feedback by changing background opacity and border styles
   */
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Navigation links configuration for desktop and mobile menus
  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ]

  /**
   * Handles navigation link clicks with smooth scrolling
   * @param e - Mouse or keyboard event
   * @param href - Target section anchor (e.g., '#home')
   * Calculates scroll position accounting for navbar height (64px) to prevent content overlap
   */
  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)

    const targetId = href.replace('#', '')
    const targetSection = document.getElementById(targetId)

    if (targetSection) {
      const navbarHeight = 64
      const targetPosition = targetSection.offsetTop - navbarHeight

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      })
    }
  }

  /**
   * Handles keyboard accessibility for interactive elements
   * Allows Enter or Space key to trigger actions (for accessibility compliance)
   * @param e - Keyboard event
   * @param action - Function to execute when Enter or Space is pressed
   */
  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement | HTMLAnchorElement>, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      action()
    }
  }

  return (
    <nav
      className={clsx(
        'sticky top-0 z-50 w-full',
        'backdrop-blur-lg',
        'transition-all duration-300 ease-in-out',
        isScrolled
          ? 'bg-white/95 dark:bg-surface/90 shadow-md border-b border-primary/30'
          : 'bg-white/80 dark:bg-surface/50 border-b border-white/10 dark:border-primary/20'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a
              href="#home"
              onClick={(e) => handleLinkClick(e, '#home')}
              onKeyDown={(e) => handleKeyDown(e, () => handleLinkClick(e, '#home'))}
              className="text-xl font-bold text-primary hover:text-primary/80 transition-colors cursor-pointer"
              tabIndex={0}
              aria-label="Rusydi.dev - Home"
            >
              Rusydi.dev
            </a>
          </div>

          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                onKeyDown={(e) => handleKeyDown(e, () => handleLinkClick(e, link.href))}
                className={clsx(
                  'px-3 py-2 rounded-lg',
                  'text-slate-700 dark:text-text/80 hover:text-slate-900 dark:hover:text-text',
                  'hover:bg-white/10 dark:hover:bg-primary/10',
                  'transition-all duration-200',
                  'font-medium',
                  'cursor-pointer'
                )}
              >
                {link.name}
              </a>
            ))}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            onKeyDown={(e) => handleKeyDown(e, () => setIsMobileMenuOpen(!isMobileMenuOpen))}
            className={clsx(
              'md:hidden p-2 rounded-lg',
              'text-slate-700 dark:text-text/80 hover:text-slate-900 dark:hover:text-text',
              'hover:bg-white/10 dark:hover:bg-primary/10',
              'transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-transparent'
            )}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            tabIndex={0}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10 dark:border-primary/20">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  onKeyDown={(e) => handleKeyDown(e, () => handleLinkClick(e, link.href))}
                  className={clsx(
                    'px-3 py-2 rounded-lg',
                    'text-slate-700 dark:text-text/80 hover:text-slate-900 dark:hover:text-text',
                    'hover:bg-white/10 dark:hover:bg-primary/10',
                    'transition-all duration-200',
                    'font-medium',
                    'cursor-pointer'
                  )}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
