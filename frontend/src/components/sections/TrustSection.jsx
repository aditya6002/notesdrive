import { ShieldCheck } from 'lucide-react'
import { trustPoints } from '../../data/content.js'

export default function TrustSection() {
  return (
    <section className="bg-ivory pb-4 sm:pb-6">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
        <div className="rounded-2xl bg-darkcard px-6 py-10 sm:px-10 sm:py-12 lg:px-12">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4 lg:max-w-xs">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange text-white">
                <ShieldCheck size={20} />
              </span>
              <div>
                <h2 className="font-display text-2xl font-bold text-white">
                  Built on trust.
                  <br />
                  Reviewed for quality.
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  We take quality seriously. Reported notes are reviewed by administrators
                  to keep the platform useful, relevant and appropriate for everyone.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:gap-10">
              {trustPoints.map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex flex-col items-start gap-2">
                  <Icon size={18} className="text-orange" strokeWidth={2} />
                  <h3 className="text-sm font-semibold text-white">{title}</h3>
                  <p className="text-xs leading-relaxed text-white/50">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
