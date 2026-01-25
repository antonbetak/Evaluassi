import { useSupportVouchers } from '../../hooks/support/useSupportVouchers'

const SupportVouchersPage = () => {
  const { data: vouchers = [] } = useSupportVouchers()

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Soporte</p>
        <h2 className="text-2xl font-semibold text-slate-900">Vouchers</h2>
        <p className="text-sm text-slate-600">
          Buscar, liberar o validar vouchers asociados a candidatos.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex-1">
            <label className="text-xs font-semibold text-slate-500">Buscar voucher</label>
            <input
              className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Código o email"
            />
          </div>
          <div className="flex gap-2">
            <button className="rounded-xl bg-primary-600 text-white px-4 py-2 text-sm font-semibold">
              Liberar (mock)
            </button>
            <button className="rounded-xl border border-slate-200 text-slate-700 px-4 py-2 text-sm font-semibold">
              Validar (mock)
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="text-sm font-semibold text-slate-900">Vouchers recientes</h3>
          <p className="text-xs text-slate-500">Estado por voucher</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Código</th>
                <th className="px-6 py-3 text-left font-semibold">Asignado a</th>
                <th className="px-6 py-3 text-left font-semibold">Expira</th>
                <th className="px-6 py-3 text-left font-semibold">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {vouchers.map((voucher) => (
                <tr key={voucher.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-semibold text-slate-900">{voucher.code}</td>
                  <td className="px-6 py-4 text-slate-600">{voucher.assignedTo}</td>
                  <td className="px-6 py-4 text-slate-600">{voucher.expiresAt}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full ${
                        voucher.status === 'activo'
                          ? 'bg-emerald-50 text-emerald-600'
                          : voucher.status === 'usado'
                          ? 'bg-slate-100 text-slate-600'
                          : 'bg-rose-50 text-rose-600'
                      }`}
                    >
                      {voucher.status}
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

export default SupportVouchersPage
