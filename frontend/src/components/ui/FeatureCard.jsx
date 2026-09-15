export default function FeatureCard({ icon, title, body, variant = 'default' }) {
  const isCompact = variant === 'compact'
  const Icon = icon
  return (
    <div
      className={`group rounded-xl border border-edge bg-white/60 transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover hover:border-orange/40 ${
        isCompact ? 'p-5' : 'p-6'
      }`}
    >
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-orange/10 text-orange transition-colors group-hover:bg-orange group-hover:text-white">
        <Icon size={18} strokeWidth={2} />
      </div>
      <h3 className={`font-display font-bold text-charcoal ${isCompact ? 'text-lg' : 'text-xl'}`}>
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
    </div>
  )
}
