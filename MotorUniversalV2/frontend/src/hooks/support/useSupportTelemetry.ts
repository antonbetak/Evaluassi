import { useQuery } from '@tanstack/react-query'
import { supportTelemetry } from '../../data/mockSupportData'

export const useSupportTelemetry = () => {
  return useQuery({
    queryKey: ['support', 'telemetry'],
    queryFn: async () => supportTelemetry,
    staleTime: 2 * 60 * 1000,
  })
}
