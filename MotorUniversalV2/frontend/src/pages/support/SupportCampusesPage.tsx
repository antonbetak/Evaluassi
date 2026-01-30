import { ChevronDown } from 'lucide-react'

const campusesByState = [
  {
    state: 'Aguascalientes',
    campuses: ['Edut Centro', 'Edut Norte'],
  },
  {
    state: 'Chiapas',
    campuses: ['Campus Tuxtla', 'Campus San Cristóbal'],
  },
  {
    state: 'Ciudad de México',
    campuses: ['Plantel Roma', 'Plantel Reforma'],
  },
  {
    state: 'Nayarit',
    campuses: ['Plantel Tepic', 'Plantel Bahía'],
  },
  {
    state: 'Oaxaca',
    campuses: ['Plantel Centro Histórico', 'Plantel Monte Albán'],
  },
  {
    state: 'Puebla',
    campuses: ['Plantel Angelópolis', 'Plantel Cholula'],
  },
  {
    state: 'Tlaxcala',
    campuses: ['Plantel Tlaxcala Norte', 'Plantel Tlaxcala Sur'],
  },
  {
    state: 'Veracruz de Ignacio de la Llave',
    campuses: ['Plantel Veracruz Puerto', 'Plantel Xalapa'],
  },
  {
    state: 'Yucatán',
    campuses: ['Plantel Mérida', 'Plantel Valladolid'],
  },
]

const SupportCampusesPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Planteles</p>
          <h2 className="text-2xl font-semibold text-gray-900">Planteles a cargo</h2>
          <p className="text-sm text-gray-600 max-w-2xl">
            Selecciona el estado para revisar los planteles asociados.
          </p>
        </div>
        <button className="rounded-xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white">
          Cargar plantel nuevo
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
        {campusesByState.map((item) => (
          <div key={item.state} className="space-y-2">
            <div className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-600 shadow-sm">
              <span>
                {item.state} <span className="text-gray-400">· Lista de municipios</span>
              </span>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {item.campuses.map((campus) => (
                <div
                  key={campus}
                  className="rounded-xl border border-gray-100 bg-gray-50/40 px-4 py-2 text-xs text-gray-500"
                >
                  {campus}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SupportCampusesPage
