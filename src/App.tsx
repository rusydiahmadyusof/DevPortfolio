import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Hero from './Sections/Hero'
import About from './Sections/About'
import TechStack from './Sections/TechStack'
import Footer from './Sections/Footer'

// Lazy load below-the-fold sections for better initial load performance
const Projects = lazy(() => import('./Sections/Projects'))
const Game = lazy(() => import('./Sections/Game'))
const Contact = lazy(() => import('./Sections/Contact'))

/**
 * Loading fallback component for lazy-loaded sections
 */
const SectionLoader = () => (
  <div className="min-h-screen flex items-center justify-center py-20">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      <p className="text-text-muted text-sm">Loading...</p>
    </div>
  </div>
)

/**
 * Main App Component
 * Root component that renders the entire portfolio layout.
 * Composes all sections: Navbar, Hero, About, TechStack, Projects, Contact, and Footer.
 * Handles dark mode transitions and responsive layout structure.
 * Uses code splitting for below-the-fold sections to improve initial load performance.
 */
const App = () => {
  return (
    <div className="min-h-screen bg-background text-text flex flex-col transition-colors duration-200 relative">
      {/* Skip to main content link for accessibility */}
      <a href="#home" className="skip-to-content">
        Skip to main content
      </a>
      {/* Global Background Graphics */}
      <div className='fixed inset-0 overflow-hidden pointer-events-none z-0'>
        <svg
          className='absolute top-0 left-0 w-full h-full opacity-[0.03]'
          xmlns='http://www.w3.org/2000/svg'
        >
          <defs>
            <linearGradient id='globalLineGradient' x1='0%' y1='0%' x2='100%' y2='0%'>
              <stop offset='0%' stopColor='#10B981' stopOpacity='0.5' />
              <stop offset='20%' stopColor='#8B5CF6' stopOpacity='0.5' />
              <stop offset='40%' stopColor='#3B82F6' stopOpacity='0.5' />
              <stop offset='60%' stopColor='#F59E0B' stopOpacity='0.5' />
              <stop offset='80%' stopColor='#FF6B9D' stopOpacity='0.5' />
              <stop offset='100%' stopColor='#FFFFFF' stopOpacity='0.5' />
            </linearGradient>
          </defs>
          {/* Horizontal lines */}
          <line x1='0' y1='10%' x2='100%' y2='10%' stroke='url(#globalLineGradient)' strokeWidth='2' />
          <line x1='0' y1='20%' x2='100%' y2='20%' stroke='url(#globalLineGradient)' strokeWidth='2' />
          <line x1='0' y1='30%' x2='100%' y2='30%' stroke='url(#globalLineGradient)' strokeWidth='2' />
          <line x1='0' y1='40%' x2='100%' y2='40%' stroke='url(#globalLineGradient)' strokeWidth='2' />
          <line x1='0' y1='50%' x2='100%' y2='50%' stroke='url(#globalLineGradient)' strokeWidth='2' />
          <line x1='0' y1='60%' x2='100%' y2='60%' stroke='url(#globalLineGradient)' strokeWidth='2' />
          <line x1='0' y1='70%' x2='100%' y2='70%' stroke='url(#globalLineGradient)' strokeWidth='2' />
          <line x1='0' y1='80%' x2='100%' y2='80%' stroke='url(#globalLineGradient)' strokeWidth='2' />
          <line x1='0' y1='90%' x2='100%' y2='90%' stroke='url(#globalLineGradient)' strokeWidth='2' />
        </svg>
        {/* Animated gradient orbs */}
        <div className='absolute top-0 left-1/4 w-[600px] h-[600px] bg-accent-purple/5 rounded-full blur-3xl animate-pulse' />
        <div className='absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-accent-blue/5 rounded-full blur-3xl animate-pulse' style={{ animationDelay: '1s' }} />
        <div className='absolute bottom-1/4 left-1/3 w-[700px] h-[700px] bg-accent-green/5 rounded-full blur-3xl animate-pulse' style={{ animationDelay: '2s' }} />
        <div className='absolute bottom-0 right-1/3 w-[550px] h-[550px] bg-accent-yellow/5 rounded-full blur-3xl animate-pulse' style={{ animationDelay: '0.5s' }} />
        <div className='absolute top-1/2 left-0 w-[400px] h-[400px] bg-accent-pink/5 rounded-full blur-3xl animate-pulse' style={{ animationDelay: '1.5s' }} />
      </div>

      <main className="pb-24 relative z-10">
        <Hero />
        <About />
        <TechStack />
        <Suspense fallback={<SectionLoader />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Game />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
      <Navbar />
    </div>
  )
}

export default App
