export default function SectionHeading({ eyebrow, title, body, align = 'left' }) {
  const alignClass = align === 'center' ? 'text-center items-center mx-auto' : 'text-left items-start'
  return (
    <div className={`flex flex-col gap-4 max-w-2xl ${alignClass}`}>
      {eyebrow && (
        <span className="text-hero-eyebrow font-semibold uppercase tracking-widest text-orange">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold text-charcoal tracking-tight">{title}</h2>
      {body && <p className="text-base text-muted leading-relaxed">{body}</p>}
    </div>
  )
}
