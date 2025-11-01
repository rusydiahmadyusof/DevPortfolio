import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Atom, Waves, Code, FileCode, Palette, Zap, GitBranch } from 'lucide-react'

interface TechItem {
  name: string
  icon: ReactNode
  color: string
}

const TechStack = () => {
  const techItems: TechItem[] = [
    {
      name: 'React',
      icon: <Atom className="w-8 h-8" />,
      color: 'text-blue-400',
    },
    {
      name: 'TailwindCSS',
      icon: <Waves className="w-8 h-8" />,
      color: 'text-cyan-400',
    },
    {
      name: 'JavaScript',
      icon: (
        <div className="w-8 h-8 bg-yellow-400 rounded flex items-center justify-center">
          <span className="text-black font-bold text-xs">JS</span>
        </div>
      ),
      color: 'text-yellow-400',
    },
    {
      name: 'TypeScript',
      icon: <Code className="w-8 h-8" />,
      color: 'text-blue-500',
    },
    {
      name: 'HTML5',
      icon: <FileCode className="w-8 h-8" />,
      color: 'text-orange-400',
    },
    {
      name: 'CSS',
      icon: <Palette className="w-8 h-8" />,
      color: 'text-blue-400',
    },
    {
      name: 'Vite',
      icon: <Zap className="w-8 h-8" />,
      color: 'text-yellow-300',
    },
    {
      name: 'Git',
      icon: <GitBranch className="w-8 h-8" />,
      color: 'text-red-400',
    },
  ]

  return (
    <section id="skills" className="py-12 scroll-mt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-12 text-center"
        >
          Tech Stack
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {techItems.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="rounded-xl bg-slate-100/80 dark:bg-surface/60 border border-primary/20 p-6 flex flex-col items-center justify-center space-y-4 hover:border-primary/40 transition-all duration-200"
            >
              <div className={tech.color}>{tech.icon}</div>
              <span className="text-sm font-mono text-slate-700 dark:text-text/80">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TechStack
