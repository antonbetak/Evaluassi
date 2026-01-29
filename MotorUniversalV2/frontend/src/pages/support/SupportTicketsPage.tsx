import { useEffect, useMemo, useState } from 'react'
import {
  Calendar,
  ChevronDown,
  Filter,
  Inbox,
  MessageSquare,
  Search,
  SlidersHorizontal,
  Tag,
  User,
} from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import {
  addInternalNote,
  listCompanies,
  listTickets,
  SupportTicket,
  updateTicketStatus,
} from '../../services/supportService'

const statusLabels: Record<SupportTicket['status'], string> = {
  open: 'Abierto',
  pending: 'Pendiente',
  solved: 'Resuelto',
}

const priorityLabels: Record<SupportTicket['priority'], string> = {
  low: 'Baja',
  medium: 'Media',
  high: 'Alta',
}

const channelLabels: Record<SupportTicket['channel'], string> = {
  web: 'Web',
  email: 'Email',
  whatsapp: 'WhatsApp',
}

const SupportTicketsPage = () => {
  const { data: ticketData = [], isLoading } = useQuery({
    queryKey: ['support', 'tickets'],
    queryFn: () => listTickets(),
  })
  const { data: companies = [] } = useQuery({
    queryKey: ['support', 'companies'],
    queryFn: () => listCompanies(),
  })

  const [tickets, setTickets] = useState<SupportTicket[]>([])
  const [filtersOpen, setFiltersOpen] = useState(true)
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    companyId: '',
    channel: '',
    dateFrom: '',
    dateTo: '',
  })
  const [noteDraft, setNoteDraft] = useState('')
  const [notesByTicket, setNotesByTicket] = useState<Record<string, string[]>>({})

  useEffect(() => {
    setTickets(ticketData)
  }, [ticketData])

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      const matchesStatus = filters.status ? ticket.status === filters.status : true
      const matchesPriority = filters.priority ? ticket.priority === filters.priority : true
      const matchesCompany = filters.companyId ? ticket.companyId === filters.companyId : true
      const matchesChannel = filters.channel ? ticket.channel === filters.channel : true

      const query = search.trim().toLowerCase()
      const matchesSearch = query
        ? [ticket.subject, ticket.userName, ticket.userEmail, ticket.folio].some((value) =>
            value.toLowerCase().includes(query),
          )
        : true

      const createdAt = new Date(ticket.createdAt)
      const matchesFrom = filters.dateFrom ? createdAt >= new Date(filters.dateFrom) : true
      const matchesTo = filters.dateTo ? createdAt <= new Date(filters.dateTo) : true

      return (
        matchesStatus &&
        matchesPriority &&
        matchesCompany &&
        matchesChannel &&
        matchesSearch &&
        matchesFrom &&
        matchesTo
      )
    })
  }, [tickets, filters, search])

  const selectedTicket = tickets.find((ticket) => ticket.id === selectedTicketId) || null

  const handleStatusUpdate = async (ticketId: string, status: SupportTicket['status']) => {
    const updated = await updateTicketStatus(ticketId, status)
    if (!updated) return
    setTickets((prev) => prev.map((ticket) => (ticket.id === ticketId ? updated : ticket)))
  }

  const handleAddNote = async () => {
    if (!selectedTicket || !noteDraft.trim()) return
    const note = await addInternalNote(selectedTicket.id, noteDraft)
    setNotesByTicket((prev) => ({
      ...prev,
      [selectedTicket.id]: [...(prev[selectedTicket.id] || []), note.message],
    }))
    setNoteDraft('')
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Tickets</p>
        <h2 className="text-2xl font-semibold text-gray-900">Gestión de tickets</h2>
        <p className="text-sm text-gray-600 max-w-2xl">
          Organiza solicitudes por prioridad, clientes y canales. Asigna acciones rápidas para
          mantener el SLA.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">
        <div className="flex flex-col gap-4 border-b border-gray-200 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
              <Filter className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Filtros avanzados</h3>
              <p className="text-xs text-gray-500">Refina la lista por estado, empresa y fechas.</p>
            </div>
          </div>
          <button
            onClick={() => setFiltersOpen((prev) => !prev)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900"
          >
            <SlidersHorizontal className="h-4 w-4" />
            {filtersOpen ? 'Ocultar filtros' : 'Mostrar filtros'}
            <ChevronDown
              className={`h-4 w-4 transition ${filtersOpen ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ${
            filtersOpen ? 'max-h-[320px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="grid gap-4 px-5 py-4 md:grid-cols-2 xl:grid-cols-3">
            <div>
              <label className="text-xs font-semibold text-gray-500">Estado</label>
              <select
                value={filters.status}
                onChange={(event) => setFilters((prev) => ({ ...prev, status: event.target.value }))}
                className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm"
              >
                <option value="">Todos</option>
                <option value="open">Abierto</option>
                <option value="pending">Pendiente</option>
                <option value="solved">Resuelto</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500">Prioridad</label>
              <select
                value={filters.priority}
                onChange={(event) => setFilters((prev) => ({ ...prev, priority: event.target.value }))}
                className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm"
              >
                <option value="">Todas</option>
                <option value="low">Baja</option>
                <option value="medium">Media</option>
                <option value="high">Alta</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500">Empresa</label>
              <select
                value={filters.companyId}
                onChange={(event) => setFilters((prev) => ({ ...prev, companyId: event.target.value }))}
                className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm"
              >
                <option value="">Todas</option>
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500">Canal</label>
              <select
                value={filters.channel}
                onChange={(event) => setFilters((prev) => ({ ...prev, channel: event.target.value }))}
                className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm"
              >
                <option value="">Todos</option>
                <option value="web">Web</option>
                <option value="email">Email</option>
                <option value="whatsapp">WhatsApp</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500">Desde</label>
              <div className="relative mt-2">
                <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(event) => setFilters((prev) => ({ ...prev, dateFrom: event.target.value }))}
                  className="w-full rounded-xl border border-gray-200 py-2 pl-9 pr-3 text-sm"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500">Hasta</label>
              <div className="relative mt-2">
                <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(event) => setFilters((prev) => ({ ...prev, dateTo: event.target.value }))}
                  className="w-full rounded-xl border border-gray-200 py-2 pl-9 pr-3 text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="flex flex-col gap-3 border-b border-gray-200 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Cola de tickets</h3>
              <p className="text-xs text-gray-500">{filteredTickets.length} resultados</p>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar por usuario, email o folio"
                className="w-full rounded-xl border border-gray-200 py-2 pl-9 pr-3 text-sm"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="p-6 space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={`ticket-skeleton-${index}`} className="h-20 rounded-xl bg-gray-100 animate-pulse" />
              ))}
            </div>
          ) : filteredTickets.length === 0 ? (
            <div className="p-8 text-center text-sm text-gray-500">
              <Inbox className="mx-auto h-12 w-12 text-gray-300 mb-3" />
              No hay tickets con esos filtros.
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredTickets.map((ticket) => (
                <button
                  key={ticket.id}
                  onClick={() => setSelectedTicketId(ticket.id)}
                  className="w-full text-left px-6 py-4 transition hover:bg-gray-50 focus:outline-none"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{ticket.subject}</p>
                      <p className="text-xs text-gray-500">
                        {ticket.folio} · {ticket.userName} · {ticket.companyName}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2 text-xs">
                        <span
                          className={`px-2 py-1 rounded-full font-semibold ${
                            ticket.status === 'open'
                              ? 'bg-rose-50 text-rose-600'
                              : ticket.status === 'pending'
                              ? 'bg-amber-50 text-amber-700'
                              : 'bg-emerald-50 text-emerald-600'
                          }`}
                        >
                          {statusLabels[ticket.status]}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full font-semibold ${
                            ticket.priority === 'high'
                              ? 'bg-rose-50 text-rose-600'
                              : ticket.priority === 'medium'
                              ? 'bg-amber-50 text-amber-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {priorityLabels[ticket.priority]}
                        </span>
                        <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-600 font-semibold">
                          {channelLabels[ticket.channel]}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400 text-right">
                      <p>Actualizado</p>
                      <p>{new Date(ticket.updatedAt).toLocaleDateString('es-MX')}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40">
          <div className="h-full w-full max-w-lg bg-white shadow-xl overflow-y-auto transition-transform">
            <div className="border-b border-gray-200 px-6 py-4 flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Detalle ticket</p>
                <h3 className="text-lg font-semibold text-gray-900 mt-1">
                  {selectedTicket.subject}
                </h3>
                <p className="text-xs text-gray-500">{selectedTicket.folio}</p>
              </div>
              <button
                onClick={() => setSelectedTicketId(null)}
                className="text-sm font-semibold text-gray-500 hover:text-gray-700"
              >
                Cerrar
              </button>
            </div>

            <div className="px-6 py-5 space-y-6">
              <div className="rounded-2xl border border-gray-200 p-4 bg-gray-50/50">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-500">Solicitante</span>
                  <span className="text-xs font-semibold text-primary-600">{selectedTicket.companyName}</span>
                </div>
                <p className="text-sm font-semibold text-gray-900 mt-2">{selectedTicket.userName}</p>
                <p className="text-xs text-gray-500">{selectedTicket.userEmail}</p>
                <p className="text-xs text-gray-400 mt-3">
                  Creado: {new Date(selectedTicket.createdAt).toLocaleString('es-MX')}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-500">Descripción</p>
                <p className="text-sm text-gray-700 mt-2">{selectedTicket.message}</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-gray-200 p-3">
                  <p className="text-xs text-gray-500">Estado</p>
                  <p className="text-sm font-semibold text-gray-900 mt-1">
                    {statusLabels[selectedTicket.status]}
                  </p>
                </div>
                <div className="rounded-xl border border-gray-200 p-3">
                  <p className="text-xs text-gray-500">Prioridad</p>
                  <p className="text-sm font-semibold text-gray-900 mt-1">
                    {priorityLabels[selectedTicket.priority]}
                  </p>
                </div>
                <div className="rounded-xl border border-gray-200 p-3">
                  <p className="text-xs text-gray-500">Canal</p>
                  <p className="text-sm font-semibold text-gray-900 mt-1">
                    {channelLabels[selectedTicket.channel]}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 p-4">
                <p className="text-xs font-semibold text-gray-500">Etiquetas</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedTicket.tags.map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                      <Tag className="h-3 w-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 p-4">
                <p className="text-xs font-semibold text-gray-500">Acciones</p>
                <div className="mt-3 grid gap-2">
                  <button
                    onClick={() => handleStatusUpdate(selectedTicket.id, 'pending')}
                    className="w-full rounded-xl bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 hover:bg-amber-100 transition"
                  >
                    Marcar como pendiente
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(selectedTicket.id, 'solved')}
                    className="w-full rounded-xl bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-100 transition"
                  >
                    Marcar como resuelto
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 p-4">
                <p className="text-xs font-semibold text-gray-500">Notas internas</p>
                <div className="mt-3 space-y-2 text-sm text-gray-600">
                  {(notesByTicket[selectedTicket.id] || []).length === 0 ? (
                    <div className="rounded-xl border border-dashed border-gray-200 p-3 text-center text-xs text-gray-400">
                      Aún no hay notas internas.
                    </div>
                  ) : (
                    notesByTicket[selectedTicket.id].map((note, index) => (
                      <div key={`${selectedTicket.id}-note-${index}`} className="rounded-xl bg-gray-50 px-3 py-2">
                        {note}
                      </div>
                    ))
                  )}
                </div>
                <div className="mt-3 flex items-start gap-2">
                  <MessageSquare className="h-4 w-4 text-gray-400 mt-2" />
                  <textarea
                    value={noteDraft}
                    onChange={(event) => setNoteDraft(event.target.value)}
                    rows={3}
                    placeholder="Escribe una nota interna..."
                    className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm"
                  />
                </div>
                <button
                  onClick={handleAddNote}
                  className="mt-3 w-full rounded-xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 transition"
                >
                  Guardar nota
                </button>
              </div>

              {selectedTicket.attachments.length > 0 && (
                <div className="rounded-2xl border border-gray-200 p-4">
                  <p className="text-xs font-semibold text-gray-500">Adjuntos</p>
                  <div className="mt-3 space-y-2 text-sm text-gray-600">
                    {selectedTicket.attachments.map((attachment) => (
                      <div
                        key={attachment.name}
                        className="flex items-center justify-between rounded-xl border border-gray-100 px-3 py-2"
                      >
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <span>{attachment.name}</span>
                        </div>
                        <span className="text-xs text-gray-400">{attachment.size}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SupportTicketsPage
