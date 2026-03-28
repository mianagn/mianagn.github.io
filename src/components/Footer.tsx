import { Github, Linkedin, Instagram } from 'lucide-react'

const socials = [
  { label: 'GitHub', href: 'https://github.com/mianagn', icon: Github },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mixalis-anagnostou-9650a4297/', icon: Linkedin },
  { label: 'Instagram', href: 'https://www.instagram.com/mixalhs_anagnwstou_/', icon: Instagram },
]

export default function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-zinc-200/60">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-heading font-bold text-sm text-zinc-400">
          Mianagn<span className="text-accent">.</span>
        </span>

        <div className="flex items-center gap-4">
          {socials.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-zinc-400 hover:text-accent transition-colors duration-200"
            >
              <Icon size={15} />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <p className="font-body text-xs text-zinc-400">
            © {new Date().getFullYear()} Michael Anagnostou.
          </p>
          <a
            href="#"
            className="font-body text-xs text-zinc-400 hover:text-accent transition-colors duration-200 cursor-pointer"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
