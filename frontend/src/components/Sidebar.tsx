import { motion } from 'framer-motion'
import {
  Activity,
  Boxes,
  Cpu,
  LayoutDashboard,
  Monitor,
  Rocket,
  ServerCog,
  Settings,
  ShieldCheck,
  Workflow
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface NavItem {
  label: string
  path: string
  icon: LucideIcon
}

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
  currentPath: string
}

const navItems: NavItem[] = [
  { label: 'Overview', path: '/', icon: LayoutDashboard },
  { label: 'System Monitoring', path: '/monitoring', icon: Monitor },
  { label: 'Docker Containers', path: '/containers', icon: Boxes },
  { label: 'API Health', path: '/monitoring', icon: ShieldCheck },
  { label: 'Deployments', path: '/deployments', icon: Rocket },
  { label: 'Projects', path: '/projects', icon: Workflow },
  { label: 'Infrastructure', path: '/infrastructure', icon: ServerCog },
  { label: 'Settings', path: '/settings', icon: Settings }
]

export function Sidebar({ collapsed, onToggle, currentPath }: SidebarProps) {
  const isActive = (path: string) => currentPath === path || (path === '/' && currentPath === '/')

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 92 : 256 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className="hidden border-r border-slate-800/70 bg-slate-950/80 backdrop-blur-xl lg:flex lg:flex-col"
    >
      <div className="flex items-center justify-between border-b border-slate-800/70 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-300">
            <Cpu size={18} />
          </div>
          {!collapsed && (
            <div>
              <p className="text-sm font-semibold text-slate-100">Ops Console</p>
              <p className="text-xs text-slate-400">DevOps Lab</p>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={onToggle}
          className="rounded-full border border-slate-800 bg-slate-900/80 p-2 text-slate-300 transition hover:border-cyan-500/40 hover:text-cyan-300"
        >
          <Activity size={16} />
        </button>
      </div>

      <nav className="flex-1 space-y-2 px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.path)

          return (
            <motion.a
              key={item.label}
              href={item.path}
              whileHover={{ x: 2, scale: 1.01 }}
              className={`flex items-center gap-3 rounded-2xl px-3 py-3 text-sm transition ${
                active
                  ? 'bg-cyan-500/15 text-cyan-300 shadow-[0_0_0_1px_rgba(34,211,238,0.2)]'
                  : 'text-slate-400 hover:bg-slate-900/80 hover:text-slate-100'
              }`}
            >
              <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${active ? 'bg-cyan-500/15' : 'bg-slate-900/80'}`}>
                <Icon size={16} />
              </div>
              {!collapsed && <span className="font-medium">{item.label}</span>}
            </motion.a>
          )
        })}
      </nav>
    </motion.aside>
  )
}
