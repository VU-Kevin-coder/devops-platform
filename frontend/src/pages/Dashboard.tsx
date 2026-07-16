import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Activity, Container, Gauge, HardDrive, Network, RefreshCcw, Server, TimerReset } from 'lucide-react'
import { StatusCard } from '../components/StatusCard'
import { MetricCard } from '../components/MetricCard'
import { HealthIndicator } from '../components/HealthIndicator'
import { fetchHealth } from '../services/health.service'
import { fetchStatus } from '../services/status.service'

interface HealthData {
  status?: string
  uptime?: number
  environment?: string
  timestamp?: string
}

interface StatusData {
  status?: string
  service?: string
  version?: string
}

export function Dashboard() {
  const [apiStatus, setApiStatus] = useState<string>('Loading...')
  const [healthData, setHealthData] = useState<HealthData | null>(null)
  const [statusData, setStatusData] = useState<StatusData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  async function loadData() {
    setLoading(true)
    setError(null)

    const [statusResult, healthResult] = await Promise.all([fetchStatus(), fetchHealth()])

    setStatusData(statusResult.data)
    setHealthData(healthResult.data)

    if (statusResult.error && healthResult.error) {
      setError(`${statusResult.error} • ${healthResult.error}`)
      setApiStatus('Unavailable')
    } else if (statusResult.error) {
      setError(statusResult.error)
      setApiStatus('Unavailable')
    } else if (healthResult.error) {
      setError(healthResult.error)
      setApiStatus('Unavailable')
    } else {
      setApiStatus(statusResult.data?.status ?? 'online')
    }

    setLoading(false)
  }

  useEffect(() => {
    void loadData()
  }, [])

  const uptimeHours = healthData?.uptime ? Math.floor(healthData.uptime / 3600) : 72
  const systemStatus = statusData?.status ?? 'online'
  const environment = healthData?.environment ?? 'development'

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="grid gap-4 xl:grid-cols-[1.35fr_0.65fr]">
        <div className="rounded-[28px] border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/60 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm text-cyan-400">Live infrastructure</p>
              <h2 className="mt-1 text-2xl font-semibold text-slate-100">Platform health overview</h2>
            </div>
            <button
              type="button"
              onClick={() => void loadData()}
              className="flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-2 text-sm text-cyan-300"
            >
              <RefreshCcw size={14} />
              {loading ? 'Refreshing data' : 'Retry sync'}
            </button>
          </div>

          {error ? (
            <div className="mt-4 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-3 text-sm text-amber-300">
              {error}
            </div>
          ) : null}

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <StatusCard title="System status" value={systemStatus} icon={Activity} detail="Core services responding" tone={error ? 'warning' : 'success'} />
            <StatusCard title="API gateway" value={apiStatus} icon={Server} detail="Connected to backend" tone={error ? 'warning' : 'info'} />
            <StatusCard title="Uptime" value={`${uptimeHours}h`} icon={TimerReset} detail="Since last reboot" tone="warning" />
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-800 bg-slate-900/70 p-6">
          <p className="text-sm text-slate-400">Observability snapshot</p>
          <div className="mt-4 space-y-3">
            <HealthIndicator label="API status" value={loading ? 'Loading...' : systemStatus} tone={error ? 'warning' : 'success'} />
            <HealthIndicator label="Environment" value={environment} tone="info" />
            <HealthIndicator label="Docker engine" value="Healthy" tone="success" />
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
