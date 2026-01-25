import { useQuery } from '@tanstack/react-query'
import { supportCertificates } from '../../data/mockSupportData'

export const useSupportCertificates = () => {
  return useQuery({
    queryKey: ['support', 'certificates'],
    queryFn: async () => supportCertificates,
    staleTime: 5 * 60 * 1000,
  })
}
