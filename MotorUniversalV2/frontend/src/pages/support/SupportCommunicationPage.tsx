import { useMemo, useState } from 'react'
import {
  ArrowUpRight,
  MessageCircle,
  Paperclip,
  Search,
  Send,
  Smile,
  Users,
} from 'lucide-react'
import { mockUsers } from '../../support/mockSupportData'

const mockThreads = [
  {
    id: 'thread-1',
    userId: 'usr-1001',
    lastMessage: '¿Me ayudas con el acceso móvil?',
    updatedAt: 'Hace 6 min',
    unread: 2,
  },
  {
    id: 'thread-2',
    userId: 'usr-1002',
    lastMessage: 'Necesito actualizar datos del certificado.',
    updatedAt: 'Hace 20 min',
    unread: 0,
  },
  {
    id: 'thread-3',
    userId: 'usr-1006',
    lastMessage: '¿El canal WhatsApp está activo?',
    updatedAt: 'Hace 1 h',
    unread: 1,
  },
]

const conversationByThread: Record<
  string,
  { id: string; author: 'agent' | 'user'; message: string; time: string }[]
> = {
  'thread-1': [
    {
      id: 'msg-1',
      author: 'user',
      message: 'Hola, me quedé en la pantalla blanca de login.',
      time: '09:32',
    },
    {
      id: 'msg-2',
      author: 'agent',
      message: '¡Hola Ana! Vamos a revisarlo. ¿Podrías reiniciar la sesión? ',
      time: '09:35',
    },
    {
      id: 'msg-3',
      author: 'user',
      message: 'Sí, ya reinicié y sigue igual.',
      time: '09:36',
    },
  ],
  'thread-2': [
    {
      id: 'msg-4',
      author: 'user',
      message: 'Tengo un error en el correo del certificado.',
      time: '08:40',
    },
    {
      id: 'msg-5',
      author: 'agent',
      message: 'Listo Carlos, ya solicitamos la actualización.',
      time: '08:44',
    },
  ],
  'thread-3': [
    {
      id: 'msg-6',
      author: 'user',
      message: '¿Tienen respuesta por WhatsApp?',
      time: '07:55',
    },
    {
      id: 'msg-7',
      author: 'agent',
      message: 'Sí, el canal está activo. ¿Te comparto el número?',
      time: '07:58',
    },
  ],
}

const SupportCommunicationPage = () => {
  const [search, setSearch] = useState('')
  const [selectedThreadId, setSelectedThreadId] = useState<string>('thread-1')
  const [message, setMessage] = useState('')
  const [showProfile, setShowProfile] = useState(false)

  const threads = useMemo(() => {
    if (!search.trim()) return mockThreads
    const query = search.toLowerCase()
    return mockThreads.filter((thread) => {
      const user = mockUsers.find((item) => item.id === thread.userId)
      return user
        ? [user.name, user.email, user.companyName, thread.lastMessage]
            .join(' ')
            .toLowerCase()
            .includes(query)
        : false
    })
  }, [search])

  const selectedThread = threads.find((thread) => thread.id === selectedThreadId)
  const selectedUser = mockUsers.find((user) => user.id === selectedThread?.userId)
  const conversation = selectedThread ? conversationByThread[selectedThread.id] || [] : []

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Chat soporte</p>
        <h2 className="text-2xl font-semibold text-gray-900">Mensajería en la plataforma</h2>
        <p className="text-sm text-gray-600 max-w-2xl">
          Centraliza la conversación con clientes sin salir del panel de soporte.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900">Conversaciones</h3>
            <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
              <Users className="h-3.5 w-3.5" />
              {threads.length}
            </span>
          </div>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar conversación"
              className="w-full rounded-xl border border-gray-200 py-2 pl-9 pr-3 text-sm text-gray-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
            />
          </div>

          <div className="mt-4 space-y-3">
            {threads.map((thread) => {
              const user = mockUsers.find((item) => item.id === thread.userId)
              return (
                <button
                  key={thread.id}
                  onClick={() => setSelectedThreadId(thread.id)}
                  className={`w-full rounded-xl border px-4 py-3 text-left transition ${
                    thread.id === selectedThreadId
                      ? 'border-primary-200 bg-primary-50/40'
                      : 'border-gray-100 hover:border-primary-200 hover:bg-primary-50/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.companyName}</p>
                    </div>
                    {thread.unread > 0 && (
                      <span className="h-6 w-6 rounded-full bg-primary-600 text-white text-xs flex items-center justify-center">
                        {thread.unread}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-2 line-clamp-1">{thread.lastMessage}</p>
                  <p className="text-[11px] text-gray-400 mt-1">{thread.updatedAt}</p>
                </button>
              )
            })}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col min-h-[540px]">
          {selectedUser ? (
            <>
              <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{selectedUser.name}</p>
                  <p className="text-xs text-gray-500">{selectedUser.companyName}</p>
                </div>
                <button
                  onClick={() => setShowProfile(true)}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-primary-600"
                >
                  Perfil del usuario
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-1 px-6 py-5 space-y-4 overflow-y-auto">
                {conversation.map((messageItem) => (
                  <div
                    key={messageItem.id}
                    className={`flex ${messageItem.author === 'agent' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                        messageItem.author === 'agent'
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      <p>{messageItem.message}</p>
                      <p
                        className={`text-[11px] mt-2 ${
                          messageItem.author === 'agent' ? 'text-white/70' : 'text-gray-400'
                        }`}
                      >
                        {messageItem.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 px-6 py-4">
                <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-3 py-2">
                  <MessageCircle className="h-4 w-4 text-gray-400" />
                  <input
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Escribe tu respuesta..."
                    className="flex-1 text-sm text-gray-700 focus:outline-none"
                  />
                  <button className="text-gray-400 hover:text-gray-600">
                    <Smile className="h-4 w-4" />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Paperclip className="h-4 w-4" />
                  </button>
                  <button className="rounded-lg bg-primary-600 p-2 text-white hover:bg-primary-700">
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-sm text-gray-500">
              Selecciona una conversación para iniciar el chat.
            </div>
          )}
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Integraciones futuras</p>
          <h3 className="text-lg font-semibold text-gray-900">Canales externos</h3>
          <p className="text-sm text-gray-700">
            Este espacio quedará listo para conectar APIs de instalación y WhatsApp.
          </p>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-gray-200 p-4">
            <p className="text-sm font-semibold text-gray-900">API de instalación</p>
            <p className="text-xs text-gray-600 mt-2">
              Sincroniza tickets con instalaciones y despliegues.
            </p>
            <button className="mt-4 rounded-lg border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-600">
              Configurar
            </button>
          </div>
          <div className="rounded-xl border border-gray-200 p-4">
            <p className="text-sm font-semibold text-gray-900">WhatsApp Business</p>
            <p className="text-xs text-gray-600 mt-2">
              Habilita mensajería y notificaciones automáticas.
            </p>
            <button className="mt-4 rounded-lg border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-600">
              Conectar
            </button>
          </div>
        </div>
      </div>
      {selectedUser && showProfile && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40">
          <div className="h-full w-full max-w-md bg-white shadow-xl overflow-y-auto">
            <div className="border-b border-gray-200 px-6 py-4 flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Perfil</p>
                <h3 className="text-lg font-semibold text-gray-900 mt-1">{selectedUser.name}</h3>
                <p className="text-xs text-gray-500">{selectedUser.email}</p>
              </div>
              <button
                onClick={() => setShowProfile(false)}
                className="text-sm font-semibold text-gray-500 hover:text-gray-700"
              >
                Cerrar
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="rounded-2xl border border-gray-200 p-4 bg-gray-50/50">
                <p className="text-xs font-semibold text-gray-500">Empresa</p>
                <p className="text-sm font-semibold text-gray-900 mt-1">{selectedUser.companyName}</p>
                <p className="text-xs text-gray-500 mt-1">Último acceso: {selectedUser.lastLogin}</p>
              </div>
              <div className="rounded-2xl border border-gray-200 p-4">
                <p className="text-xs font-semibold text-gray-500">Acciones rápidas</p>
                <div className="mt-3 space-y-2">
                  <button className="w-full rounded-xl bg-primary-600 text-white py-2 text-sm font-semibold">
                    Resetear contraseña
                  </button>
                  <button className="w-full rounded-xl bg-gray-100 text-gray-700 py-2 text-sm font-semibold">
                    Desbloquear cuenta
                  </button>
                  <button className="w-full rounded-xl border border-gray-200 text-gray-700 py-2 text-sm font-semibold">
                    Reenviar verificación
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SupportCommunicationPage
