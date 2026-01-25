import { BadgeCheck, ShieldCheck, UserCircle2 } from 'lucide-react'

const SupportDashboardPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Dashboard</p>
        <h2 className="text-2xl font-semibold text-gray-900">Bienvenido</h2>
        <p className="text-sm text-gray-600 max-w-2xl">
          Vista general de tu perfil de soporte y estado operativo.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center">
              <UserCircle2 className="h-7 w-7" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Grupo Edut</p>
              <h3 className="text-xl font-semibold text-gray-900">Juan Salvador López Luna</h3>
              <p className="text-xs text-gray-500">Soporte · Z00015SO000002</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
              <BadgeCheck className="h-3.5 w-3.5" />
              Disponible
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-600">
              <ShieldCheck className="h-3.5 w-3.5" />
              Nivel 2
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: 'Tickets abiertos', value: '14', tone: 'bg-rose-50 text-rose-600' },
          { label: 'En seguimiento', value: '8', tone: 'bg-amber-50 text-amber-700' },
          { label: 'SLA hoy', value: '96%', tone: 'bg-emerald-50 text-emerald-600' },
        ].map((item) => (
          <div key={item.label} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <p className="text-xs text-gray-500">{item.label}</p>
            <p className="text-3xl font-semibold text-gray-900 mt-3">{item.value}</p>
            <span className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${item.tone}`}>
              Actualizado
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SupportDashboardPage
