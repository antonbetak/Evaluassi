import { useSupportCertificates } from '../../hooks/support/useSupportCertificates'
import { Search } from 'lucide-react'

const SupportCertificatesPage = () => {
  const { data: certificates = [] } = useSupportCertificates()

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Certificados</p>
        <h2 className="text-2xl font-semibold text-gray-900">Gestión de certificados</h2>
        <p className="text-sm text-gray-600 max-w-2xl">
          Administra folios y solicitudes relacionadas con emisión y revocación.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              className="w-full rounded-xl border border-gray-200 py-2 pl-9 pr-3 text-sm"
              placeholder="Buscar folio de certificado"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="rounded-xl bg-primary-600 text-white px-4 py-2 text-sm font-semibold">
              Reemitir
            </button>
            <button className="rounded-xl border border-gray-200 text-gray-700 px-4 py-2 text-sm font-semibold">
              Invalidar
            </button>
            <button className="rounded-xl border border-gray-200 text-gray-700 px-4 py-2 text-sm font-semibold">
              Regenerar PDF
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900">Certificados recientes</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Folio</th>
                <th className="px-6 py-3 text-left font-semibold">Candidato</th>
                <th className="px-6 py-3 text-left font-semibold">Fecha emisión</th>
                <th className="px-6 py-3 text-left font-semibold">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {certificates.map((certificate) => (
                <tr key={certificate.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold text-gray-900">{certificate.folio}</td>
                  <td className="px-6 py-4 text-gray-600">{certificate.candidate}</td>
                  <td className="px-6 py-4 text-gray-600">{certificate.issuedAt}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
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
