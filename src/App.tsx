import Navbar from './components/Navbar'
import Hero from './Sections/Hero'
import About from './Sections/About'
import TechStack from './Sections/TechStack'
import Projects from './Sections/Projects'
import CTA from './components/CTA'
import Footer from './Sections/Footer'

/**
 * Main App Component
 * Root component that renders the entire portfolio layout.
 * Composes all sections: Navbar, Hero, About, TechStack, Projects, CTA, and Footer.
 * Handles dark mode transitions and responsive layout structure.
 */
const App = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-background text-slate-900 dark:text-text flex flex-col transition-colors duration-200">
      <Navbar />
      <main>
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

export default App
