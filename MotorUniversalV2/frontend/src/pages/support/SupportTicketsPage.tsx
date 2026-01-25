import { useMemo, useState } from 'react'
import { useSupportTickets } from '../../hooks/support/useSupportTickets'

const SupportTicketsPage = () => {
  const { data: tickets = [] } = useSupportTickets()
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    date: '',
  })
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null)

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      const matchesStatus = filters.status ? ticket.status === filters.status : true
      const matchesPriority = filters.priority ? ticket.priority === filters.priority : true
      const matchesDate = filters.date ? ticket.createdAt.includes(filters.date) : true
      return matchesStatus && matchesPriority && matchesDate
    })
  }, [tickets, filters])

  const selectedTicket = tickets.find((ticket) => ticket.id === selectedTicketId)

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Soporte</p>
        <h2 className="text-2xl font-semibold text-slate-900">Tickets</h2>
        <p className="text-sm text-slate-600">
          Listado de tickets con filtros por estatus, prioridad y fecha.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="text-xs font-semibold text-slate-500">Status</label>
            <select
              value={filters.status}
              onChange={(event) => setFilters((prev) => ({ ...prev, status: event.target.value }))}
              className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            >
              <option value="">Todos</option>
              <option value="open">Abierto</option>
              <option value="pending">Pendiente</option>
              <option value="closed">Cerrado</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500">Prioridad</label>
            <select
              value={filters.priority}
              onChange={(event) => setFilters((prev) => ({ ...prev, priority: event.target.value }))}
              className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            >
              <option value="">Todas</option>
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500">Fecha</label>
            <input
              value={filters.date}
              onChange={(event) => setFilters((prev) => ({ ...prev, date: event.target.value }))}
              placeholder="Ej. Hoy"
              className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            />
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="text-sm font-semibold text-slate-900">Tickets activos</h3>
          <p className="text-xs text-slate-500">{filteredTickets.length} resultados</p>
        </div>
        <div className="divide-y divide-slate-100">
          {filteredTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="px-6 py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between hover:bg-slate-50"
            >
              <div>
                <p className="text-sm font-semibold text-slate-900">{ticket.subject}</p>
                <p className="text-xs text-slate-500">
                  {ticket.id} · {ticket.requester} · {ticket.createdAt}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`text-xs px-2.5 py-1 rounded-full ${
                    ticket.status === 'open'
                      ? 'bg-emerald-50 text-emerald-600'
                      : ticket.status === 'pending'
                      ? 'bg-amber-50 text-amber-700'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {ticket.status === 'open'
                    ? 'Abierto'
                    : ticket.status === 'pending'
                    ? 'Pendiente'
                    : 'Cerrado'}
                </span>
                <span
                  className={`text-xs px-2.5 py-1 rounded-full ${
                    ticket.priority === 'high'
                      ? 'bg-rose-50 text-rose-600'
                      : ticket.priority === 'medium'
                      ? 'bg-amber-50 text-amber-700'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {ticket.priority === 'high'
                    ? 'Alta'
                    : ticket.priority === 'medium'
                    ? 'Media'
                    : 'Baja'}
                </span>
                <button
                  className="text-primary-600 text-xs font-semibold"
                  onClick={() => setSelectedTicketId(ticket.id)}
                >
                  Ver detalle
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedTicket && (
        <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
          <div className="bg-white w-full max-w-lg h-full shadow-xl p-6 overflow-y-auto">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Detalle del ticket</h3>
                <p className="text-sm text-slate-500">{selectedTicket.id}</p>
              </div>
              <button
                onClick={() => setSelectedTicketId(null)}
                className="text-slate-500 hover:text-slate-700"
              >
                Cerrar
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-500">Descripción</p>
                <p className="text-sm text-slate-900">{selectedTicket.subject}</p>
                <p className="text-xs text-slate-600 mt-2">
                  Solicitante: {selectedTicket.requester}
                </p>
                <p className="text-xs text-slate-600">Fecha: {selectedTicket.createdAt}</p>
              </div>

              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-500">Estado</p>
                <p className="text-sm text-slate-900 capitalize">{selectedTicket.status}</p>
                <p className="text-xs text-slate-600">Prioridad: {selectedTicket.priority}</p>
              </div>

              <button className="w-full rounded-xl bg-primary-600 text-white py-2 text-sm font-semibold">
                Marcar como resuelto (mock)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SupportTicketsPage
