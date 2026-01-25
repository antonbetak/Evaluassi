const SupportUsersPage = () => {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Soporte</p>
        <h2 className="text-2xl font-semibold text-slate-900">Buscar usuario</h2>
        <p className="text-sm text-slate-600">
          Encuentra usuarios para resolver incidencias, restablecer accesos o validar estado.
        </p>
      </div>

      <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-6">
        <p className="text-sm text-slate-600">
          Placeholder de búsqueda de usuarios. Se integrará con el backend de soporte.
        </p>
      </div>
    </div>
  )
}

export default SupportUsersPage
