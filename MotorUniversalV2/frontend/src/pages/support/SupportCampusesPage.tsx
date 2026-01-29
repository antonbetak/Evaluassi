import { ChevronDown } from 'lucide-react'

const stateOptions = [
  'Aguascalientes',
  'Chiapas',
  'Ciudad de México',
  'Nayarit',
  'Oaxaca',
  'Puebla',
  'Tlaxcala',
  'Veracruz de Ignacio de la Llave',
  'Yucatán',
]

const SupportCampusesPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Planteles</p>
        <h2 className="text-2xl font-semibold text-gray-900">Planteles a cargo</h2>
        <p className="text-sm text-gray-600 max-w-2xl">
          Selecciona el estado para revisar los planteles asociados.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
        {stateOptions.map((state) => (
          <div
            key={state}
            className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-600 shadow-sm"
          >
            <span>
              {state} <span className="text-gray-400">· Lista de municipios</span>
            </span>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default SupportCampusesPage
