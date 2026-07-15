import type { LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'

interface StatusCardProps {
  title: string
  value: string
  detail: string
  icon: LucideIcon
  tone: 'success' | 'warning' | 'info'
}

const toneClasses = {
  success: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300',
  warning: 'border-amber-500/20 bg-amber-500/10 text-amber-300',
  info: 'border-cyan-500/20 bg-cyan-500/10 text-cyan-300'
}

export function StatusCard({ title, value, detail, icon: Icon, tone }: StatusCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-slate-400">{title}</p>
          <p className="mt-2 text-2xl font-semibold text-slate-100">{value}</p>
          <p className="mt-2 text-sm text-slate-500">{detail}</p>
        </div>
        <div className={`rounded-2xl border p-2 ${toneClasses[tone]}`}>
          <Icon size={18} />
        </div>
      </div>
    </motion.div>
  )
}
