import { useQuery } from '@tanstack/react-query'
import { supportVouchers } from '../../data/mockSupportData'

export const useSupportVouchers = () => {
  return useQuery({
    queryKey: ['support', 'vouchers'],
    queryFn: async () => supportVouchers,
    staleTime: 5 * 60 * 1000,
  })
}
