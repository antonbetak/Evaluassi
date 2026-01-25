import { useQuery } from '@tanstack/react-query'
import { supportUsers } from '../../data/mockSupportData'

export const useSupportUsers = () => {
  return useQuery({
    queryKey: ['support', 'users'],
    queryFn: async () => supportUsers,
    staleTime: 5 * 60 * 1000,
  })
}
