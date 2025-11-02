import { type ReactNode } from 'react'
import { Atom, Waves, Code, FileCode, Palette, Zap, GitBranch } from 'lucide-react'

export interface TechItem {
  name: string
  icon: ReactNode
  color: string
}

export const techItems: TechItem[] = [
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

export interface Project {
  title: string
  description: string
  imageUrl: string
  techStack: string[]
  codeUrl: string
  demoUrl: string
}

export const projects: Project[] = [
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
]

