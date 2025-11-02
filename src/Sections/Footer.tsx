import { type KeyboardEvent } from 'react'
import { Github, Linkedin } from 'lucide-react'

const Footer = () => {
  const handleKeyDown = (e: KeyboardEvent<HTMLAnchorElement>, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      action()
    }
  }

  return (
    <footer
      className="relative mt-auto border-t border-primary/20 bg-gradient-to-b from-transparent via-surface/30 to-surface/50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-slate-600 dark:text-text/60 hover:text-primary hover:bg-primary/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-transparent"
              aria-label="GitHub Profile"
              tabIndex={0}
              onKeyDown={(e) => handleKeyDown(e, () => window.open('https://github.com', '_blank'))}
            >
              <Github className="w-5 h-5" aria-hidden="true" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-slate-600 dark:text-text/60 hover:text-primary hover:bg-primary/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-transparent"
              aria-label="LinkedIn Profile"
              tabIndex={0}
              onKeyDown={(e) => handleKeyDown(e, () => window.open('https://linkedin.com', '_blank'))}
            >
              <Linkedin className="w-5 h-5" aria-hidden="true" />
            </a>
          </div>

          <p className="text-sm text-slate-600 dark:text-text/60 font-mono text-center">
            © 2025 Rusydi Ahmad — Built with React + Tailwind
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

