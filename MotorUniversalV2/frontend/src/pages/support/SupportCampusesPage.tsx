import { useState } from 'react'
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
  const [expandedState, setExpandedState] = useState<string | null>('Aguascalientes')

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Planteles</p>
          <h2 className="text-2xl font-semibold text-gray-900">Planteles a cargo</h2>
          <p className="text-sm text-gray-700 max-w-2xl">
            Selecciona el estado para revisar los planteles asociados.
          </p>
        </div>
        <button className="rounded-xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white">
          Cargar plantel nuevo
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
          {campusesByState.map((item) => {
            const isOpen = expandedState === item.state
            return (
              <div key={item.state} className="space-y-2">
                <button
                  onClick={() => setExpandedState(isOpen ? null : item.state)}
                  className="w-full flex items-center justify-between rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 shadow-sm"
                >
                  <span className="font-medium text-gray-800">
                    {item.state} <span className="text-gray-500">· Lista de municipios</span>
                  </span>
                  <ChevronDown className={`h-4 w-4 text-gray-500 transition ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="grid gap-2 sm:grid-cols-2">
                    {item.campuses.map((campus) => (
                      <div
                        key={campus}
                        className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-2 text-sm text-gray-700"
                      >
                        {campus}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Nuevo plantel</p>
            <h3 className="text-lg font-semibold text-gray-900 mt-2">Registrar plantel</h3>
            <p className="text-sm text-gray-700 mt-1">
              Captura la información básica para agregar un plantel al sistema.
            </p>
          </div>
          <div className="space-y-3">
            <input
              placeholder="Nombre del plantel"
              className="w-full rounded-xl border border-gray-200 px-4 py-2 text-sm"
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <select className="w-full rounded-xl border border-gray-200 px-4 py-2 text-sm text-gray-700">
                <option>Estado</option>
                {campusesByState.map((item) => (
                  <option key={item.state}>{item.state}</option>
                ))}
              </select>
              <input
                placeholder="Municipio"
                className="w-full rounded-xl border border-gray-200 px-4 py-2 text-sm"
              />
            </div>
            <input
              placeholder="Contacto principal"
              className="w-full rounded-xl border border-gray-200 px-4 py-2 text-sm"
            />
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                placeholder="Correo de contacto"
                className="w-full rounded-xl border border-gray-200 px-4 py-2 text-sm"
              />
              <input
                placeholder="Teléfono"
                className="w-full rounded-xl border border-gray-200 px-4 py-2 text-sm"
              />
            </div>
          </div>
          <button className="w-full rounded-xl bg-primary-600 px-4 py-2 text-sm font-semibold text-white">
            Guardar plantel
          </button>
        </div>
      </div>
    </div>
  )
}

export default SupportCampusesPage
