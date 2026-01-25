import { useSupportDashboard } from '../../hooks/support/useSupportDashboard'

const SupportDashboardPage = () => {
  const { data } = useSupportDashboard()

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Soporte</p>
        <h2 className="text-2xl font-semibold text-slate-900">Dashboard de Soporte</h2>
        <p className="text-sm text-slate-600 max-w-2xl">
          Resumen operativo del centro de soporte con indicadores clave e incidencias recientes.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {data?.kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm"
          >
            <p className="text-xs text-slate-500">{kpi.label}</p>
            <p className="text-2xl font-semibold text-slate-900 mt-2">{kpi.value}</p>
            <p className="text-xs text-emerald-600 mt-3">{kpi.delta}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="text-sm font-semibold text-slate-900">Incidencias recientes</h3>
          <p className="text-xs text-slate-500">Monitoreo y seguimiento activo</p>
        </div>
        <div className="divide-y divide-slate-100">
          {data?.incidents.map((incident) => (
            <div key={incident.id} className="px-6 py-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">{incident.title}</p>
                <p className="text-xs text-slate-500">
                  {incident.id} · {incident.type} · {incident.createdAt}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                  {incident.owner}
                </span>
                <span
                  className={`text-xs px-2.5 py-1 rounded-full ${
                    incident.status === 'open'
                      ? 'bg-rose-50 text-rose-600'
                      : incident.status === 'investigating'
                      ? 'bg-amber-50 text-amber-700'
                      : 'bg-emerald-50 text-emerald-600'
                  }`}
                >
                  {incident.status === 'open'
                    ? 'Abierta'
                    : incident.status === 'investigating'
                    ? 'Investigando'
                    : 'Resuelta'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SupportDashboardPage
