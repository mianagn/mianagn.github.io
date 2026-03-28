import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

export default function About() {
  const { ref, inView } = useInView()

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <p className="font-body text-xs tracking-widest uppercase text-accent mb-4">About</p>

          <h2 className="font-heading font-bold text-3xl md:text-4xl text-zinc-900 leading-tight tracking-tight mb-8">
            From concept to{' '}
            <span className="text-accent">deployment</span>.
          </h2>

          <p className="font-body text-zinc-600 text-lg leading-relaxed mb-5">
            I'm a Computer Science student at DUTH and an aspiring developer. I'm
            continuously learning new tools and technologies to expand my skillset,
            and I love not only making things that work well, but also feel good to use.
          </p>
          <p className="font-body text-zinc-500 text-base leading-relaxed">
            My academic journey has provided me with a strong foundation in
            programming and software development. I've worked on everything from
            desktop applications in JavaFX to modern web apps with React and Astro —
            each project teaching me something new about craft and user experience.
            Outside of coding, I enjoy gaming, running, and hiking.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
