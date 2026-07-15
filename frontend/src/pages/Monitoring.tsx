import { motion } from 'framer-motion'
import { ArrowUpRight, CheckCircle2, Clock3, ShieldCheck } from 'lucide-react'

const endpoints = [
  { name: 'GET /api/status', status: '200', response: '28ms', availability: '99.98%' },
  { name: 'GET /api/health', status: '200', response: '19ms', availability: '100%' }
]

export function Monitoring() {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-cyan-400">API monitoring</p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-100">Service health matrix</h2>
          </div>
          <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">Healthy</div>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-800">
          <table className="min-w-full divide-y divide-slate-800 text-left text-sm">
            <thead className="bg-slate-950/70 text-slate-400">
              <tr>
                <th className="px-4 py-3 font-medium">Endpoint</th>
                <th className="px-4 py-3 font-medium">HTTP status</th>
                <th className="px-4 py-3 font-medium">Response time</th>
                <th className="px-4 py-3 font-medium">Availability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-900/60 text-slate-200">
              {endpoints.map((endpoint) => (
                <tr key={endpoint.name} className="transition hover:bg-slate-800/60">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={15} className="text-cyan-400" />
                      <span>{endpoint.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">{endpoint.status}</td>
                  <td className="px-4 py-4">{endpoint.response}</td>
                  <td className="px-4 py-4">{endpoint.availability}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-[24px] border border-slate-800 bg-slate-900/70 p-5">
          <div className="flex items-center gap-2 text-emerald-300">
            <CheckCircle2 size={16} />
            <span className="text-sm">Endpoint checks</span>
          </div>
          <p className="mt-3 text-3xl font-semibold text-slate-100">2/2</p>
          <p className="mt-2 text-sm text-slate-400">Health checks completed successfully</p>
        </div>
        <div className="rounded-[24px] border border-slate-800 bg-slate-900/70 p-5">
          <div className="flex items-center gap-2 text-cyan-300">
            <Clock3 size={16} />
            <span className="text-sm">Last check</span>
          </div>
          <p className="mt-3 text-3xl font-semibold text-slate-100">14s</p>
          <p className="mt-2 text-sm text-slate-400">Average interval between probes</p>
        </div>
        <div className="rounded-[24px] border border-slate-800 bg-slate-900/70 p-5">
          <div className="flex items-center gap-2 text-amber-300">
            <ArrowUpRight size={16} />
            <span className="text-sm">SLO</span>
          </div>
          <p className="mt-3 text-3xl font-semibold text-slate-100">99.99%</p>
          <p className="mt-2 text-sm text-slate-400">Target for uptime this quarter</p>
        </div>
      </div>
    </motion.div>
  )
}
