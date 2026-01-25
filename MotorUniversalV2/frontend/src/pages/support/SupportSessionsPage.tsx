const SupportSessionsPage = () => {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Soporte</p>
        <h2 className="text-2xl font-semibold text-slate-900">Sesiones</h2>
        <p className="text-sm text-slate-600">
          Monitoreo de sesiones activas, estado de evaluaciones y actividad relevante.
        </p>
      </div>

      <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-6">
        <p className="text-sm text-slate-600">
          Placeholder de sesiones. Se conectará con telemetría cuando esté disponible.
        </p>
      </div>
    </div>
  )
}

export default SupportSessionsPage
