import { useMemo, useState } from 'react'
import { useSupportUsers } from '../../hooks/support/useSupportUsers'

const SupportUsersPage = () => {
  const { data: users = [] } = useSupportUsers()
  const [search, setSearch] = useState({
    email: '',
    name: '',
    curp: '',
    id: '',
  })
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesEmail = user.email.toLowerCase().includes(search.email.toLowerCase())
      const matchesName = user.name.toLowerCase().includes(search.name.toLowerCase())
      const matchesCurp = user.curp.toLowerCase().includes(search.curp.toLowerCase())
      const matchesId = user.id.toLowerCase().includes(search.id.toLowerCase())
      return matchesEmail && matchesName && matchesCurp && matchesId
    })
  }, [users, search])

  const selectedUser = users.find((user) => user.id === selectedUserId)

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Soporte</p>
        <h2 className="text-2xl font-semibold text-slate-900">Buscar usuario</h2>
        <p className="text-sm text-slate-600">
          Encuentra usuarios por email, nombre, CURP o identificador interno.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            { label: 'Email', key: 'email' },
            { label: 'Nombre', key: 'name' },
            { label: 'CURP', key: 'curp' },
            { label: 'ID', key: 'id' },
          ].map((field) => (
            <div key={field.key}>
              <label className="text-xs font-semibold text-slate-500">{field.label}</label>
              <input
                value={search[field.key as keyof typeof search]}
                onChange={(event) =>
                  setSearch((prev) => ({ ...prev, [field.key]: event.target.value }))
                }
                placeholder={`Buscar ${field.label.toLowerCase()}`}
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Resultados</h3>
            <p className="text-xs text-slate-500">{filteredUsers.length} usuarios encontrados</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Usuario</th>
                <th className="px-6 py-3 text-left font-semibold">Email</th>
                <th className="px-6 py-3 text-left font-semibold">CURP</th>
                <th className="px-6 py-3 text-left font-semibold">Estado</th>
                <th className="px-6 py-3 text-left font-semibold">Último acceso</th>
                <th className="px-6 py-3 text-left font-semibold">Intentos</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-slate-900">{user.name}</td>
                  <td className="px-6 py-4 text-slate-600">{user.email}</td>
                  <td className="px-6 py-4 text-slate-600">{user.curp}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full ${
                        user.status === 'active'
                          ? 'bg-emerald-50 text-emerald-600'
                          : user.status === 'locked'
                          ? 'bg-rose-50 text-rose-600'
                          : 'bg-amber-50 text-amber-600'
                      }`}
                    >
                      {user.status === 'active'
                        ? 'Activo'
                        : user.status === 'locked'
                        ? 'Bloqueado'
                        : 'Pendiente'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{user.lastLogin}</td>
                  <td className="px-6 py-4 text-slate-600">{user.loginAttempts}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      className="text-primary-600 text-xs font-semibold hover:text-primary-700"
                      onClick={() => setSelectedUserId(user.id)}
                    >
                      Ver detalle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedUser && (
        <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
          <div className="bg-white w-full max-w-lg h-full shadow-xl p-6 overflow-y-auto">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Detalle del usuario</h3>
                <p className="text-sm text-slate-500">{selectedUser.email}</p>
              </div>
              <button
                onClick={() => setSelectedUserId(null)}
                className="text-slate-500 hover:text-slate-700"
              >
                Cerrar
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-500">Información general</p>
                <p className="text-sm font-semibold text-slate-900">{selectedUser.name}</p>
                <p className="text-xs text-slate-600">CURP: {selectedUser.curp}</p>
                <p className="text-xs text-slate-600">ID: {selectedUser.id}</p>
              </div>

              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-500">Estatus de cuenta</p>
                <p className="text-sm font-semibold text-slate-900 capitalize">
                  {selectedUser.status}
                </p>
                <p className="text-xs text-slate-600">Último acceso: {selectedUser.lastLogin}</p>
                <p className="text-xs text-slate-600">
                  Intentos fallidos: {selectedUser.loginAttempts}
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-500">Historial de intentos de login</p>
                <ul className="mt-2 space-y-2 text-xs text-slate-600">
                  <li>Hoy 09:12 - Login exitoso</li>
                  <li>Ayer 19:42 - Intento fallido</li>
                  <li>Ayer 19:41 - Intento fallido</li>
                </ul>
              </div>

              <div className="space-y-2">
                <button className="w-full rounded-xl bg-primary-600 text-white py-2 text-sm font-semibold">
                  Reset password (mock)
                </button>
                <button className="w-full rounded-xl bg-slate-100 text-slate-700 py-2 text-sm font-semibold">
                  Unlock account (mock)
                </button>
                <button className="w-full rounded-xl border border-slate-200 text-slate-700 py-2 text-sm font-semibold">
                  Resend verification (mock)
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
