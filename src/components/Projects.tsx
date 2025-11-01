import { type KeyboardEvent } from 'react'
import { motion } from 'framer-motion'
import Card from './Card'
import Button from './Button'
import Badge from './Badge'
import { ExternalLink, Github } from 'lucide-react'

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


  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      action()
    }
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

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                  <Card className="flex flex-col h-full">
                    <div className="mb-4 -mx-6 -mt-6 rounded-t-xl overflow-hidden">
                      <img
                        src={project.imageUrl}
                        alt={`${project.title} preview`}
                        className="w-full h-48 object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex flex-col flex-1">
                      <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                      <p className="text-slate-600 dark:text-text/80 mb-4 leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.techStack.map((tech) => (
                          <Badge key={tech}>{tech}</Badge>
                        ))}
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3 mt-auto">
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
