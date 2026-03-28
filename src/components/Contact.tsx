import { useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from 'emailjs-com'
import { Send, Github, Linkedin, Instagram } from 'lucide-react'
import { useInView } from '../hooks/useInView'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const socials = [
  { label: 'GitHub', href: 'https://github.com/mianagn', icon: Github },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mixalis-anagnostou-9650a4297/', icon: Linkedin },
  { label: 'Instagram', href: 'https://www.instagram.com/mixalhs_anagnwstou_/', icon: Instagram },
]

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function Contact() {
  const { ref, inView } = useInView()
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({ from_name: '', from_email: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: form.from_name,
          from_email: form.from_email,
          subject: 'New message from portfolio',
          message: form.message,
        },
        PUBLIC_KEY
      )
      setStatus('success')
      setForm({ from_name: '', from_email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16"
        >
          <p className="font-body text-xs tracking-widest uppercase text-accent mb-4">Contact</p>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-zinc-900 tracking-tight">
            Let's work together
          </h2>
          <p className="font-body text-zinc-600 text-base mt-3 max-w-md">
            Available for freelance projects, internships, and junior developer roles.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="flex flex-col gap-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="from_name" className="font-body text-xs tracking-widest uppercase text-zinc-600">
                  Name
                </label>
                <input
                  id="from_name"
                  name="from_name"
                  type="text"
                  required
                  value={form.from_name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="bg-white border border-zinc-200 rounded-xl px-4 py-3 font-body text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-accent/50 transition-colors duration-200"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="from_email" className="font-body text-xs tracking-widest uppercase text-zinc-600">
                  Email
                </label>
                <input
                  id="from_email"
                  name="from_email"
                  type="email"
                  required
                  value={form.from_email}
                  onChange={handleChange}
                  placeholder="you@email.com"
                  className="bg-white border border-zinc-200 rounded-xl px-4 py-3 font-body text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-accent/50 transition-colors duration-200"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="font-body text-xs tracking-widest uppercase text-zinc-600">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
                className="bg-white border border-zinc-200 rounded-xl px-4 py-3 font-body text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-accent/50 transition-colors duration-200 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="self-start inline-flex items-center gap-2 bg-accent text-zinc-950 font-body font-semibold text-sm px-6 py-3 rounded-full hover:bg-accent-light transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={14} />
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>

            {status === 'success' && (
              <p className="font-body text-sm text-accent">Message sent — I'll get back to you soon!</p>
            )}
            {status === 'error' && (
              <p className="font-body text-sm text-red-500">Something went wrong. Try emailing me directly.</p>
            )}
          </motion.form>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col gap-8 items-end text-right"
          >
            <div>
              <p className="font-body text-xs tracking-widest uppercase text-zinc-400 mb-3">My Email</p>
              <a
                href="mailto:mixalhsanagnostou2003@gmail.com"
                className="font-body text-base text-zinc-700 hover:text-accent transition-colors duration-200"
              >
                mixalhsanagnostou2003@gmail.com
              </a>
            </div>

            <div>
              <p className="font-body text-xs tracking-widest uppercase text-zinc-400 mb-3">Socials</p>
              <div className="flex flex-col gap-3 items-end">
                {socials.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-zinc-500 hover:text-zinc-800 transition-colors duration-200 cursor-pointer group"
                  >
                    <span className="font-body text-base">{label}</span>
                    <Icon size={18} className="group-hover:text-accent transition-colors duration-200" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
