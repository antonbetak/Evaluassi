import { BarChart3, Users } from 'lucide-react'

const SupportSessionsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Total de sesiones</p>
        <h2 className="text-2xl font-semibold text-gray-900">Sesiones activas</h2>
        <p className="text-sm text-gray-600 max-w-2xl">
          Indicadores de sesiones y distribución por canal para soporte en tiempo real.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: 'Sesiones activas', value: '128', icon: Users },
          { label: 'Sesiones promedio/día', value: '412', icon: BarChart3 },
          { label: 'SLA sesiones', value: '97%', icon: BarChart3 },
        ].map((item) => (
          <div key={item.label} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500">{item.label}</p>
                <p className="text-xl font-semibold text-gray-900 mt-1">{item.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SupportSessionsPage
