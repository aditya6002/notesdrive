
import { footerLinks } from '../../data/content.js'

export default function Footer() {
  return (
    
    <footer className="border-t border-edge/60 bg-ivory">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-12">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <p className="font-display text-lg font-bold text-charcoal">
              Notes<span className="text-orange">Drive</span>
            </p>
            <p className="mt-3 max-w-[220px] text-sm leading-relaxed text-muted">
              A student notes sharing platform built for college students, by students.
            </p>
            <div className="mt-5 flex items-center gap-4 text-charcoal/60">
              
            </div>
          </div>

          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <p className="text-sm font-semibold text-charcoal">{heading}</p>
              <ul className="mt-4 flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted hover:text-orange">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-edge/60 pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} NotesDrive. All rights reserved.</p>
        </div>
      </div>
    </footer>
    
  )
}
