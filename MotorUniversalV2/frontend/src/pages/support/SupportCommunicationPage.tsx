import { useMemo, useState } from 'react'
import { Mail, MessageCircle, Search, Send, Users } from 'lucide-react'
import { mockUsers } from '../../support/mockSupportData'

const SupportCommunicationPage = () => {
  const [search, setSearch] = useState('')
  const [channel, setChannel] = useState<'email' | 'whatsapp'>('email')
  const [message, setMessage] = useState('')

  const recipients = useMemo(() => {
    if (!search.trim()) return mockUsers
    const query = search.toLowerCase()
    return mockUsers.filter((user) =>
      [user.name, user.email, user.companyName].some((value) =>
        value.toLowerCase().includes(query),
      ),
    )
  }, [search])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Comunicación</p>
        <h2 className="text-2xl font-semibold text-gray-900">Mensajes y avisos</h2>
        <p className="text-sm text-gray-600 max-w-2xl">
          Coordina comunicaciones con usuarios y partners desde un solo punto de control.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Redactar comunicado</h3>
              <p className="text-sm text-gray-500">Mensajes internos para usuarios y empresas.</p>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-gray-50 p-1">
              <button
                onClick={() => setChannel('email')}
                className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold transition ${
                  channel === 'email'
                    ? 'bg-white text-primary-600 shadow'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Mail className="h-3.5 w-3.5" />
                Email
              </button>
              <button
                onClick={() => setChannel('whatsapp')}
                className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold transition ${
                  channel === 'whatsapp'
                    ? 'bg-white text-primary-600 shadow'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <MessageCircle className="h-3.5 w-3.5" />
                WhatsApp
              </button>
            </div>
          </div>

          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Escribe el mensaje para el comunicado..."
            rows={6}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
          />

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-xs text-gray-500">
              Canal seleccionado: <span className="font-semibold text-gray-700">{channel}</span>
            </div>
            <button className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 transition">
              <Send className="h-4 w-4" />
              Enviar comunicado
            </button>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Destinatarios</h3>
              <p className="text-sm text-gray-500">Selecciona a quién se enviará el aviso.</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
              <Users className="h-3.5 w-3.5" />
              {recipients.length} usuarios
            </span>
          </div>

          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar usuario, email o empresa"
              className="w-full rounded-xl border border-gray-200 py-2 pl-9 pr-3 text-sm text-gray-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
            />
          </div>

          <div className="mt-4 max-h-72 space-y-3 overflow-y-auto pr-2">
            {recipients.length === 0 ? (
              <div className="rounded-xl border border-dashed border-gray-200 p-6 text-center text-sm text-gray-500">
                No encontramos destinatarios con esos criterios.
              </div>
            ) : (
              recipients.map((user) => (
                <div
                  key={user.id}
                  className="flex items-start justify-between rounded-xl border border-gray-100 p-3 transition hover:border-primary-200 hover:bg-primary-50/30"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                    <p className="text-xs text-gray-400">{user.companyName}</p>
                  </div>
                  <span className="text-xs font-semibold text-primary-600">Activo</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SupportCommunicationPage
