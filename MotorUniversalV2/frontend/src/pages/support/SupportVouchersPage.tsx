import { useSupportVouchers } from '../../hooks/support/useSupportVouchers'
import { Tag } from 'lucide-react'

const SupportVouchersPage = () => {
  const { data: vouchers = [] } = useSupportVouchers()

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Vouchers</p>
        <h2 className="text-2xl font-semibold text-gray-900">Control de vouchers</h2>
        <p className="text-sm text-gray-600 max-w-2xl">
          Administra códigos, caducidades y asignaciones para evaluaciones.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {vouchers.map((voucher) => (
          <div key={voucher.id} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-gray-500">Código</p>
                <p className="text-lg font-semibold text-gray-900 mt-1">{voucher.code}</p>
              </div>
              <span
                className={`text-xs font-semibold rounded-full px-3 py-1 ${
                  voucher.status === 'activo'
                    ? 'bg-emerald-50 text-emerald-600'
                    : voucher.status === 'usado'
                    ? 'bg-amber-50 text-amber-700'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {voucher.status}
              </span>
            </div>
            <div className="mt-4 text-xs text-gray-500 space-y-1">
              <p>Asignado a: {voucher.assignedTo}</p>
              <p>Expira: {voucher.expiresAt}</p>
            </div>
            <button className="mt-4 inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">
              <Tag className="h-4 w-4" />
              Reasignar voucher
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SupportVouchersPage
