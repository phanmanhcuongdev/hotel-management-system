import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { propertyApi } from '../../../api/property'
import type { PropertyProfile, UpdatePropertyProfileRequest } from '../../../types'

export function usePropertyProfile(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['property-profile'],
    queryFn: (): Promise<PropertyProfile> => propertyApi.getProfile(),
    enabled: options?.enabled ?? true,
  })
}

export function useUpdatePropertyProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdatePropertyProfileRequest) => propertyApi.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['property-profile'] })
    },
  })
}
