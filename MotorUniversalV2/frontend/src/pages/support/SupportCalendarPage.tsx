import { CalendarDays, Clock } from 'lucide-react'

const SupportCalendarPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Calendario</p>
        <h2 className="text-2xl font-semibold text-gray-900">Agenda operativa</h2>
        <p className="text-sm text-gray-600 max-w-2xl">
          Programación de sesiones, ventanas de mantenimiento y tareas críticas.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <CalendarDays className="h-5 w-5 text-primary-600" />
            <h3 className="text-sm font-semibold text-gray-900">Próximas sesiones</h3>
          </div>
          <div className="mt-4 space-y-3 text-sm text-gray-600">
            <div className="rounded-xl border border-gray-100 px-4 py-3">
              <p className="font-semibold text-gray-900">Corte de tickets semanal</p>
              <p className="text-xs text-gray-500">Jueves · 16:00</p>
            </div>
            <div className="rounded-xl border border-gray-100 px-4 py-3">
              <p className="font-semibold text-gray-900">Revisión SLA partners</p>
              <p className="text-xs text-gray-500">Viernes · 10:30</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-primary-600" />
            <h3 className="text-sm font-semibold text-gray-900">Bloques de guardia</h3>
          </div>
          <div className="mt-4 space-y-3 text-sm text-gray-600">
            <div className="rounded-xl border border-gray-100 px-4 py-3">
              <p className="font-semibold text-gray-900">Turno matutino</p>
              <p className="text-xs text-gray-500">08:00 - 14:00 · Equipo Norte</p>
            </div>
            <div className="rounded-xl border border-gray-100 px-4 py-3">
              <p className="font-semibold text-gray-900">Turno vespertino</p>
              <p className="text-xs text-gray-500">14:00 - 20:00 · Equipo Centro</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SupportCalendarPage
