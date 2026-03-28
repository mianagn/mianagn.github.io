import React from 'react';
import { cn } from '../../lib/utils';
import { MenuToggleIcon } from './menu-toggle-icon';
import { useScroll } from './use-scroll';

const links = [
	{ label: 'About',      href: '#about' },
	{ label: 'Projects',   href: '#projects' },
	{ label: 'Services',     href: '#services' },
	{ label: 'Experience', href: '#experience' },
];

export function Header() {
	const [open, setOpen] = React.useState(false);
	const scrolled = useScroll(40);

	React.useEffect(() => {
		document.body.style.overflow = '';
		return () => { document.body.style.overflow = ''; };
	}, [open]);

	return (
		<header
			className={cn(
				'fixed top-0 left-0 right-0 z-50 mx-auto w-full max-w-6xl border-b border-transparent transition-all duration-300 ease-out md:rounded-xl md:border',
				scrolled && !open
					? 'md:top-3 bg-white/80 border-zinc-200/60 backdrop-blur-lg md:shadow-lg md:shadow-black/5'
					: 'bg-transparent border-transparent',
				open && 'bg-white border-zinc-200/60 shadow-lg shadow-black/5 rounded-b-2xl',
			)}
		>
			<nav className={cn(
				'flex h-16 w-full items-center justify-between px-6 transition-all duration-300',
				scrolled && 'md:h-13',
			)}>
				{/* Logo */}
				<a
					href="#"
					className="font-heading font-black text-lg tracking-tight text-zinc-950 hover:text-accent transition-colors duration-200"
				>
					Mianagn<span className="text-accent">.</span>
				</a>

				{/* Desktop links */}
				<div className="hidden items-center gap-1 md:flex">
					{links.map((link) => (
						<a
							key={link.href}
							href={link.href}
							className="font-body text-sm text-zinc-700 hover:text-zinc-950 px-4 py-2 rounded-lg hover:bg-zinc-100/60 transition-all duration-200"
						>
							{link.label}
						</a>
					))}
				</div>

				{/* Desktop CTA */}
				<a
					href="#contact"
					className="hidden md:inline-flex items-center gap-2 bg-accent text-zinc-950 font-body font-semibold text-sm px-5 py-2 rounded-full hover:bg-accent-light transition-colors duration-200 cursor-pointer"
				>
					Get in touch
				</a>

				{/* Mobile toggle */}
				<button
					onClick={() => setOpen(!open)}
					className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-zinc-300 text-zinc-600 hover:border-zinc-400 hover:text-zinc-900 transition-colors duration-200 cursor-pointer"
					aria-label="Toggle menu"
				>
					<MenuToggleIcon open={open} className="size-4" duration={300} />
				</button>
			</nav>

			{/* Mobile drawer */}
			<div
				className={cn(
					'overflow-hidden md:hidden transition-all duration-300 ease-out',
					open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none',
				)}
			>
				<div className="flex flex-col gap-1 p-4 pt-6">
					{links.map((link) => (
						<a
							key={link.label}
							href={link.href}
							onClick={() => setOpen(false)}
							className="font-body text-base text-zinc-700 hover:text-zinc-900 px-4 py-3 rounded-lg hover:bg-zinc-100/60 transition-all duration-200"
						>
							{link.label}
						</a>
					))}
					<a
						href="#contact"
						onClick={() => setOpen(false)}
						className="mt-4 inline-flex items-center justify-center bg-accent text-zinc-950 font-body font-semibold text-sm px-5 py-3 rounded-full hover:bg-accent-light transition-colors duration-200"
					>
						Get in touch
					</a>
				</div>
			</div>
		</header>
	);
}
