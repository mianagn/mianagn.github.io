export default function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-zinc-200/60">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-heading font-bold text-sm text-zinc-400">
          Mianagn<span className="text-accent">.</span>
        </span>
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
    </footer>
  )
}
