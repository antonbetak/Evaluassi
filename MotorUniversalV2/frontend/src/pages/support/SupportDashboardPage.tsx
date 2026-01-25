import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  Activity,
  AlertCircle,
  ArrowUpRight,
  Clock,
  FileText,
  ShieldCheck,
  Ticket,
} from 'lucide-react'
import { listCompanies, listTickets } from '../../services/supportService'

const formatDate = (value: string) => {
  try {
    return new Date(value).toLocaleString('es-MX', {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  } catch {
    return value
  }
}

const SupportDashboardPage = () => {
  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ['support', 'tickets'],
    queryFn: () => listTickets(),
  })
  const { data: companies = [] } = useQuery({
    queryKey: ['support', 'companies'],
    queryFn: () => listCompanies(),
  })

  const kpis = useMemo(() => {
    const open = tickets.filter((ticket) => ticket.status === 'open').length
    const pending = tickets.filter((ticket) => ticket.status === 'pending').length
    const solved = tickets.filter((ticket) => ticket.status === 'solved').length
    const highPriority = tickets.filter((ticket) => ticket.priority === 'high').length
    return [
      {
        label: 'Tickets abiertos',
        value: open,
        meta: `${highPriority} con prioridad alta`,
        icon: Ticket,
        tone: 'text-rose-600 bg-rose-50',
      },
      {
        label: 'En seguimiento',
        value: pending,
        meta: 'Respuestas pendientes',
        icon: Clock,
        tone: 'text-amber-600 bg-amber-50',
      },
      {
        label: 'Resueltos hoy',
        value: solved,
        meta: 'Cumplimiento SLA 94%',
        icon: ShieldCheck,
        tone: 'text-emerald-600 bg-emerald-50',
      },
      {
        label: 'Empresas activas',
        value: companies.length,
        meta: 'Partners en operación',
        icon: FileText,
        tone: 'text-primary-600 bg-primary-50',
      },
    ]
  }, [tickets, companies])

  const recentTickets = useMemo(() => tickets.slice(0, 5), [tickets])
  const criticalTickets = useMemo(
    () => tickets.filter((ticket) => ticket.priority === 'high' && ticket.status !== 'solved'),
    [tickets],
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Support Home</p>
        <h2 className="text-2xl font-semibold text-gray-900">Dashboard operativo</h2>
        <p className="text-sm text-gray-600 max-w-2xl">
          Supervisa el estado global de soporte y prioriza respuestas con visibilidad de SLA.
        </p>
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="h-32 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm animate-pulse"
            >
              <div className="h-4 w-20 rounded bg-gray-100" />
              <div className="mt-4 h-8 w-16 rounded bg-gray-100" />
              <div className="mt-4 h-3 w-24 rounded bg-gray-100" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">{kpi.label}</p>
                <span className={`h-9 w-9 rounded-xl flex items-center justify-center ${kpi.tone}`}>
                  <kpi.icon className="h-4 w-4" />
                </span>
              </div>
              <p className="text-3xl font-semibold text-gray-900 mt-3">{kpi.value}</p>
              <p className="text-xs text-gray-500 mt-2">{kpi.meta}</p>
            </div>
          ))}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Tickets recientes</h3>
              <p className="text-xs text-gray-500">Últimas solicitudes recibidas</p>
            </div>
            <button className="inline-flex items-center gap-2 text-xs font-semibold text-primary-600 hover:text-primary-700">
              Ver cola
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
          <div className="divide-y divide-gray-100">
            {recentTickets.length === 0 ? (
              <div className="p-6 text-center text-sm text-gray-500">
                No hay tickets activos por el momento.
              </div>
            ) : (
              recentTickets.map((ticket) => (
                <div key={ticket.id} className="px-6 py-4 flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                    <Ticket className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">{ticket.subject}</p>
                    <p className="text-xs text-gray-500">
                      {ticket.folio} · {ticket.companyName} · {formatDate(ticket.createdAt)}
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
                        {ticket.status === 'open'
                          ? 'Abierto'
                          : ticket.status === 'pending'
                          ? 'Pendiente'
                          : 'Resuelto'}
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
                        {ticket.priority === 'high'
                          ? 'Alta'
                          : ticket.priority === 'medium'
                          ? 'Media'
                          : 'Baja'}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900">Alertas críticas</h3>
              <span className="text-xs font-semibold text-gray-500">Hoy</span>
            </div>
            <div className="mt-4 space-y-3">
              {criticalTickets.length === 0 ? (
                <div className="rounded-xl border border-dashed border-gray-200 p-4 text-center text-sm text-gray-500">
                  No hay alertas críticas.
                </div>
              ) : (
                criticalTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="rounded-xl border border-rose-100 bg-rose-50/40 p-3 text-sm text-rose-700"
                  >
                    <p className="font-semibold">{ticket.subject}</p>
                    <p className="text-xs text-rose-600">{ticket.companyName}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Estado operativo</h3>
                <p className="text-xs text-gray-500">Últimas 24 horas</p>
              </div>
            </div>
            <div className="mt-4 space-y-3 text-sm text-gray-600">
              <div className="flex items-center justify-between">
                <span>Tiempo promedio de respuesta</span>
                <span className="font-semibold text-gray-900">18 min</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Tickets en SLA crítico</span>
                <span className="font-semibold text-gray-900">{criticalTickets.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Alertas de plataforma</span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700">
                  <AlertCircle className="h-3.5 w-3.5" /> 2 advertencias
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SupportDashboardPage
