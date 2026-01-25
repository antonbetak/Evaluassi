import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { MessageCircle, Radio, Settings, Ticket, Users, LayoutDashboard } from 'lucide-react'
import Layout from '../layout/Layout'
import { isSupportPreviewEnabled } from '../../support/supportPreview'

const navItems = [
  { path: 'dashboard', label: 'Inicio', icon: LayoutDashboard },
  { path: 'tickets', label: 'Tickets', icon: Ticket },
  { path: 'users', label: 'Usuarios', icon: Users },
  { path: 'communication', label: 'Comunicación', icon: MessageCircle },
  { path: 'telemetry', label: 'Telemetría', icon: Radio },
  { path: 'settings', label: 'Configuración', icon: Settings },
]

const SupportLayout = () => {
  const previewEnabled = isSupportPreviewEnabled()
  const location = useLocation()
  const basePath = location.pathname.startsWith('/dev/support') ? '/dev/support' : '/support'

  return (
    <Layout>
      <div className="space-y-6 lg:space-y-8 animate-fade-in-up">
        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Soporte</p>
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mt-1">
                Centro de soporte Evaluassi
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-2xl">
                Panel operativo para gestionar tickets, usuarios y comunicación del ecosistema.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {previewEnabled && (
                <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                  DEV PREVIEW
                </span>
              )}
              <button className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-700">
                Nuevo ticket
              </button>
              <button className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50">
                Exportar reporte
              </button>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {navItems.map(({ path, label, icon: Icon }) => (
              <NavLink
                key={path}
                to={`${basePath}/${path}`}
                className={({ isActive }) =>
                  `inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
          <div className="min-w-0">
            <Outlet />
          </div>
          <aside className="hidden xl:flex xl:flex-col gap-4">
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Acciones rápidas</p>
              <h3 className="text-lg font-semibold text-gray-900 mt-2">Atajos operativos</h3>
              <div className="mt-4 space-y-3 text-sm text-gray-600">
                <button className="w-full rounded-xl border border-gray-200 px-4 py-3 text-left font-medium text-gray-700 hover:bg-gray-50 transition">
                  Revisar cola de SLA crítico
                </button>
                <button className="w-full rounded-xl border border-gray-200 px-4 py-3 text-left font-medium text-gray-700 hover:bg-gray-50 transition">
                  Enviar comunicado masivo
                </button>
                <button className="w-full rounded-xl border border-gray-200 px-4 py-3 text-left font-medium text-gray-700 hover:bg-gray-50 transition">
                  Ver telemetría del día
                </button>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary-600 to-indigo-600 text-white rounded-2xl p-5 shadow-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-white/70">SLA</p>
              <h3 className="text-lg font-semibold mt-2">Cumplimiento semanal</h3>
              <p className="text-3xl font-bold mt-3">94.6%</p>
              <p className="text-sm text-white/80 mt-1">+1.2% vs semana anterior</p>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  )
}

export default SupportLayout
