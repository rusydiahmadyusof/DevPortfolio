import { useState, useEffect, type KeyboardEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { clsx } from 'clsx'
import Card from './Card'
import Button from './Button'
import Badge from './Badge'
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react'

interface Project {
  title: string
  description: string
  imageUrl: string
  techStack: string[]
  codeUrl: string
  demoUrl: string
}

const Projects = () => {
  const projects: Project[] = [
    {
      title: 'Project One',
      description:
        'A brief description of the project that highlights its main features and technologies used.',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
      techStack: ['React', 'TypeScript', 'TailwindCSS', 'Vite'],
      codeUrl: '#',
      demoUrl: '#',
    },
    {
      title: 'Project Two',
      description:
        'A brief description of the project that highlights its main features and technologies used.',
      imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop',
      techStack: ['React', 'JavaScript', 'CSS', 'Git'],
      codeUrl: '#',
      demoUrl: '#',
    },
    {
      title: 'Project Three',
      description:
        'A brief description of the project that highlights its main features and technologies used.',
      imageUrl: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=400&fit=crop',
      techStack: ['HTML5', 'CSS', 'JavaScript', 'Vite'],
      codeUrl: '#',
      demoUrl: '#',
    },
    {
      title: 'Project Four',
      description:
        'A brief description of the project that highlights its main features and technologies used.',
      imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=400&fit=crop',
      techStack: ['React', 'TypeScript', 'TailwindCSS', 'Framer Motion'],
      codeUrl: '#',
      demoUrl: '#',
    },
    {
      title: 'Project Five',
      description:
        'A brief description of the project that highlights its main features and technologies used.',
      imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
      techStack: ['React', 'JavaScript', 'HTML5', 'Git'],
      codeUrl: '#',
      demoUrl: '#',
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(2)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1)
      } else {
        setItemsPerPage(2)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const totalSlides = Math.ceil(projects.length / itemsPerPage)

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
  }

  const handleSlideTo = (index: number) => {
    setCurrentIndex(index)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      action()
    }
  }

  const getVisibleProjects = () => {
    const start = currentIndex * itemsPerPage
    const end = start + itemsPerPage
    return projects.slice(start, end)
  }

  return (
    <section id="projects" className="py-12 scroll-mt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-12 text-center"
        >
          Featured Projects
        </motion.h2>

        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {getVisibleProjects().map((project, index) => (
                  <Card key={`${currentIndex}-${index}`}>
                    <div className="mb-4 -mx-6 -mt-6 rounded-t-xl overflow-hidden">
                      <img
                        src={project.imageUrl}
                        alt={`${project.title} preview`}
                        className="w-full h-48 object-cover"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                    <p className="text-slate-600 dark:text-text/80 mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.techStack.map((tech) => (
                        <Badge key={tech}>{tech}</Badge>
                      ))}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        variant="outline"
                        onClick={() => window.open(project.codeUrl, '_blank')}
                        onKeyDown={(e) =>
                          handleKeyDown(e, () => window.open(project.codeUrl, '_blank'))
                        }
                        className="w-full sm:w-auto flex items-center justify-center gap-2"
                        tabIndex={0}
                        aria-label={`View code for ${project.title}`}
                      >
                        <Github className="w-4 h-4" aria-hidden="true" />
                        View Code
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => window.open(project.demoUrl, '_blank')}
                        onKeyDown={(e) =>
                          handleKeyDown(e, () => window.open(project.demoUrl, '_blank'))
                        }
                        className="w-full sm:w-auto flex items-center justify-center gap-2"
                        tabIndex={0}
                        aria-label={`View live demo for ${project.title}`}
                      >
                        <ExternalLink className="w-4 h-4" aria-hidden="true" />
                        Live Demo
                      </Button>
                    </div>
                  </Card>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={handlePrevious}
            onKeyDown={(e) => handleKeyDown(e, handlePrevious)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 p-2 rounded-full bg-white/90 dark:bg-surface/80 border border-primary/20 text-primary hover:bg-white dark:hover:bg-surface hover:border-primary/40 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background z-10"
            aria-label="Previous projects"
            tabIndex={0}
          >
            <ChevronLeft className="w-6 h-6" aria-hidden="true" />
          </button>

          <button
            onClick={handleNext}
            onKeyDown={(e) => handleKeyDown(e, handleNext)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 p-2 rounded-full bg-white/90 dark:bg-surface/80 border border-primary/20 text-primary hover:bg-white dark:hover:bg-surface hover:border-primary/40 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background z-10"
            aria-label="Next projects"
            tabIndex={0}
          >
            <ChevronRight className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>

        <div className="flex justify-center items-center gap-2 mt-8">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideTo(index)}
              onKeyDown={(e) => handleKeyDown(e, () => handleSlideTo(index))}
              className={clsx(
                'rounded-full transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background',
                currentIndex === index
                  ? 'bg-primary w-8 h-2'
                  : 'bg-primary/30 hover:bg-primary/50 w-2 h-2'
              )}
              aria-label={`Go to slide ${index + 1}`}
              tabIndex={0}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
