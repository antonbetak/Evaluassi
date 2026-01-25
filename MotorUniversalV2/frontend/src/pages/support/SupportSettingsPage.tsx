const SupportSettingsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Soporte</p>
        <h2 className="text-2xl font-semibold text-slate-900">Configuración</h2>
        <p className="text-sm text-slate-600">
          Ajustes del módulo de soporte (solo UI).
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-900">Notificaciones críticas</p>
            <p className="text-xs text-slate-500">Recibir alertas de incidentes</p>
          </div>
          <input type="checkbox" className="h-4 w-4" defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-900">Actualización automática</p>
            <p className="text-xs text-slate-500">Refrescar datos cada 5 minutos</p>
          </div>
          <input type="checkbox" className="h-4 w-4" />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500">Canal de escalamiento</label>
          <input
            className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            placeholder="soporte@evaluaasi.com"
          />
        </div>
      </div>
    </div>
  )
}

export default SupportSettingsPage
