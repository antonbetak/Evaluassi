import { useQuery } from '@tanstack/react-query'
import { listTickets } from '../../services/supportService'

export const useSupportTickets = () => {
  return useQuery({
    queryKey: ['support', 'tickets'],
    queryFn: async () => listTickets(),
    staleTime: 5 * 60 * 1000,
  })
}
