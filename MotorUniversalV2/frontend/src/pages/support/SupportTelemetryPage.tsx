const SupportTelemetryPage = () => {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Soporte</p>
        <h2 className="text-2xl font-semibold text-slate-900">Telemetría y logs</h2>
        <p className="text-sm text-slate-600">
          Panel para eventos críticos, alertas y trazas operativas del sistema.
        </p>
      </div>

      <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-6">
        <p className="text-sm text-slate-600">
          Placeholder de telemetría. Se conectará con servicios de logs.
        </p>
      </div>
    </div>
  )
}

export default SupportTelemetryPage
