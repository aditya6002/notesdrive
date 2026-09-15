import { PenLine } from 'lucide-react'

/**
 * Floating notebook mockup composition — the signature visual element.
 * Reproduces the "NOTES.JPG" (back, rotated left) + "BOOKS.PSD" (front, rotated right)
 * layered card treatment from the Figma reference, with a pen laid across the seam.
 * Built as styled divs with a hand-drawn palm-leaf motif so the composition works
 * without external image assets — swap the SVG motifs for real cover art later.
 */
export default function NotebookStack() {
  return (
    <div className="relative h-[280px] w-full max-w-[360px] sm:h-[340px] sm:max-w-[420px] mx-auto lg:mx-0">
      {/* Back card — NOTES.JPG */}
      <div
        className="absolute left-0 top-4 h-[220px] w-[160px] rotate-[-8deg] rounded-md bg-darkcard shadow-notebook sm:h-[260px] sm:w-[190px] animate-float-slow"
        style={{ '--tw-rotate': '-8deg' }}
      >
        <div className="flex h-full flex-col justify-between p-4 text-white">
          <div>
            <p className="font-display text-sm font-bold leading-tight">NOTES<span className="text-orange">.JPG</span></p>
            <p className="mt-1 text-[10px] text-white/50">Semester 4</p>
            <p className="text-[10px] text-white/50">Data Structures</p>
          </div>
          <LeafMotif className="opacity-70" />
          <div>
            <p className="text-[9px] leading-snug text-white/40">
              Notes shared by students, for students.
            </p>
          </div>
        </div>
      </div>

      {/* Front card — BOOKS.PSD */}
      <div
        className="absolute right-0 top-0 h-[200px] w-[150px] rotate-[6deg] rounded-md bg-darkcard shadow-notebook sm:h-[230px] sm:w-[175px] animate-float"
        style={{ '--tw-rotate': '6deg' }}
      >
        <div className="flex h-full flex-col justify-between p-4 text-white">
          <div>
            <p className="font-display text-sm font-bold leading-tight">BOOKS<span className="text-orange">.PSD</span></p>
            <p className="mt-1 text-[10px] text-white/50">Operating Systems</p>
          </div>
          <div className="flex items-center gap-1 self-end text-white/60">
            <PenLine size={14} className="rotate-90" />
          </div>
        </div>
      </div>

      {/* Brand chip riding the seam between the two cards */}
      <div className="absolute bottom-6 right-8 rounded-full bg-orange px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-card sm:bottom-10 sm:right-10">
        NotesDrive
      </div>
    </div>
  )
}

function LeafMotif({ className = '' }) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={`h-14 w-14 stroke-white/30 ${className}`}
      fill="none"
      strokeWidth="1"
    >
      <path d="M40 70 C40 50 40 30 40 10" />
      <path d="M40 20 C32 24 26 30 24 38" />
      <path d="M40 30 C48 34 54 40 56 48" />
      <path d="M40 40 C31 43 25 50 22 58" />
      <path d="M40 50 C49 53 55 60 58 68" />
    </svg>
  )
}
