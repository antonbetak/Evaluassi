import { useQuery } from '@tanstack/react-query'
import { supportTickets } from '../../data/mockSupportData'
import { mockTickets } from '../../support/mockSupportData'
import { isSupportPreviewEnabled } from '../../support/supportPreview'

export const useSupportTickets = () => {
  return useQuery({
    queryKey: ['support', 'tickets'],
    queryFn: async () => {
      if (isSupportPreviewEnabled()) {
        return mockTickets.map((ticket) => ({
          id: ticket.id,
          subject: ticket.message,
          status: ticket.status === 'solved' ? 'closed' : ticket.status,
          priority: ticket.priority,
          createdAt: ticket.createdAt,
          requester: ticket.email,
        }))
      }
      return supportTickets
    },
    staleTime: 5 * 60 * 1000,
  })
}
