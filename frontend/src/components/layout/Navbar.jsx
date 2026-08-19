import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Button from '../ui/Button.jsx'

const NAV_LINKS = [
  { label: 'Explore', href: '#subjects' },
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="relative z-30 border-b border-edge/60 bg-ivory">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-10 lg:px-12">
        <a href="#top" className="font-display text-xl font-bold tracking-tight text-charcoal">
          Notes<span className="text-orange">Drive</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-charcoal/80 transition-colors hover:text-orange"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button as="a" href="#login" variant="secondary">
            Login
          </Button>
          <Button as="a" href="#get-started" variant="primary">
            Get Started
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-charcoal md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle navigation menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-edge/60 bg-ivory px-6 pb-6 pt-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-charcoal/80 hover:text-orange"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-5 flex flex-col gap-3">
            <Button as="a" href="#login" variant="secondary" className="w-full">
              Login
            </Button>
            <Button as="a" href="#get-started" variant="primary" className="w-full">
              Get Started
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
