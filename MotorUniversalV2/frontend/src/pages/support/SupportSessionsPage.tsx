import { RefreshCw } from 'lucide-react'

const SupportSessionsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Total sesiones</p>
        <h2 className="text-2xl font-semibold text-gray-900">Sesiones</h2>
        <p className="text-sm text-gray-600 max-w-2xl">
          Consulta la disponibilidad y total de sesiones programadas.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <select className="w-full rounded-xl border border-gray-200 px-4 py-2 text-sm text-gray-600">
            <option>Edut</option>
            <option>2CC</option>
            <option>UVP</option>
          </select>
          <select className="w-full rounded-xl border border-gray-200 px-4 py-2 text-sm text-gray-600">
            <option>Todos los planteles</option>
            <option>Plantel Norte</option>
            <option>Plantel Centro</option>
          </select>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-gray-900">Sesiones agendadas</p>
            <p className="text-xs text-gray-500">Última actualización: 11:03 pm</p>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <label className="flex items-center gap-2">
              <input type="radio" name="sessions" defaultChecked />
              Sesiones activas
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="sessions" />
              Sesiones inactivas
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="sessions" />
              Todas
            </label>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-slate-900 text-white p-6 shadow-sm">
            <p className="text-xs text-white/70">Total agendadas</p>
            <p className="text-4xl font-semibold mt-4">12</p>
            <button className="mt-6 inline-flex items-center gap-2 text-xs text-white/70">
              <RefreshCw className="h-3.5 w-3.5" />
              Actualizar
            </button>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-xs text-gray-500">Evaluación activa</p>
            <p className="text-3xl font-semibold text-gray-900 mt-4">1</p>
            <p className="text-xs text-gray-500 mt-2">Innovación · Microsoft Office</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-xs text-gray-500">Disponibilidad por día</p>
            <p className="text-3xl font-semibold text-gray-900 mt-4">85%</p>
            <p className="text-xs text-gray-500 mt-2">Promedio semanal</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SupportSessionsPage
