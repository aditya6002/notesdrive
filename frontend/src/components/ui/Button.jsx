const VARIANTS = {
  primary:
    'bg-orange text-white hover:bg-orange-deep active:bg-orange-deep active:scale-[0.98] shadow-card hover:shadow-card-hover',
  secondary:
    'bg-transparent text-charcoal border border-edge hover:border-charcoal active:scale-[0.98]',
  dark:
    'bg-charcoal text-white hover:bg-black active:scale-[0.98]',
}

export default function Button({
  children,
  variant = 'primary',
  as = 'button',
  className = '',
  disabled = false,
  ...props
}) {
  const Comp = as
  return (
    <Comp
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-medium font-body transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none ${VARIANTS[variant]} ${className}`}
      disabled={as === 'button' ? disabled : undefined}
      aria-disabled={disabled || undefined}
      {...props}
    >
      {children}
    </Comp>
  )
}
