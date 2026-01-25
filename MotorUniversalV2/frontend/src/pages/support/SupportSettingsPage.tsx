const SupportSettingsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Configuración</p>
        <h2 className="text-2xl font-semibold text-gray-900">Preferencias del módulo</h2>
        <p className="text-sm text-gray-600">Ajustes de alertas y canales internos.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-900">Notificaciones críticas</p>
            <p className="text-xs text-gray-500">Recibir alertas de incidentes</p>
          </div>
          <input type="checkbox" className="h-4 w-4" defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-900">Actualización automática</p>
            <p className="text-xs text-gray-500">Refrescar datos cada 5 minutos</p>
          </div>
          <input type="checkbox" className="h-4 w-4" />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500">Canal de escalamiento</label>
          <input
            className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm"
            placeholder="soporte@evaluaasi.com"
          />
        </div>
      </div>
    </div>
  )
}

export default SupportSettingsPage
