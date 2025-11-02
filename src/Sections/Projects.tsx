import { type KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import { Github, ExternalLink } from 'lucide-react';
import { projects } from '../constants/constants';

/**
 * Featured Projects Section Component
 * Displays a grid of project cards with images, descriptions, tech stacks, and action buttons.
 * Each card shows project preview, description, tech badges, and links to code/demo.
 */
const Projects = () => {
  /**
   * Handles keyboard accessibility for project action buttons
   * Enables Enter or Space key to trigger button actions (View Code / Live Demo)
   * @param e - Keyboard event
   * @param action - Function to execute when Enter or Space is pressed
   */
  const handleKeyDown = (
    e: KeyboardEvent<HTMLButtonElement>,
    action: () => void
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  return (
    <section
      id='projects'
      className='relative h-screen flex items-center justify-center py-12 scroll-mt-24 overflow-hidden'
    >
      {/* Subtle background pattern */}
      <div className='absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent dark:via-primary/10' />

      <div className='container mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex flex-col items-center justify-center relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='mb-12 md:mb-16 text-center'
        >
          <h2 className='text-4xl md:text-5xl font-extrabold mb-4'>
            Featured <span className='gradient-text'>Projects</span>
          </h2>
          <div className='w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full' />
        </motion.div>

        <div className='max-w-7xl mx-auto w-full flex-1 flex items-center min-h-0'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full'>
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: 'easeOut',
                }}
                className='h-full'
              >
                <Card className='flex flex-col h-full group'>
                  {/* Image container with overlay */}
                  <div className='relative mb-4 -mx-6 -mt-6 rounded-t-2xl overflow-hidden'>
                    <div className='relative w-full h-40 md:h-48 overflow-hidden'>
                      <img
                        src={project.imageUrl}
                        alt={`${project.title} preview`}
                        className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                        loading='lazy'
                      />
                      {/* Overlay gradient */}
                      <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                    </div>
                  </div>

                  <div className='flex flex-col flex-1 min-h-0 px-1'>
                    <h3 className='text-xl md:text-2xl font-bold mb-2 text-slate-900 dark:text-text group-hover:text-primary dark:group-hover:text-primary-light transition-colors duration-300'>
                      {project.title}
                    </h3>
                    <p className='text-sm md:text-base text-slate-600 dark:text-text-muted mb-4 leading-relaxed line-clamp-3'>
                      {project.description}
                    </p>

                    <div className='flex flex-wrap gap-2 mb-4'>
                      {project.techStack.map((tech) => (
                        <Badge key={tech}>{tech}</Badge>
                      ))}
                    </div>

                    <div className='flex flex-row gap-2 mt-auto pt-2'>
                      <Button
                        variant='outline'
                        onClick={() => window.open(project.codeUrl, '_blank')}
                        onKeyDown={(e) =>
                          handleKeyDown(e, () =>
                            window.open(project.codeUrl, '_blank')
                          )
                        }
                        className='flex-1 flex items-center justify-center gap-2 text-sm py-2 px-3'
                        tabIndex={0}
                        aria-label={`View code for ${project.title}`}
                      >
                        <Github
                          className='w-4 h-4'
                          aria-hidden='true'
                        />
                        <span className='hidden sm:inline'>Code</span>
                      </Button>
                      <Button
                        variant='primary'
                        onClick={() => window.open(project.demoUrl, '_blank')}
                        onKeyDown={(e) =>
                          handleKeyDown(e, () =>
                            window.open(project.demoUrl, '_blank')
                          )
                        }
                        className='flex-1 flex items-center justify-center gap-2 text-sm py-2 px-3'
                        tabIndex={0}
                        aria-label={`View live demo for ${project.title}`}
                      >
                        <ExternalLink
                          className='w-4 h-4'
                          aria-hidden='true'
                        />
                        <span className='hidden sm:inline'>Demo</span>
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
  );
};

export default Projects;
