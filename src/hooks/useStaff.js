import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { staffService } from '../services/staffService'

const STAFF_QUERY_KEY = ['staff']

export function useStaff() {
  return useQuery({
    queryKey: STAFF_QUERY_KEY,
    queryFn: staffService.list,
    staleTime: 30_000,
    cacheTime: 1000 * 60 * 5,
  })
}

export function useAddStaff() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: staffService.add,
    onSuccess: () => queryClient.invalidateQueries(STAFF_QUERY_KEY),
  })
}

export function useDeleteStaff() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: staffService.delete,
    onSuccess: () => queryClient.invalidateQueries(STAFF_QUERY_KEY),
  })
}

export function useUpdateStaff() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) => staffService.update(id, data),
    onSuccess: () => queryClient.invalidateQueries(STAFF_QUERY_KEY),
  })
}

export function useSeedStaff() {
  const queryClient = useQueryClient()

  return async (defaults) => {
    await Promise.all(defaults.map((item) => staffService.add({ ...item, syncStatus: 'synced' })));
    queryClient.invalidateQueries(STAFF_QUERY_KEY)
  }
}
