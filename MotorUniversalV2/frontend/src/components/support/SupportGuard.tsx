import { Outlet, useLocation } from 'react-router-dom'
import { ShieldAlert } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'

const SupportGuard = () => {
  const { user } = useAuthStore()
  const location = useLocation()
  const devSupportEnabled = import.meta.env.VITE_DEV_SUPPORT_LOGIN === 'true'

  console.log('[DEV SUPPORT LOGIN]', import.meta.env.VITE_DEV_SUPPORT_LOGIN)

  if (devSupportEnabled && location.pathname.startsWith('/support')) {
    return <Outlet />
  }

  if (user?.role !== 'support') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-16">
        <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl shadow-sm p-8 text-center">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-rose-50 flex items-center justify-center mb-4">
            <ShieldAlert className="w-7 h-7 text-rose-500" />
          </div>
          <h1 className="text-2xl font-semibold text-slate-900 mb-2">No autorizado</h1>
          <p className="text-sm text-slate-600">
            Esta sección está reservada para el equipo de soporte.
          </p>
        </div>
      </div>
    )
  }

  return <Outlet />
}

export default SupportGuard
