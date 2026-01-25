import { useSupportCertificates } from '../../hooks/support/useSupportCertificates'

const SupportCertificatesPage = () => {
  const { data: certificates = [] } = useSupportCertificates()

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Soporte</p>
        <h2 className="text-2xl font-semibold text-slate-900">Certificados</h2>
        <p className="text-sm text-slate-600">
          Consulta certificados por folio y ejecuta acciones rápidas (mock).
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="flex-1">
          <label className="text-xs font-semibold text-slate-500">Buscar por folio</label>
          <input
            className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="CERT-2024-XXXX"
          />
        </div>
        <div className="flex gap-2">
          <button className="rounded-xl bg-primary-600 text-white px-4 py-2 text-sm font-semibold">
            Reissue (mock)
          </button>
          <button className="rounded-xl border border-slate-200 text-slate-700 px-4 py-2 text-sm font-semibold">
            Invalidar (mock)
          </button>
          <button className="rounded-xl border border-slate-200 text-slate-700 px-4 py-2 text-sm font-semibold">
            Regenerar PDF (mock)
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="text-sm font-semibold text-slate-900">Certificados recientes</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Folio</th>
                <th className="px-6 py-3 text-left font-semibold">Candidato</th>
                <th className="px-6 py-3 text-left font-semibold">Fecha emisión</th>
                <th className="px-6 py-3 text-left font-semibold">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {certificates.map((certificate) => (
                <tr key={certificate.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-semibold text-slate-900">{certificate.folio}</td>
                  <td className="px-6 py-4 text-slate-600">{certificate.candidate}</td>
                  <td className="px-6 py-4 text-slate-600">{certificate.issuedAt}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full ${
                        certificate.status === 'issued'
                          ? 'bg-emerald-50 text-emerald-600'
                          : certificate.status === 'pending'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-rose-50 text-rose-600'
                      }`}
                    >
                      {certificate.status === 'issued'
                        ? 'Emitido'
                        : certificate.status === 'pending'
                        ? 'Pendiente'
                        : 'Revocado'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default SupportCertificatesPage
