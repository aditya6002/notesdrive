import SectionHeading from '../ui/SectionHeading.jsx'
import Button from '../ui/Button.jsx'
import { subjects } from '../../data/content.js'
import { ArrowRight } from 'lucide-react'

export default function SubjectGrid() {
  return (
    <section id="subjects" className="bg-ivory py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
        <SectionHeading
          eyebrow="Browse by Subject"
          title="Explore notes by your subjects"
        />

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {subjects.map(({ icon: Icon, label }) => (
            <button
              key={label}
              type="button"
              className="group flex flex-col items-center gap-3 rounded-xl border border-edge bg-white/60 px-4 py-6 text-center transition-all duration-200 hover:-translate-y-1 hover:border-orange/40 hover:shadow-card-hover"
            >
              <Icon size={22} strokeWidth={1.75} className="text-charcoal transition-colors group-hover:text-orange" />
              <span className="text-sm font-medium text-charcoal">{label}</span>
            </button>
          ))}
        </div>

        <div className="mt-8">
          <Button as="a" href="#subjects" variant="secondary">
            View All Subjects <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </section>
  )
}
