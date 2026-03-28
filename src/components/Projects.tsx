import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, X } from 'lucide-react'
import { useInView } from '../hooks/useInView'

type Project = {
  name: string
  description: string
  longDescription: string
  tech: string[]
  github: string | null
  live: string | null
  wip: boolean
  screenshot: string | null
}

const projects: Project[] = [
  {
    name: 'Gainly',
    description: 'All-in-one SaaS for personal finance management with AI assistant, debt tracking, savings, and investment forecasting.',
    longDescription: 'Gainly is my dissertation project — a full-stack SaaS app built with React and Firebase. It includes an AI-powered assistant, real-time debt tracking, savings goals, and investment forecasting charts. Currently in active development.',
    tech: ['React', 'TypeScript', 'Firebase'],
    github: null,
    live: 'https://gainly-25b89.web.app/',
    wip: true,
    screenshot: '/Gainly.png',
  },
  {
    name: 'ezoumpouli',
    description: 'B2C website for an agricultural supplies shop. Modern, responsive design with Sanity CMS for easy content management.',
    longDescription: 'A fully custom B2C website for a local agricultural supplies retailer. Built with Astro for blazing performance and Sanity CMS so the client can manage products and content independently. Deployed on Netlify.',
    tech: ['Astro', 'Sanity', 'CSS'],
    github: null,
    live: 'https://ezoumpouli.gr',
    wip: false,
    screenshot: '/zoumpoulis.png',
  },
  {
    name: 'promotelio',
    description: 'B2B website for a hotel supplies business. Professional design with product and content management via Sanity.',
    longDescription: 'A B2B-focused website for a hotel supplies distributor. Features a product catalogue, company profile, and a Sanity-powered CMS for easy updates. Clean, professional design targeting business clients.',
    tech: ['Astro', 'Sanity', 'CSS'],
    github: null,
    live: 'https://promotelio.gr',
    wip: false,
    screenshot: '/zografos.png',
  },
  {
    name: 'Deltaspar',
    description: 'B2B website for a fruit & vegetable supplier. Professional design with product catalogue and content management via Sanity.',
    longDescription: 'A freelance B2B website for a fruit & vegetable supplier. Built with Astro for fast performance and with a focus of accesibility , meeting the WCAG 2.1 AA standard. Features a product catalogue, company profile, and a clean professional design targeting business clients.',
    tech: ['Astro', 'Sanity', 'CSS', 'WCAG'],
    github: null,
    live: 'https://deltaspar.com',
    wip: false,
    screenshot: '/deltaspar.png',
  },
  {
    name: 'Budget Tracker',
    description: 'Desktop application for personal finance. Transaction logging, expense categorization, and visual spending charts.',
    longDescription: 'A JavaFX desktop app for personal finance management. Supports transaction logging, expense categorization, and dynamic charts for spending visualization. Built with Scene Builder and custom CSS styling.',
    tech: ['Java', 'JavaFX', 'Scene Builder'],
    github: 'https://github.com/mianagn/BudgetTracker',
    live: null,
    wip: false,
    screenshot: '/budgetTracker.png',
  },
  {
    name: 'Portfolio',
    description: 'This portfolio — built with React and TypeScript. A central hub for my work, skills, and contact information.',
    longDescription: 'The site you\'re looking at right now. Built from scratch with React, TypeScript, Tailwind CSS, and Framer Motion. Designed to be fast, accessible, and a reflection of my front-end skills.',
    tech: ['React', 'TypeScript', 'Tailwind'],
    github: 'https://github.com/mianagn/mianagn.github.io',
    live: 'https://mianagn.github.io',
    wip: false,
    screenshot: '/hero-img.png',
  },
]

function SpotlightCard({ children, delay, inView, onClick }: { children: React.ReactNode; delay: number; inView: boolean; onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null)

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--x', (e.clientX - rect.left).toFixed(2))
    el.style.setProperty('--y', (e.clientY - rect.top).toFixed(2))
    el.style.setProperty('--spotlight-opacity', '1')
  }

  function onMouseLeave() {
    cardRef.current?.style.setProperty('--spotlight-opacity', '0')
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className="spotlight-card group relative rounded-2xl p-[1.5px] cursor-pointer"
    >
      <div className="relative bg-white rounded-[calc(1rem-1.5px)] p-6 flex flex-col gap-4 h-full">
        {children}
      </div>
    </motion.div>
  )
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]
  const dur = 0.3

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
        onClick={onClose}
      >
        {/* Backdrop — animated so blur + tint start simultaneously */}
        <motion.div
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ opacity: 1, backdropFilter: 'blur(6px)' }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          transition={{ duration: dur, ease }}
          className="absolute inset-0 bg-zinc-950/25"
        />

        {/* Panel — same duration + ease */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.97 }}
          transition={{ duration: dur, ease }}
          className="relative z-10 bg-white rounded-2xl w-full max-w-2xl shadow-2xl shadow-zinc-900/10 border border-zinc-200/60 overflow-hidden max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Screenshot / preview */}
          <div className="relative w-full h-36 sm:h-52 bg-zinc-100 overflow-hidden">
            {project.screenshot ? (
              <img
                src={project.screenshot}
                alt={`${project.name} preview`}
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none'
                }}
              />
            ) : null}
            {/* Gradient overlay for offline projects */}
            {!project.screenshot && (
              <div className="absolute inset-0 flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #CCFBF1 0%, #2DD4BF 50%, #0D9488 100%)' }}>
                <span className="font-heading font-black text-4xl text-white/80 tracking-tighter">{project.name}</span>
              </div>
            )}
            {/* Tint overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />

            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-zinc-600 hover:text-zinc-900 shadow-sm transition-colors duration-150 cursor-pointer"
            >
              <X size={14} />
            </button>

            {/* WIP badge */}
            {project.wip && (
              <span className="absolute top-3 left-3 text-[10px] font-body font-medium tracking-wider uppercase bg-accent/15 text-accent px-2 py-0.5 rounded-full backdrop-blur-sm">
                WIP
              </span>
            )}
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6">
            <div className="flex items-start justify-between gap-4 mb-3">
              <h2 className="font-heading font-bold text-2xl text-zinc-900 tracking-tight">{project.name}</h2>
              <div className="flex items-center gap-2 shrink-0 mt-1">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-zinc-700 transition-colors duration-200 cursor-pointer">
                    <Github size={16} />
                  </a>
                )}
                {project.live && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-accent transition-colors duration-200 cursor-pointer">
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>

            <p className="font-body text-sm text-zinc-600 leading-relaxed mb-5">{project.longDescription}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((t) => (
                <span key={t} className="font-body text-[11px] text-zinc-600 bg-zinc-100 border border-zinc-200/60 px-2.5 py-1 rounded-full">
                  {t}
                </span>
              ))}
            </div>

            <div className="flex gap-3">
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-accent text-zinc-950 font-body font-semibold text-xs px-5 py-2.5 rounded-full hover:bg-accent-light transition-colors duration-200 cursor-pointer">
                  <ExternalLink size={12} /> View Live
                </a>
              )}
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-zinc-200 text-zinc-700 font-body font-medium text-xs px-5 py-2.5 rounded-full hover:border-zinc-400 bg-white transition-colors duration-200 cursor-pointer">
                  <Github size={12} /> View Code
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

export default function Projects() {
  const { ref, inView } = useInView()
  const [selected, setSelected] = useState<Project | null>(null)

  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-16"
        >
          <p className="font-body text-xs tracking-widest uppercase text-accent mb-4">Work</p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-zinc-900 tracking-tight">
            Selected Projects
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <SpotlightCard key={project.name} delay={i * 0.07} inView={inView} onClick={() => setSelected(project)}>
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-heading font-semibold text-lg text-zinc-900 tracking-tight leading-tight">
                  {project.name}
                  {project.wip && (
                    <span className="ml-2 text-[10px] font-body font-medium tracking-wider uppercase bg-accent/15 text-accent px-2 py-0.5 rounded-full align-middle">
                      In Progress
                    </span>
                  )}
                </h3>
                <ExternalLink size={14} className="text-zinc-300 group-hover:text-accent transition-colors duration-200 shrink-0 mt-1" />
              </div>

              <p className="font-body text-sm text-zinc-600 leading-relaxed flex-1">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto pt-2">
                {project.tech.map((t) => (
                  <span key={t} className="font-body text-[11px] text-zinc-600 bg-zinc-100 border border-zinc-200/60 px-2.5 py-1 rounded-full">
                    {t}
                  </span>
                ))}
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}
