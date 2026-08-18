import Button from '../ui/Button.jsx'
import NotebookStack from '../ui/NotebookStack.jsx'
import { heroPillars, heroFeatureCards } from '../../data/content.js'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-ivory">
      {/* Diagonal orange field — desktop/tablet */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-full bg-gradient-to-br from-orange to-orange-deep sm:block [clip-path:polygon(42%_0,100%_0,100%_100%,16%_100%)]"
      />
      {/* Diagonal orange field — mobile (steeper, sits behind stacked content) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-orange to-orange-deep sm:hidden [clip-path:polygon(0_62%,100%_46%,100%_100%,0_100%)]"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 pb-16 pt-14 sm:px-10 lg:grid-cols-2 lg:gap-6 lg:px-12 lg:pb-24 lg:pt-20">
        {/* Left: copy */}
        <div className="relative z-10 flex flex-col items-start justify-center">
          <span className="text-hero-eyebrow font-semibold uppercase tracking-widest text-orange">
            Hey, student.
          </span>
          <h1 className="mt-4 text-hero-h1 font-display font-bold text-charcoal lg:text-hero-h1-lg">
            Your Notes.
            <br />
            Your Campus.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">
            Find, share and discover academic notes with students from your college.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button as="a" href="#subjects" variant="primary">
              Explore Notes <ArrowRight size={16} />
            </Button>
            <Button as="a" href="#upload" variant="secondary">
              Upload Notes
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-8">
            {heroPillars.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-charcoal/70">
                <Icon size={18} strokeWidth={2} />
                <span className="text-xs font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: decorative wordmark + notebook composition */}
        <div className="relative z-10 flex items-center justify-center lg:justify-end">
          {/* Decorative diagonal wordmark — sits behind the mockups, low visual weight */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-2 top-4 select-none font-display text-4xl font-black uppercase leading-[0.95] text-ivory/70 mix-blend-overlay sm:text-5xl lg:-left-4 lg:text-6xl"
            style={{ transform: 'rotate(-14deg)' }}
          >
            Notes
            <br />
            Drive
            <br />
            Place
            <br />
            Home
          </div>

          <NotebookStack />
        </div>
      </div>

      {/* Feature cards — visually attached to the hero, not a separate grid */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-16 sm:px-10 lg:px-12 lg:pb-20">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {heroFeatureCards.map((card) => (
            <div
              key={card.title}
              className="group rounded-xl border border-edge bg-white/70 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-orange/40 hover:shadow-card-hover"
            >
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-orange text-white">
                <card.icon size={16} strokeWidth={2} />
              </div>
              <h3 className="font-display text-base font-bold text-charcoal">{card.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
