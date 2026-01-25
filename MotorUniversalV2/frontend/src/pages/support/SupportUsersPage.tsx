import { useMemo, useState } from 'react'
import { Search, Shield, UserCircle2 } from 'lucide-react'
import { mockUsers } from '../../support/mockSupportData'

const SupportUsersPage = () => {
  const [search, setSearch] = useState('')
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)

  const filteredUsers = useMemo(() => {
    if (!search.trim()) return mockUsers
    const query = search.toLowerCase()
    return mockUsers.filter((user) =>
      [user.name, user.email, user.companyName].some((value) =>
        value.toLowerCase().includes(query),
      ),
    )
  }, [search])

  const selectedUser = mockUsers.find((user) => user.id === selectedUserId)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Usuarios</p>
        <h2 className="text-2xl font-semibold text-gray-900">Búsqueda avanzada</h2>
        <p className="text-sm text-gray-600 max-w-2xl">
          Consulta perfiles, estado de cuenta y actividad reciente por email, nombre o empresa.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar por usuario, email o empresa"
            className="w-full rounded-xl border border-gray-200 py-2 pl-9 pr-3 text-sm"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filteredUsers.length === 0 ? (
          <div className="col-span-full rounded-2xl border border-dashed border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
            No encontramos usuarios con ese criterio.
          </div>
        ) : (
          filteredUsers.map((user) => (
            <button
              key={user.id}
              onClick={() => setSelectedUserId(user.id)}
              className="text-left bg-white border border-gray-200 rounded-2xl p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                    <UserCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    user.status === 'active'
                      ? 'bg-emerald-50 text-emerald-600'
                      : user.status === 'locked'
                      ? 'bg-rose-50 text-rose-600'
                      : 'bg-amber-50 text-amber-700'
                  }`}
                >
                  {user.status === 'active' ? 'Activo' : user.status === 'locked' ? 'Bloqueado' : 'Pendiente'}
                </span>
              </div>
              <div className="mt-4 text-xs text-gray-500">
                <p>{user.companyName}</p>
                <p>Último acceso: {user.lastLogin}</p>
              </div>
            </button>
          ))
        )}
      </div>

      {selectedUser && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40">
          <div className="h-full w-full max-w-lg bg-white shadow-xl overflow-y-auto">
            <div className="border-b border-gray-200 px-6 py-4 flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Perfil</p>
                <h3 className="text-lg font-semibold text-gray-900 mt-1">{selectedUser.name}</h3>
                <p className="text-xs text-gray-500">{selectedUser.email}</p>
              </div>
              <button
                onClick={() => setSelectedUserId(null)}
                className="text-sm font-semibold text-gray-500 hover:text-gray-700"
              >
                Cerrar
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div className="rounded-2xl border border-gray-200 p-4 bg-gray-50/50">
                <p className="text-xs font-semibold text-gray-500">Empresa</p>
                <p className="text-sm font-semibold text-gray-900 mt-1">{selectedUser.companyName}</p>
                <p className="text-xs text-gray-500">ID: {selectedUser.id}</p>
              </div>

              <div className="rounded-2xl border border-gray-200 p-4">
                <p className="text-xs font-semibold text-gray-500">Seguridad</p>
                <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                  <Shield className="h-4 w-4 text-primary-600" />
                  Estado: {selectedUser.status}
                </div>
                <p className="text-xs text-gray-500 mt-2">Último acceso: {selectedUser.lastLogin}</p>
              </div>

              <div className="space-y-2">
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
      )}
    </div>
  )
}

export default SupportUsersPage
