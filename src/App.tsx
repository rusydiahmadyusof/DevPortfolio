import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import TechStack from './components/TechStack'
import Projects from './components/Projects'
import CTA from './components/CTA'
import Footer from './components/Footer'

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
