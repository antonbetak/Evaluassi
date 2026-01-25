import { Building2, MapPin } from 'lucide-react'
import { mockCompanies } from '../../support/mockSupportData'

const SupportCampusesPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Planteles a cargo</p>
        <h2 className="text-2xl font-semibold text-gray-900">Instituciones y planteles</h2>
        <p className="text-sm text-gray-600 max-w-2xl">
          Visualiza los planteles activos y su carga operativa dentro del módulo de soporte.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {mockCompanies.map((company) => (
          <div key={company.id} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{company.name}</p>
                  <p className="text-xs text-gray-500">{company.industry}</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-gray-500">{company.activeTickets} tickets</span>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
              <MapPin className="h-3.5 w-3.5" />
              Planteles activos
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SupportCampusesPage
