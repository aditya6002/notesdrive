import SectionHeading from '../ui/SectionHeading.jsx'
import { capabilities } from '../../data/content.js'

export default function Features() {
  return (
    <section id="features" className="bg-ivory py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
        <SectionHeading
          eyebrow="Features"
          title="Everything you need to succeed"
          body="NotesDrive makes note sharing simple, helpful and meaningful."
        />

        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex flex-col items-start gap-3">
              <Icon size={22} strokeWidth={1.75} className="text-orange" />
              <h3 className="font-display text-lg font-bold text-charcoal">{title}</h3>
              <p className="text-sm leading-relaxed text-muted">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
