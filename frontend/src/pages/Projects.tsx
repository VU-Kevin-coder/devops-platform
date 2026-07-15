import { motion } from 'framer-motion'
import { GitBranch, Layers3, ServerCog } from 'lucide-react'

const technologies = ['Docker', 'Node.js', 'Express', 'React', 'Linux', 'GitHub Actions']

export function Projects() {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-6">
        <div className="flex items-center gap-3 text-cyan-300">
          <Layers3 size={18} />
          <p className="text-sm">Portfolio highlight</p>
        </div>
        <h2 className="mt-3 text-2xl font-semibold text-slate-100">DevOps Platform</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
          A personal engineering portfolio project that combines Dockerized services, Linux-based infrastructure, a Node.js backend, a React dashboard, and modern CI/CD practices into one polished monitoring experience.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
            <div className="flex items-center gap-2 text-slate-200">
              <ServerCog size={16} className="text-cyan-400" />
              <span className="font-medium">Infrastructure scope</span>
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-400">Linux administration, monitoring, containerization, and service observability are all represented in the experience.</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
            <div className="flex items-center gap-2 text-slate-200">
              <GitBranch size={16} className="text-cyan-400" />
              <span className="font-medium">Delivery approach</span>
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-400">The stack is structured for clarity, growth, and recruiter-friendly storytelling around modern DevOps practices.</p>
          </div>
        </div>
      </div>

      <div className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-6">
        <p className="text-sm text-cyan-400">Technology stack</p>
        <div className="mt-4 flex flex-wrap gap-3">
          {technologies.map((tech) => (
            <span key={tech} className="rounded-full border border-slate-800 bg-slate-950/70 px-3 py-2 text-sm text-slate-300">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
