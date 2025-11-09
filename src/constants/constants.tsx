import { type ReactNode } from 'react';
import {
  Atom,
  Waves,
  Code,
  FileCode,
  Palette,
  Zap,
  GitBranch,
} from 'lucide-react';

export interface TechItem {
  name: string;
  icon: ReactNode;
  color: string;
}

export const techItems: TechItem[] = [
  {
    name: 'React',
    icon: <Atom className='w-5 h-5 md:w-8 md:h-8' />,
    color: 'text-blue-400',
  },

  {
    name: 'Vite',
    icon: <Zap className='w-5 h-5 md:w-8 md:h-8' />,
    color: 'text-yellow-300',
  },

  {
    name: 'TailwindCSS',
    icon: <Waves className='w-5 h-5 md:w-8 md:h-8' />,
    color: 'text-cyan-400',
  },
  {
    name: 'JavaScript',
    icon: (
      <div className='w-5 h-5 md:w-8 md:h-8 bg-yellow-400 rounded flex items-center justify-center'>
        <span className='text-black font-bold text-[8px] md:text-xs'>JS</span>
      </div>
    ),
    color: 'text-yellow-400',
  },
  {
    name: 'TypeScript',
    icon: <Code className='w-5 h-5 md:w-8 md:h-8' />,
    color: 'text-blue-500',
  },
  {
    name: 'HTML5',
    icon: <FileCode className='w-5 h-5 md:w-8 md:h-8' />,
    color: 'text-orange-400',
  },
  {
    name: 'CSS',
    icon: <Palette className='w-5 h-5 md:w-8 md:h-8' />,
    color: 'text-blue-400',
  },
  {
    name: 'Git',
    icon: <GitBranch className='w-5 h-5 md:w-8 md:h-8' />,
    color: 'text-red-400',
  },
];

export interface Project {
  title: string;
  description: string;
  imageUrl: string;
  techStack: string[];
  codeUrl: string;
  demoUrl: string;
  borderColor?: 'blue' | 'yellow' | 'green' | 'pink' | 'purple';
}

export const projects: Project[] = [
  {
    title: 'MakanMana',
    description:
      'A warm, inviting web app that helps you decide where to eat nearby. Search for restaurants or let the app "surprise" you with a random pick!',
    imageUrl: '/images/makanmana.png',
    techStack: ['React', 'Vite', 'Tailwind'],
    codeUrl: 'https://github.com/rusydiahmadyusof/MakanMana',
    demoUrl: 'https://makan-mana-swart.vercel.app/',
    borderColor: 'blue',
  },
  {
    title: 'Budget Tracker',
    description:
      'Budget Tracker is a personal finance app for managing income and expenses. It helps users track budgets and spending patterns easily',
    imageUrl: '/images/BudgetTracker.png',
    techStack: ['NextJS', 'Tailwind'],
    codeUrl: 'https://github.com/rusydiahmadyusof/BudgetTracker',
    demoUrl: 'https://budget-tracker-lovat-ten.vercel.app/',
    borderColor: 'blue',
  },
  {
    title: 'TampalSanaSini',
    description:
      'A modern, real-time collaborative sticky note application built with Vue.js and Node.js.',
    imageUrl: '/images/TampalSanaSini.png',
    techStack: ['Vue', 'Tailwind', 'Supabase'],
    codeUrl: 'https://github.com/rusydiahmadyusof/TampalSanaSini',
    demoUrl: 'https://tampal-sana-sini.vercel.app/',
    borderColor: 'yellow',
  },
  {
    title: 'AI Resume Builder',
    description:
      'A zero-cost web application that helps users create AI-generated, tailored resumes by combining personal details with job application information. Features 20 professional templates, PDF export, and AI-powered content generation using Groq API.',
    imageUrl: '/images/ai-resume-builder.png',
    techStack: ['React', 'Vite', 'Tailwind CSS', 'React Hook Form', 'React Router', 'Groq API', 'jsPDF', 'html2canvas'],
    codeUrl: 'https://github.com/rusydiahmadyusof/ai-resume-builder',
    demoUrl: 'https://ai-resume-builder-lovat-chi.vercel.app/',
    borderColor: 'purple',
  },
  {
    title: 'HabitFlick',
    description:
      'A modern habit tracking application that helps you build and maintain positive habits. Track your daily progress, set goals, and visualize your journey towards better habits with an intuitive and beautiful interface.',
    imageUrl: '/images/habitflick.png',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    codeUrl: 'https://github.com/rusydiahmadyusof/habitflick',
    demoUrl: 'https://habit-flick.vercel.app/',
    borderColor: 'pink',
  },
];
