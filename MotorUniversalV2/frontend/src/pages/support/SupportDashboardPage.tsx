import { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import {
  BadgeCheck,
  Clock3,
  ClipboardCheck,
  MailCheck,
  MessageSquareText,
  PhoneCall,
  ShieldCheck,
  SignalHigh,
  TicketCheck,
  TriangleAlert,
  UserCircle2,
  Users2,
  MessageCircle,
  Building2,
} from 'lucide-react'
import { listCompanies, listTickets } from '../../services/supportService'

const SupportDashboardPage = () => {
  const location = useLocation()
  const basePath = location.pathname.startsWith('/dev/support') ? '/dev/support' : '/support'
  const { data: tickets = [], isLoading: isTicketsLoading } = useQuery({
    queryKey: ['support', 'dashboard', 'tickets'],
    queryFn: async () => listTickets(),
  })
  const { data: companies = [], isLoading: isCompaniesLoading } = useQuery({
    queryKey: ['support', 'dashboard', 'companies'],
    queryFn: async () => listCompanies(),
  })

  const metrics = useMemo(() => {
    const now = Date.now()
    const openTickets = tickets.filter((ticket) => ticket.status === 'open')
    const pendingTickets = tickets.filter((ticket) => ticket.status === 'pending')
    const resolvedTickets = tickets.filter((ticket) => ticket.status === 'solved')
    const unresolvedTickets = tickets.filter((ticket) => ticket.status !== 'solved')
    const highPriorityTickets = unresolvedTickets.filter((ticket) => ticket.priority === 'high')
    const slaRiskTickets = unresolvedTickets.filter((ticket) => {
      const createdAt = new Date(ticket.createdAt).getTime()
      return now - createdAt > 24 * 60 * 60 * 1000
    })

    const responseTimeSamples = tickets
      .map((ticket) => {
        if (!ticket.lastAgentResponseAt) return null
        const createdAt = new Date(ticket.createdAt).getTime()
        const respondedAt = new Date(ticket.lastAgentResponseAt).getTime()
        if (Number.isNaN(createdAt) || Number.isNaN(respondedAt)) return null
        return Math.max(0, respondedAt - createdAt)
      })
      .filter((value): value is number => value !== null)

    const averageResponseMs =
      responseTimeSamples.length > 0
        ? responseTimeSamples.reduce((acc, value) => acc + value, 0) / responseTimeSamples.length
        : null

    const averageResponseHours = averageResponseMs
      ? (averageResponseMs / (1000 * 60 * 60)).toFixed(1)
      : null

    const channels = Array.from(new Set(unresolvedTickets.map((ticket) => ticket.channel)))
    const channelCounts = unresolvedTickets.reduce<Record<string, number>>((acc, ticket) => {
      acc[ticket.channel] = (acc[ticket.channel] || 0) + 1
      return acc
    }, {})

    const recentTickets = [...tickets]
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 5)

    const priorityQueue = [...highPriorityTickets]
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      .slice(0, 4)

    const companyTicketCounts = tickets.reduce<Record<string, number>>((acc, ticket) => {
      acc[ticket.companyName] = (acc[ticket.companyName] || 0) + 1
      return acc
    }, {})

    const topCompanies = (companies.length ? companies : Object.keys(companyTicketCounts).map((name) => ({
      id: name,
      name,
      activeTickets: companyTicketCounts[name] || 0,
    })))
      .map((company) => ({
        name: company.name,
        industry: company.industry || 'Sin industria',
        activeTickets: companyTicketCounts[company.name] ?? company.activeTickets ?? 0,
        contactEmail: company.contactEmail || 'Sin contacto',
      }))
      .sort((a, b) => b.activeTickets - a.activeTickets)
      .slice(0, 4)

    return {
      openTickets,
      pendingTickets,
      resolvedTickets,
      unresolvedTickets,
      highPriorityTickets,
      slaRiskTickets,
      averageResponseHours,
      channels,
      channelCounts,
      recentTickets,
      priorityQueue,
      topCompanies,
    }
  }, [tickets, companies])

  const supportAlerts = useMemo(
    () => [
      {
        key: 'whatsapp',
        title: 'Mensaje por WhatsApp',
        count: metrics.channelCounts.whatsapp || 0,
        helper: 'Canal crítico para incidencias urgentes',
        tone: 'bg-emerald-50 text-emerald-600',
      },
      {
        key: 'instagram',
        title: 'Mensaje por Instagram',
        count: metrics.channelCounts.instagram || 0,
        helper: 'Revisa interacciones sociales nuevas',
        tone: 'bg-fuchsia-50 text-fuchsia-600',
      },
      {
        key: 'platform-chat',
        title: 'Chat de plataforma',
        count: metrics.channelCounts.web || 0,
        helper: 'Seguimiento de usuarios en plataforma',
        tone: 'bg-sky-50 text-sky-600',
      },
    ],
    [metrics.channelCounts],
  )

  const resolvedChecklist = useMemo(
    () => [
      {
        title: 'Tickets de alta prioridad resueltos',
        done: metrics.resolvedTickets.filter((ticket) => ticket.priority === 'high').length,
        total: tickets.filter((ticket) => ticket.priority === 'high').length,
      },
      {
        title: 'Respuestas enviadas hoy',
        done: tickets.filter((ticket) => {
          if (!ticket.lastAgentResponseAt) return false
          const responseDate = new Date(ticket.lastAgentResponseAt)
          const today = new Date()
          return responseDate.toDateString() === today.toDateString()
        }).length,
        total: Math.max(1, tickets.length),
      },
      {
        title: 'Seguimientos pendientes priorizados',
        done: Math.max(0, metrics.pendingTickets.length - metrics.slaRiskTickets.length),
        total: Math.max(1, metrics.pendingTickets.length),
      },
    ],
    [metrics.pendingTickets.length, metrics.resolvedTickets, metrics.slaRiskTickets.length, tickets],
  )

  const adminContact = {
    name: 'Mariana Valdés',
    role: 'Administración soporte',
    email: 'soporte.admin@evaluassi.com',
    phone: '+52 55 4821 0098',
    availability: 'Lun - Vie · 08:00 - 18:00',
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Dashboard</p>
        <h2 className="text-2xl font-semibold text-gray-900">Bienvenido</h2>
        <p className="text-sm text-gray-600 max-w-2xl">
          Vista general de tu operación de soporte y prioridades del día.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center">
                  <UserCircle2 className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Grupo Edut</p>
                  <h3 className="text-xl font-semibold text-gray-900">Juan Salvador López Luna</h3>
                  <p className="text-xs text-gray-500">Soporte · Z00015SO000002</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                  <BadgeCheck className="h-3.5 w-3.5" />
                  Disponible
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-600">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Nivel 2
                </span>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                label: 'Tickets abiertos',
                value: metrics.openTickets.length,
                helper: 'En espera de primera respuesta',
                icon: TicketCheck,
                tone: 'bg-sky-50 text-sky-600',
              },
              {
                label: 'Pendientes',
                value: metrics.pendingTickets.length,
                helper: 'Requieren seguimiento',
                icon: Clock3,
                tone: 'bg-amber-50 text-amber-600',
              },
              {
                label: 'SLA en riesgo',
                value: metrics.slaRiskTickets.length,
                helper: 'Más de 24h sin cerrar',
                icon: TriangleAlert,
                tone: 'bg-rose-50 text-rose-600',
              },
              {
                label: 'Respuesta promedio',
                value: metrics.averageResponseHours ? `${metrics.averageResponseHours} h` : '--',
                helper: 'Tiempo hasta primer contacto',
                icon: MailCheck,
                tone: 'bg-emerald-50 text-emerald-600',
              },
            ].map(({ label, value, helper, icon: Icon, tone }) => (
              <div key={label} className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                    {label}
                  </p>
                  <span className={`flex h-9 w-9 items-center justify-center rounded-full ${tone}`}>
                    <Icon className="h-4 w-4" />
                  </span>
                </div>
                <p className="mt-3 text-2xl font-semibold text-gray-900">{value}</p>
                <p className="mt-1 text-xs text-gray-500">{helper}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Prioridades</p>
                  <h3 className="text-lg font-semibold text-gray-900">Alertas críticas</h3>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600">
                  <SignalHigh className="h-3.5 w-3.5" />
                  {metrics.highPriorityTickets.length} en alta prioridad
                </span>
              </div>
              <div className="mt-4 space-y-3">
                {isTicketsLoading ? (
                  <p className="text-sm text-gray-500">Cargando alertas...</p>
                ) : metrics.priorityQueue.length ? (
                  metrics.priorityQueue.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="flex flex-col gap-2 rounded-xl border border-rose-100 bg-rose-50/40 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{ticket.subject}</p>
                        <p className="text-xs text-gray-500">
                          {ticket.companyName} · {ticket.folio}
                        </p>
                      </div>
                      <div className="text-xs text-gray-500">
                        Actualizado {new Date(ticket.updatedAt).toLocaleString('es-MX')}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">Sin tickets críticos pendientes.</p>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Acciones rápidas</p>
              <h3 className="text-lg font-semibold text-gray-900">Atajos operativos</h3>
              <div className="mt-4 space-y-3">
                {[
                  {
                    label: 'Abrir canal de comunicación',
                    path: `${basePath}/communication`,
                    icon: MessageCircle,
                    helper: 'Responder conversaciones activas',
                  },
                  {
                    label: 'Revisar usuarios',
                    path: `${basePath}/users`,
                    icon: Users2,
                    helper: 'Bloqueos, accesos y actividad',
                  },
                  {
                    label: 'Gestionar planteles',
                    path: `${basePath}/campuses`,
                    icon: Building2,
                    helper: 'Altas, cambios y solicitudes',
                  },
                ].map(({ label, path, icon: Icon, helper }) => (
                  <Link
                    key={label}
                    to={path}
                    className="flex items-center gap-4 rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 transition hover:border-primary-200 hover:bg-primary-50/60"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-semibold text-gray-900">{label}</p>
                      <p className="text-xs text-gray-500">{helper}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Alertas de canales</p>
              <h3 className="text-lg font-semibold text-gray-900">Mensajes entrantes</h3>
              <div className="mt-4 space-y-3">
                {supportAlerts.map((alert) => (
                  <div
                    key={alert.key}
                    className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{alert.title}</p>
                      <p className="text-xs text-gray-500">{alert.helper}</p>
                    </div>
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${alert.tone}`}
                    >
                      {alert.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Checklist</p>
              <h3 className="text-lg font-semibold text-gray-900">Lo resuelto hoy</h3>
              <div className="mt-4 space-y-4">
                {resolvedChecklist.map((item) => {
                  const progress =
                    item.total > 0 ? Math.min(100, Math.round((item.done / item.total) * 100)) : 0
                  return (
                    <div key={item.title} className="space-y-2">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>{item.title}</span>
                        <span className="font-semibold text-gray-900">
                          {item.done}/{item.total}
                        </span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                        <div
                          className="h-full rounded-full bg-primary-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Actividad</p>
            <h3 className="text-lg font-semibold text-gray-900">Últimos movimientos</h3>
            <div className="mt-4 space-y-4">
              {isTicketsLoading ? (
                <p className="text-sm text-gray-500">Cargando actividad...</p>
              ) : metrics.recentTickets.length ? (
                metrics.recentTickets.map((ticket) => (
                  <div key={ticket.id} className="flex items-start gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary-500" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{ticket.subject}</p>
                      <p className="text-xs text-gray-500">
                        {ticket.companyName} · {ticket.folio} · {ticket.status}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(ticket.updatedAt).toLocaleString('es-MX')}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No hay tickets recientes.</p>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Partners</p>
            <h3 className="text-lg font-semibold text-gray-900">Empresas con más tickets</h3>
            <div className="mt-4 space-y-3">
              {isCompaniesLoading ? (
                <p className="text-sm text-gray-500">Cargando empresas...</p>
              ) : metrics.topCompanies.length ? (
                metrics.topCompanies.map((company) => (
                  <div
                    key={company.name}
                    className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{company.name}</p>
                      <p className="text-xs text-gray-500">{company.industry}</p>
                      <p className="text-xs text-gray-400">{company.contactEmail}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">{company.activeTickets}</p>
                      <p className="text-xs text-gray-500">tickets activos</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">Sin datos de partners.</p>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-primary-50 via-white to-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Disponibilidad</p>
            <h3 className="text-lg font-semibold text-gray-900">Canales activos</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {metrics.channels.length ? (
                metrics.channels.map((channel) => (
                  <span
                    key={channel}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-600 shadow-sm"
                  >
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    {channel}
                  </span>
                ))
              ) : (
                <span className="text-sm text-gray-500">Sin canales activos.</span>
              )}
            </div>
            <div className="mt-4 flex items-center justify-between rounded-xl border border-primary-100 bg-white px-4 py-3 text-sm text-gray-600">
              <span>Tickets resueltos hoy</span>
              <span className="font-semibold text-gray-900">{metrics.resolvedTickets.length}</span>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Contacto admin</p>
            <h3 className="text-lg font-semibold text-gray-900">Escalación inmediata</h3>
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                  <UserCircle2 className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{adminContact.name}</p>
                  <p className="text-xs text-gray-500">{adminContact.role}</p>
                </div>
              </div>
              <div className="grid gap-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <MessageSquareText className="h-4 w-4 text-primary-500" />
                  <span>{adminContact.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneCall className="h-4 w-4 text-primary-500" />
                  <span>{adminContact.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ClipboardCheck className="h-4 w-4 text-primary-500" />
                  <span>{adminContact.availability}</span>
                </div>
              </div>
              <div className="rounded-xl border border-primary-100 bg-primary-50/60 px-4 py-3 text-xs text-gray-600">
                Para incidencias críticas, confirma el folio y canal antes de escalar.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SupportDashboardPage
