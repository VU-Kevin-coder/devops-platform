import { motion } from 'framer-motion'

interface MetricCardProps {
  title: string
  value: string
  subtitle: string
  progress?: number
  accent?: string
}

export function MetricCard({ title, value, subtitle, progress = 0, accent = 'from-cyan-500 to-blue-500' }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">{title}</p>
          <p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p>
        </div>
        <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${accent}`} />
      </div>
      <div className="mt-4 h-2 rounded-full bg-slate-800">
        <div className={`h-2 rounded-full bg-gradient-to-r ${accent}`} style={{ width: `${Math.min(progress, 100)}%` }} />
      </div>
      <p className="mt-3 text-sm text-slate-500">{subtitle}</p>
    </motion.div>
  )
}
