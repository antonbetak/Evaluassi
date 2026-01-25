import { useState } from 'react'
import { Activity, CheckCircle2, AlertTriangle } from 'lucide-react'
import { useSupportTelemetry } from '../../hooks/support/useSupportTelemetry'
import api from '../../services/api'
import { isSupportPreviewEnabled } from '../../support/supportPreview'

const SupportTelemetryPage = () => {
  const { data } = useSupportTelemetry()
  const [pingStatus, setPingStatus] = useState<string | null>(null)
  const [pingLoading, setPingLoading] = useState(false)
  const previewEnabled = isSupportPreviewEnabled()

  const handlePing = async () => {
    if (previewEnabled) {
      setPingStatus('Preview activo: no se ejecutó ping real')
      return
    }
    setPingLoading(true)
    try {
      const response = await api.get('/warmup')
      setPingStatus(`Warmup OK (${response.status})`)
    } catch (error) {
      setPingStatus('Warmup falló')
    } finally {
      setPingLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Telemetría</p>
        <h2 className="text-2xl font-semibold text-gray-900">Monitoreo y logs</h2>
        <p className="text-sm text-gray-600 max-w-2xl">
          Observa latencia, estado de warmup y eventos críticos del backend.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <p className="text-xs text-gray-500">Latencia API</p>
          <p className="text-3xl font-semibold text-gray-900 mt-2">{data?.latencyMs} ms</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <p className="text-xs text-gray-500">Warmup status</p>
          <p className="text-3xl font-semibold text-gray-900 mt-2 capitalize">
            {data?.warmupStatus}
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <p className="text-xs text-gray-500">Uptime</p>
          <p className="text-3xl font-semibold text-gray-900 mt-2">{data?.uptime}</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Warmup backend</h3>
            <p className="text-xs text-gray-500">Verifica /api/warmup</p>
          </div>
          <button
            onClick={handlePing}
            disabled={pingLoading}
            className="rounded-xl bg-primary-600 text-white px-4 py-2 text-sm font-semibold disabled:opacity-60"
          >
            {pingLoading ? 'Pingeando...' : 'Ping backend'}
          </button>
        </div>
        {pingStatus && <p className="mt-3 text-xs text-gray-600">{pingStatus}</p>}
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900">Logs recientes</h3>
          <p className="text-xs text-gray-500">Actividad del sistema</p>
        </div>
        <div className="divide-y divide-gray-100">
          {data?.logs.map((log) => (
            <div key={log.id} className="px-6 py-4 flex items-start gap-3">
              <span
                className={`text-xs px-2.5 py-1 rounded-full font-semibold flex items-center gap-1 ${
                  log.level === 'info'
                    ? 'bg-emerald-50 text-emerald-600'
                    : log.level === 'warning'
                    ? 'bg-amber-50 text-amber-700'
                    : 'bg-rose-50 text-rose-600'
                }`}
              >
                {log.level === 'info' && <CheckCircle2 className="h-3 w-3" />}
                {log.level === 'warning' && <AlertTriangle className="h-3 w-3" />}
                {log.level === 'error' && <Activity className="h-3 w-3" />}
                {log.level.toUpperCase()}
              </span>
              <div>
                <p className="text-sm text-gray-900">{log.message}</p>
                <p className="text-xs text-gray-500">{log.createdAt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SupportTelemetryPage
