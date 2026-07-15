interface HealthIndicatorProps {
  label: string
  value: string
  tone: 'success' | 'warning' | 'info'
}

const toneClasses = {
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  info: 'bg-cyan-500'
}

export function HealthIndicator({ label, value, tone }: HealthIndicatorProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3 text-sm">
      <span className="text-slate-400">{label}</span>
      <div className="flex items-center gap-2 text-slate-100">
        <span className={`h-2.5 w-2.5 rounded-full ${toneClasses[tone]}`} />
        <span>{value}</span>
      </div>
    </div>
  )
}
