import { Mail, Search, SendHorizonal } from 'lucide-react'

const SupportUsersPage = () => {
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
          <select className="w-full rounded-xl border border-gray-200 px-4 py-2 text-sm text-gray-600">
            <option>Elige subsistema</option>
            <option>Edut</option>
            <option>2CC</option>
            <option>UVP</option>
            <option>Universidad Veracruzana</option>
            <option>Certificaciones</option>
          </select>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              placeholder="Usuario, nombre, curp o email"
              className="w-full rounded-xl border border-gray-200 py-2 pl-9 pr-3 text-sm"
            />
          </div>
          <button className="rounded-xl bg-primary-600 px-5 py-2 text-sm font-semibold text-white">
            Buscar
          </button>
        </div>

        <div className="rounded-xl border border-gray-200 bg-gray-50/40 px-4 py-3 text-xs text-gray-500">
          Ingresa el nombre, usuario o correo de la persona que deseas buscar.
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <Mail className="h-5 w-5 text-primary-600" />
          <h3 className="text-sm font-semibold text-gray-900">Enviar correo</h3>
        </div>
        <div className="mt-4 space-y-4">
          <input
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
