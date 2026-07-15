import { motion } from 'framer-motion'
import { CheckCircle2, GitBranch, Rocket } from 'lucide-react'

const timeline = [
  'Code pushed to GitHub',
  'Docker image built',
  'Container started',
  'Application available'
]

export function Deployments() {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-cyan-400">Deployment history</p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-100">Release timeline</h2>
          </div>
          <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">Deployment #1</div>
        </div>

        <div className="mt-6 space-y-4">
          {timeline.map((step, index) => (
            <div key={step} className="flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
              <div className="mt-0.5 rounded-full bg-emerald-500/10 p-2 text-emerald-300">
                {index === 0 ? <GitBranch size={16} /> : <CheckCircle2 size={16} />}
              </div>
              <div>
                <p className="font-medium text-slate-100">{step}</p>
                <p className="mt-1 text-sm text-slate-400">Completed successfully in the latest release cycle.</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-6">
        <div className="flex items-center gap-3 text-cyan-300">
          <Rocket size={18} />
          <p className="text-sm">CI/CD pipeline status</p>
        </div>
        <p className="mt-3 text-3xl font-semibold text-slate-100">Build and deploy ready</p>
        <p className="mt-2 text-sm text-slate-400">The platform is prepared for automated releases through GitHub Actions and container orchestration.</p>
      </div>
    </motion.div>
  )
}
