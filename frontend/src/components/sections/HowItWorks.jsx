import SectionHeading from '../ui/SectionHeading.jsx'
import { steps } from '../../data/content.js'

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-warmgray/40 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
        <SectionHeading
          eyebrow="How It Works"
          title="Simple steps. Better learning."
        />

        <div className="relative mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* connecting line — desktop only */}
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-edge lg:block" aria-hidden="true" />

          {steps.map((step) => (
            <div key={step.number} className="relative flex flex-col items-start gap-3">
              <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-edge bg-ivory font-display text-sm font-bold text-orange">
                {step.number}
              </span>
              <h3 className="font-display text-base font-bold text-charcoal">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
