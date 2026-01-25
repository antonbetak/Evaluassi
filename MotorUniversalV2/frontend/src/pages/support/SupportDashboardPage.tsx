const SupportDashboardPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Soporte</p>
        <h2 className="text-2xl font-semibold text-slate-900">Dashboard de Soporte</h2>
        <p className="text-sm text-slate-600 max-w-2xl">
          Vista general del módulo de soporte. Aquí se consolidarán los indicadores
          operativos, solicitudes activas y acciones rápidas.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {[
          { title: 'Casos abiertos', value: '—', helper: 'Pendiente de integración' },
          { title: 'Sesiones monitoreadas', value: '—', helper: 'Pendiente de integración' },
          { title: 'Vouchers liberados', value: '—', helper: 'Pendiente de integración' },
        ].map((card) => (
          <div
            key={card.title}
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm"
          >
            <p className="text-xs text-slate-500">{card.title}</p>
            <p className="text-2xl font-semibold text-slate-900 mt-2">{card.value}</p>
            <p className="text-xs text-slate-400 mt-3">{card.helper}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-6">
        <p className="text-sm text-slate-600">
          Panel en construcción. Conecta este dashboard a los servicios de soporte cuando
          el backend esté listo.
        </p>
      </div>
    </div>
  )
}

export default SupportDashboardPage
