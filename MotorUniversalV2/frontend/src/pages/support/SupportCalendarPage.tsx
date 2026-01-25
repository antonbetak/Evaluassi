import { CalendarDays } from 'lucide-react'

const SupportCalendarPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Calendario</p>
        <h2 className="text-2xl font-semibold text-gray-900">Calendario de sesiones</h2>
        <p className="text-sm text-gray-600 max-w-2xl">
          Consulta sesiones programadas por partner y plantel.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto]">
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
          <button className="rounded-xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white">
            Aplicar
          </button>
        </div>

        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <button className="rounded-full border border-gray-200 px-3 py-1">Hoy</button>
            <button className="rounded-full border border-gray-200 px-3 py-1">‹</button>
            <button className="rounded-full border border-gray-200 px-3 py-1">›</button>
          </div>
          <div className="text-sm text-gray-500">Enero 2026</div>
        </div>

        <div className="grid grid-cols-7 gap-2 text-xs text-gray-500">
          {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
            <div key={day} className="text-center font-semibold text-gray-400">
              {day}
            </div>
          ))}
          {Array.from({ length: 28 }).map((_, index) => (
            <div
              key={index}
              className="h-16 rounded-xl border border-gray-100 bg-gray-50/60 p-2 text-[11px] text-gray-400"
            >
              <div className="text-gray-500">{index + 1}</div>
              {index % 6 === 0 && (
                <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-primary-50 px-2 py-0.5 text-[10px] text-primary-600">
                  <CalendarDays className="h-3 w-3" />
                  Examen
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SupportCalendarPage
