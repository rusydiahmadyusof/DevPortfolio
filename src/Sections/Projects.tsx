import { type KeyboardEvent } from 'react'
import { motion } from 'framer-motion'
import Card from '../components/Card'
import Button from '../components/Button'
import Badge from '../components/Badge'
import { Github, ExternalLink } from 'lucide-react'
import { projects } from '../constants/constants'

const Projects = () => {
  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      action()
    }
  }

  return (
    <section id="projects" className="h-screen flex items-center justify-center py-12 scroll-mt-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex flex-col items-center justify-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-6 md:mb-8 text-center"
        >
          Featured Projects
        </motion.h2>

        <div className="max-w-6xl mx-auto w-full flex-1 flex items-center min-h-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full h-full">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="h-full"
                style={{ maxHeight: '350px' }}
              >
                <Card className="flex flex-col h-full" style={{ height: '350px', maxHeight: '350px' }}>
                  <div className="mb-2 -mx-6 -mt-6 rounded-t-xl overflow-hidden">
                    <img
                      src={project.imageUrl}
                      alt={`${project.title} preview`}
                      className="w-full h-24 md:h-28 object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-col flex-1 min-h-0">
                    <h3 className="text-lg md:text-xl font-bold mb-1.5 md:mb-2">{project.title}</h3>
                    <p className="text-xs md:text-sm text-slate-600 dark:text-text/80 mb-4 leading-relaxed overflow-hidden text-ellipsis" style={{ maxHeight: '3.5rem' }}>
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.techStack.map((tech) => (
                        <Badge key={tech}>{tech}</Badge>
                      ))}
                    </div>
                    <div className="flex flex-row gap-2 mt-auto">
                      <Button
                        variant="outline"
                        onClick={() => window.open(project.codeUrl, '_blank')}
                        onKeyDown={(e) =>
                          handleKeyDown(e, () => window.open(project.codeUrl, '_blank'))
                        }
                        className="w-full flex items-center justify-center gap-1.5 text-xs py-1.5 px-2"
                        tabIndex={0}
                        aria-label={`View code for ${project.title}`}
                      >
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/30">
                          <Github className="w-3 h-3" aria-hidden="true" />
                        </span>
                        View Code
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => window.open(project.demoUrl, '_blank')}
                        onKeyDown={(e) =>
                          handleKeyDown(e, () => window.open(project.demoUrl, '_blank'))
                        }
                        className="w-full flex items-center justify-center gap-1.5 text-xs py-1.5 px-2"
                        tabIndex={0}
                        aria-label={`View live demo for ${project.title}`}
                      >
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/30">
                          <ExternalLink className="w-3 h-3" aria-hidden="true" />
                        </span>
                        Live Demo
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects

