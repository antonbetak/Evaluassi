import { useState } from 'react'
import { Mail, Search, SendHorizonal } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { listSupportUsers } from '../../services/supportService'

const SupportUsersPage = () => {
  const [searchInput, setSearchInput] = useState('')
  const [roleFilter, setRoleFilter] = useState('candidato')
  const [appliedSearch, setAppliedSearch] = useState('')
  const [appliedRole, setAppliedRole] = useState('candidato')
  const [mailTarget, setMailTarget] = useState('')

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ['support', 'directory-users', appliedSearch, appliedRole],
    queryFn: () =>
      listSupportUsers({
        search: appliedSearch,
        role: appliedRole,
        page: 1,
        per_page: 50,
      }),
  })

  const users = data?.users || []

  const handleSearch = () => {
    setAppliedSearch(searchInput.trim())
    setAppliedRole(roleFilter)
  }

  const handleQuickMail = (value: string) => {
    setMailTarget(value)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Usuarios</p>
        <h2 className="text-2xl font-semibold text-gray-900">Administración de usuarios</h2>
        <p className="text-sm text-gray-600 max-w-2xl">
          Búsqueda rápida para gestionar cuentas y accesos.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto]">
          <select
            value={roleFilter}
            onChange={(event) => setRoleFilter(event.target.value)}
            className="w-full rounded-xl border border-gray-200 px-4 py-2 text-sm text-gray-600"
          >
            <option value="candidato">Estudiantes</option>
            <option value="responsable">Responsables</option>
            <option value="responsable_partner">Responsables partner</option>
            <option value="">Todos los roles</option>
          </select>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault()
                  handleSearch()
                }
              }}
              placeholder="Usuario, nombre, curp o email"
              className="w-full rounded-xl border border-gray-200 py-2 pl-9 pr-3 text-sm"
            />
          </div>
          <button
            onClick={handleSearch}
            className="rounded-xl bg-primary-600 px-5 py-2 text-sm font-semibold text-white"
          >
            {isFetching ? 'Buscando...' : 'Buscar'}
          </button>
        </div>

        <div className="rounded-xl border border-gray-200 bg-gray-50/40 px-4 py-3 text-xs text-gray-500">
          Ingresa el nombre, usuario o correo de la persona que deseas buscar.
        </div>

        {isLoading && (
          <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
            Cargando usuarios...
          </div>
        )}

        {isError && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            No se pudieron cargar usuarios
            {error instanceof Error ? `: ${error.message}` : ''}
          </div>
        )}

        {!isLoading && !isError && (
          <div className="space-y-3">
            <p className="text-xs text-gray-500">
              {data?.total || 0} resultado(s) en base de datos.
            </p>
            {users.length === 0 ? (
              <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
                No se encontraron estudiantes para esos filtros.
              </div>
            ) : (
              <div className="space-y-2">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{user.full_name || user.username}</p>
                      <p className="text-xs text-gray-500">
                        @{user.username}
                        {user.email ? ` · ${user.email}` : ''}
                        {user.curp ? ` · CURP: ${user.curp}` : ''}
                      </p>
                    </div>
                    <button
                      onClick={() => handleQuickMail(user.email || user.username)}
                      className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 self-start sm:self-auto"
                    >
                      Usar en correo
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <Mail className="h-5 w-5 text-primary-600" />
          <h3 className="text-sm font-semibold text-gray-900">Enviar correo</h3>
        </div>
        <div className="mt-4 space-y-4">
          <input
            value={mailTarget}
            onChange={(event) => setMailTarget(event.target.value)}
            placeholder="Nombre de usuario o correo"
            className="w-full rounded-xl border border-gray-200 px-4 py-2 text-sm"
          />
          <div className="flex flex-wrap gap-2">
            {['Nuevo', 'Registro', 'Reenvío', 'Confirmación'].map((label) => (
              <button
                key={label}
                className="rounded-lg border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50"
              >
                {label}
              </button>
            ))}
          </div>
          <button className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white">
            <SendHorizonal className="h-4 w-4" />
            Enviar correo
          </button>
        </div>
      </div>
    </div>
  )
}

export default SupportUsersPage
