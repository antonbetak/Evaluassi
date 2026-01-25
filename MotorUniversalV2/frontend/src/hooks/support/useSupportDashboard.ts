import { useQuery } from '@tanstack/react-query'
import { supportDashboardKpis, supportIncidents } from '../../data/mockSupportData'

export const useSupportDashboard = () => {
  return useQuery({
    queryKey: ['support', 'dashboard'],
    queryFn: async () => ({
      kpis: supportDashboardKpis,
      incidents: supportIncidents,
    }),
    staleTime: 5 * 60 * 1000,
  })
}
