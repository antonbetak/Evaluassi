import { NavLink, Outlet } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import {
  LayoutDashboard,
  Users,
  Activity,
  Ticket,
  Radio,
  LifeBuoy,
  Award,
  Settings,
} from 'lucide-react'

const navItems = [
  { to: '/support/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/support/users', label: 'Usuarios', icon: Users },
  { to: '/support/tickets', label: 'Tickets', icon: Activity },
  { to: '/support/certificates', label: 'Certificados', icon: Award },
  { to: '/support/vouchers', label: 'Vouchers', icon: Ticket },
  { to: '/support/telemetry', label: 'Telemetría', icon: Radio },
  { to: '/support/settings', label: 'Configuración', icon: Settings },
]

const SupportLayout = () => {
  const { user } = useAuthStore()

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="hidden lg:flex lg:flex-col w-72 bg-white border-r border-slate-200 px-6 py-8">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-primary-600 text-white flex items-center justify-center">
            <LifeBuoy className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Soporte Evaluassi</p>
            <p className="text-xs text-slate-500">Centro de ayuda interno</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`
              }
            >
              <Icon className="w-4 h-4" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="pt-6 border-t border-slate-200">
          <p className="text-xs text-slate-500">Sesión activa</p>
          <p className="text-sm font-semibold text-slate-900">{user?.full_name ?? 'Soporte'}</p>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-emerald-50 text-emerald-600 mt-2">
            Rol Soporte
          </span>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-slate-200 px-6 lg:px-10 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-400">Evaluassi</p>
            <h1 className="text-lg font-semibold text-slate-900">Módulo Soporte</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-sm text-slate-500">Acceso interno</span>
            <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-xs font-semibold text-slate-600">
              {user?.name?.[0]?.toUpperCase() ?? 'S'}
            </div>
          </div>
        </header>

        <main className="flex-1 px-6 lg:px-10 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default SupportLayout
