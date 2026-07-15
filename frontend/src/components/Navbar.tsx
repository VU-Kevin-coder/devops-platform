import { Bell, ChevronRight, MonitorDot, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'

interface NavbarProps {
  title: string
}

export function Navbar({ title }: NavbarProps) {
  return (
    <header className="border-b border-slate-800/70 bg-slate-950/70 px-4 py-3 backdrop-blur-xl lg:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">Operations Center</p>
          <h1 className="text-xl font-semibold text-slate-100">{title}</h1>
        </div>

        <div className="flex items-center gap-3">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300"
          >
            <MonitorDot size={14} />
            <span>Online</span>
          </motion.div>

          <div className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-3 py-2 text-sm text-slate-300">
            <ShieldCheck size={14} className="text-cyan-400" />
            <span>Kali Linux Development Server</span>
          </div>

          <button className="rounded-full border border-slate-800 bg-slate-900/80 p-2 text-slate-300 transition hover:border-cyan-500/40 hover:text-cyan-300">
            <Bell size={16} />
          </button>

          <div className="flex items-center gap-3 rounded-full border border-slate-800 bg-slate-900/80 px-3 py-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500/15 font-semibold text-cyan-300">
              JD
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-slate-100">Jordan Doe</p>
              <p className="text-xs text-slate-400">Platform Engineer</p>
            </div>
            <ChevronRight size={16} className="text-slate-500" />
          </div>
        </div>
      </div>
    </header>
  )
}
