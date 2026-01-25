import { useQuery } from '@tanstack/react-query'
import { supportTickets } from '../../data/mockSupportData'

export const useSupportTickets = () => {
  return useQuery({
    queryKey: ['support', 'tickets'],
    queryFn: async () => supportTickets,
    staleTime: 5 * 60 * 1000,
  })
}
