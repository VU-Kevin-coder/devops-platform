import { motion } from 'framer-motion'
import { Boxes, Cpu, HardDrive, Network, TimerReset } from 'lucide-react'

const containers = [
  {
    name: 'nginx-server',
    image: 'nginx:stable',
    status: 'Running',
    cpu: '18%',
    memory: '164MB',
    ports: '80:80',
    created: '2 days ago'
  },
  {
    name: 'devops-backend',
    image: 'devops-platform/backend:latest',
    status: 'Running',
    cpu: '27%',
    memory: '312MB',
    ports: '5000:5000',
    created: '1 day ago'
  }
]

export function Containers() {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-[24px] border border-slate-800 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-400">Container count</p>
          <p className="mt-3 text-3xl font-semibold text-slate-100">2</p>
        </div>
        <div className="rounded-[24px] border border-slate-800 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-400">Engine status</p>
          <p className="mt-3 text-3xl font-semibold text-slate-100">Healthy</p>
        </div>
        <div className="rounded-[24px] border border-slate-800 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-400">Image pull policy</p>
          <p className="mt-3 text-3xl font-semibold text-slate-100">Always</p>
        </div>
      </div>

      <div className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-cyan-400">Container inventory</p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-100">Runtime monitoring</h2>
          </div>
          <div className="rounded-full border border-slate-800 bg-slate-950/70 px-3 py-2 text-sm text-slate-300">Sorted by status</div>
        </div>

        <div className="mt-6 space-y-4">
          {containers.map((container) => (
            <div key={container.name} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Boxes size={16} className="text-cyan-400" />
                    <h3 className="text-lg font-semibold text-slate-100">{container.name}</h3>
                  </div>
                  <p className="mt-2 text-sm text-slate-400">Image: {container.image}</p>
                </div>
                <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300">{container.status}</div>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-4">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Cpu size={15} className="text-cyan-400" />
                    <span className="text-sm">CPU</span>
                  </div>
                  <p className="mt-2 text-lg font-semibold text-slate-100">{container.cpu}</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                  <div className="flex items-center gap-2 text-slate-400">
                    <HardDrive size={15} className="text-cyan-400" />
                    <span className="text-sm">Memory</span>
                  </div>
                  <p className="mt-2 text-lg font-semibold text-slate-100">{container.memory}</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Network size={15} className="text-cyan-400" />
                    <span className="text-sm">Ports</span>
                  </div>
                  <p className="mt-2 text-lg font-semibold text-slate-100">{container.ports}</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                  <div className="flex items-center gap-2 text-slate-400">
                    <TimerReset size={15} className="text-cyan-400" />
                    <span className="text-sm">Created</span>
                  </div>
                  <p className="mt-2 text-lg font-semibold text-slate-100">{container.created}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
