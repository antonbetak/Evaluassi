import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { BadgeCheck, Briefcase, Mail, PhoneCall, ShieldCheck, UserCircle2 } from 'lucide-react'
import { listTickets } from '../../services/supportService'

const SupportDashboardPage = () => {
  const { data: tickets = [] } = useQuery({
    queryKey: ['support', 'tickets'],
    queryFn: () => listTickets(),
  })

  const stats = useMemo(() => {
    const open = tickets.filter((ticket) => ticket.status === 'open').length
    const pending = tickets.filter((ticket) => ticket.status === 'pending').length
    const solved = tickets.filter((ticket) => ticket.status === 'solved').length
    return [
      {
        label: 'Tickets abiertos',
        value: open,
        tone: 'bg-rose-50 text-rose-600',
      },
      {
        label: 'En seguimiento',
        value: pending,
        tone: 'bg-amber-50 text-amber-700',
      },
      {
        label: 'Resueltos',
        value: solved,
        tone: 'bg-emerald-50 text-emerald-600',
      },
    ]
  }, [tickets])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Perfil de soporte</p>
        <h2 className="text-2xl font-semibold text-gray-900">Resumen de tu operación</h2>
        <p className="text-sm text-gray-600 max-w-2xl">
          Vista general de tu carga, métricas clave y estado del turno.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center">
                <UserCircle2 className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Agente asignado</p>
                <h3 className="text-lg font-semibold text-gray-900">Equipo Soporte</h3>
                <p className="text-xs text-gray-500">Turno activo · Nivel 2</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
              <BadgeCheck className="h-3.5 w-3.5" />
              Disponible
            </span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {stats.map((item) => (
              <div key={item.label} className="rounded-2xl border border-gray-200 p-4">
                <p className="text-xs text-gray-500">{item.label}</p>
                <p className="text-2xl font-semibold text-gray-900 mt-2">{item.value}</p>
                <span className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${item.tone}`}>
                  Actualizado
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900">Checklist del turno</h3>
            <div className="mt-4 space-y-3 text-sm text-gray-600">
              <div className="flex items-center justify-between">
                <span>Revisar cola prioritaria</span>
                <span className="text-xs font-semibold text-emerald-600">Hecho</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Enviar resumen diario</span>
                <span className="text-xs font-semibold text-amber-600">Pendiente</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Validar SLA crítico</span>
                <span className="text-xs font-semibold text-emerald-600">Hecho</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary-600 to-indigo-600 text-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5" />
              <h3 className="text-sm font-semibold">SLA hoy</h3>
            </div>
            <p className="text-3xl font-semibold mt-4">96.2%</p>
            <p className="text-xs text-white/80 mt-1">+2.1% vs ayer</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: 'Canales activos',
            value: 'Web, Email, WhatsApp',
            icon: PhoneCall,
          },
          {
            title: 'Empresas atendidas hoy',
            value: '6 partners',
            icon: Briefcase,
          },
          {
            title: 'Mensajes pendientes',
            value: '12 conversaciones',
            icon: Mail,
          },
        ].map((item) => (
          <div key={item.title} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500">{item.title}</p>
                <p className="text-sm font-semibold text-gray-900 mt-1">{item.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SupportDashboardPage
