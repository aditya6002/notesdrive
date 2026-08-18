import Button from '../ui/Button.jsx'
import { ArrowRight, Coffee } from 'lucide-react'

export default function FinalCTA() {
  return (
    <section className="bg-ivory py-6 sm:py-8">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-8 overflow-hidden rounded-2xl border border-edge bg-warmgray/40 sm:grid-cols-[220px_1fr]">
          <div className="flex h-full items-center justify-center bg-charcoal/90 p-10 sm:h-full">
            <Coffee size={64} strokeWidth={1} className="text-orange" aria-hidden="true" />
          </div>
          <div className="flex flex-col items-start gap-6 p-8 sm:p-10">
            <h2 className="font-display text-2xl font-bold text-charcoal sm:text-3xl">
              Your next exam starts with better notes.
            </h2>
            <div className="flex flex-wrap gap-3">
              <Button as="a" href="#subjects" variant="primary">
                Explore Notes <ArrowRight size={16} />
              </Button>
              <Button as="a" href="#upload" variant="secondary">
                Upload Notes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
