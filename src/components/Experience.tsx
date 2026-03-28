import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { ChevronDown, Code2, GraduationCap, MapPin, Languages } from 'lucide-react'

const experiences = [
  {
    role: 'Web Developer · Freelance',
    type: 'Freelance · Remote',
    period: 'Jun 2025 — Present',
    icon: <Code2 size={13} />,
    current: true,
    desc: 'Designed and deployed B2C and B2B websites for retail businesses. Built modern, responsive sites with easy-to-use CMS so clients can manage their own content. Delivered cost-effective solutions using Astro and Sanity.',
    skills: ['Astro', 'Sanity', 'CSS', 'Netlify', 'SEO', 'Compatibility', 'Google Analytics'],
  },
  {
    role: 'BSc Computer Science · DUTH',
    type: 'Full-time · Kavala, Greece',
    period: 'Oct 2021 — Present',
    icon: <GraduationCap size={13} />,
    current: true,
    desc: 'Strong foundation in programming, algorithms, and software engineering. Built desktop apps, web applications, and API integrations across coursework. Dissertation project: Gainly — an AI-powered personal finance SaaS built with React and Firebase.',
    skills: ['React', 'Firebase', 'Java', 'JavaFX', 'TypeScript', 'SQL', 'Data Structures', 'Algorithms'],
  },
]

type Experience = typeof experiences[0]

function ExperienceItem({ exp, isFirst }: { exp: Experience; isFirst: boolean }) {
  const [open, setOpen] = useState(isFirst)

  return (
    <div className="flex gap-4">
      <div className="w-7 h-7 rounded-lg border border-zinc-200 bg-zinc-50 flex items-center justify-center text-zinc-400 shrink-0 mt-0.5">
        {exp.icon}
      </div>

      <div className="flex-1 min-w-0">
        <button
          onClick={() => setOpen(o => !o)}
          className="w-full flex items-start justify-between gap-4 text-left group cursor-pointer"
        >
          <div>
            <p className="font-heading font-semibold text-sm text-zinc-900">{exp.role}</p>
            <p className="font-body text-xs text-zinc-400 mt-0.5">
              {exp.type}
              <span className="mx-1.5">·</span>
              {exp.period.replace('Present', '')}
              {exp.current && <span className="text-accent font-medium">Present</span>}
            </p>
          </div>
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="shrink-0 mt-1"
          >
            <ChevronDown size={14} className="text-zinc-300 group-hover:text-zinc-500 transition-colors duration-150" />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <p className="font-body text-sm text-zinc-500 leading-relaxed mt-3 mb-3">{exp.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {exp.skills.map((s: string) => (
                  <span key={s} className="font-body text-[11px] text-zinc-500 bg-zinc-100 border border-zinc-200/60 px-2 py-0.5 rounded-md">
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function Experience() {
  const { ref, inView } = useInView()

  return (
    <section id="experience" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-16 lg:gap-24 items-start">

          {/* Left — sticky header + meta */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:sticky lg:top-32"
          >
            <p className="font-body text-xs tracking-widest uppercase text-accent mb-4">My Journey</p>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-zinc-900 tracking-tight mb-6">
              Experience
            </h2>
            <p className="font-body text-sm text-zinc-400 leading-relaxed mb-10 max-w-xs">
              I have experimented with various technologies and methodologies throughout my academic and professional journey.
            </p>

            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg border border-zinc-200 bg-zinc-50 flex items-center justify-center shrink-0">
                  <Languages size={13} className="text-zinc-400" />
                </div>
                <div>
                  <p className="font-body text-[11px] tracking-widest uppercase text-zinc-400 mb-0.5">Languages</p>
                  <p className="font-body text-sm text-zinc-700">Greek · English (C2)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg border border-zinc-200 bg-zinc-50 flex items-center justify-center shrink-0">
                  <MapPin size={13} className="text-zinc-400" />
                </div>
                <div>
                  <p className="font-body text-[11px] tracking-widest uppercase text-zinc-400 mb-0.5">Location</p>
                  <p className="font-body text-sm text-zinc-700">Kavala, Greece · Open to relocation</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — single panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="bg-white border border-zinc-200/70 rounded-2xl overflow-hidden"
          >
            {experiences.map((exp, i) => (
              <div key={exp.role} className={`px-6 py-5 ${i > 0 ? 'border-t border-zinc-100' : ''}`}>
                <ExperienceItem exp={exp} isFirst={i === 0} />
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
