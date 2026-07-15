import { useMemo, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Sidebar } from './components/Sidebar'
import { Navbar } from './components/Navbar'
import { Dashboard } from './pages/Dashboard'
import { Monitoring } from './pages/Monitoring'
import { Containers } from './pages/Containers'
import { Deployments } from './pages/Deployments'
import { Projects } from './pages/Projects'
import './App.css'

function AppContent() {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const currentPath = location.pathname

  const title = useMemo(() => {
    switch (currentPath) {
      case '/monitoring':
        return 'System Monitoring'
      case '/containers':
        return 'Docker Containers'
      case '/deployments':
        return 'Deployments'
      case '/projects':
        return 'Projects'
      case '/infrastructure':
        return 'Infrastructure'
      case '/settings':
        return 'Settings'
      default:
        return 'Overview Dashboard'
    }
  }, [currentPath])

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.16),_transparent_35%),linear-gradient(135deg,_#020617,_#0f172a)] text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col lg:flex-row">
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((value) => !value)} currentPath={currentPath} />

        <div className="flex-1">
          <Navbar title={title} />
          <main className="p-4 lg:p-6">
            <AnimatePresence mode="wait">
              <motion.div key={currentPath} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/monitoring" element={<Monitoring />} />
                  <Route path="/containers" element={<Containers />} />
                  <Route path="/deployments" element={<Deployments />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/infrastructure" element={<Projects />} />
                  <Route path="/settings" element={<Projects />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
