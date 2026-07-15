import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Activity, Container, Gauge, HardDrive, Network, Server, TimerReset } from 'lucide-react'
import { StatusCard } from '../components/StatusCard'
import { MetricCard } from '../components/MetricCard'
import { HealthIndicator } from '../components/HealthIndicator'
import { fetchHealth, fetchStatus } from '../services/api'

export function Dashboard() {
  const [apiStatus, setApiStatus] = useState<string>('Loading...')
  const [healthData, setHealthData] = useState<{
    status?: string
    uptime?: number
    environment?: string
    timestamp?: string
  } | null>(null)
  const [statusData, setStatusData] = useState<{
    status?: string
    service?: string
    version?: string
  } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      const [statusResult, healthResult] = await Promise.all([fetchStatus(), fetchHealth()])
      setStatusData(statusResult.data)
      setHealthData(healthResult.data)
      setApiStatus(statusResult.error || healthResult.error || 'Online')
      setLoading(false)
    }

    loadData()
  }, [])

  const uptimeHours = healthData?.uptime ? Math.floor(healthData.uptime / 3600) : 72

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="grid gap-4 xl:grid-cols-[1.35fr_0.65fr]">
        <div className="rounded-[28px] border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/60 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm text-cyan-400">Live infrastructure</p>
              <h2 className="mt-1 text-2xl font-semibold text-slate-100">Platform health overview</h2>
            </div>
            <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">
              {loading ? 'Refreshing data' : 'All systems green'}
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <StatusCard title="System status" value={statusData?.status ?? 'online'} icon={Activity} detail="Core services responding" tone="success" />
            <StatusCard title="API gateway" value={apiStatus} icon={Server} detail="Connected to backend" tone="info" />
            <StatusCard title="Uptime" value={`${uptimeHours}h`} icon={TimerReset} detail="Since last reboot" tone="warning" />
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-6">
          <p className="text-sm text-slate-400">Observability snapshot</p>
          <div className="mt-4 space-y-3">
            <HealthIndicator label="API status" value={statusData?.status ?? 'online'} tone="success" />
            <HealthIndicator label="Docker engine" value="Healthy" tone="success" />
            <HealthIndicator label="CI pipeline" value="Passing" tone="info" />
            <HealthIndicator label="Disk pressure" value="Nominal" tone="warning" />
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="CPU Usage" value="47%" subtitle="Average load across host" progress={47} accent="from-cyan-500 to-sky-400" />
        <MetricCard title="Memory Usage" value="63%" subtitle="12.8 GB / 20 GB RAM" progress={63} accent="from-violet-500 to-fuchsia-500" />
        <MetricCard title="Storage" value="74%" subtitle="Disk utilization on /dev/sda1" progress={74} accent="from-emerald-500 to-lime-500" />
        <MetricCard title="Network" value="1.2 Gb/s" subtitle="Incoming 840 Mb/s • Outgoing 360 Mb/s" progress={68} accent="from-amber-500 to-orange-500" />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Host details</p>
              <h3 className="mt-1 text-xl font-semibold text-slate-100">System status</h3>
            </div>
            <div className="rounded-full border border-slate-800 bg-slate-950/70 p-2 text-slate-400">
              <Gauge size={16} />
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
              <div className="flex items-center gap-3 text-slate-300">
                <Server size={16} className="text-cyan-400" />
                <span className="text-sm">Server uptime</span>
              </div>
              <p className="mt-3 text-2xl font-semibold text-slate-100">{uptimeHours}h 14m</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
              <div className="flex items-center gap-3 text-slate-300">
                <HardDrive size={16} className="text-cyan-400" />
                <span className="text-sm">OS</span>
              </div>
              <p className="mt-3 text-2xl font-semibold text-slate-100">Kali Linux 2025</p>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Container health</p>
              <h3 className="mt-1 text-xl font-semibold text-slate-100">Docker overview</h3>
            </div>
            <div className="rounded-full border border-slate-800 bg-slate-950/70 p-2 text-slate-400">
              <Container size={16} />
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-4">
              <div>
                <p className="font-medium text-slate-100">Running containers</p>
                <p className="text-sm text-slate-400">nginx-server • devops-backend</p>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300">2 active</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-4">
              <div>
                <p className="font-medium text-slate-100">Network traffic</p>
                <p className="text-sm text-slate-400">Stable inbound and outbound flow</p>
              </div>
              <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300">
                <Network size={14} className="inline" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
