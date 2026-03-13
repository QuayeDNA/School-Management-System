import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { inventoryService } from '../services/inventoryService'

const INVENTORY_QUERY_KEY = ['inventory']

export function useInventory() {
  return useQuery({
    queryKey: INVENTORY_QUERY_KEY,
    queryFn: inventoryService.list,
    staleTime: 30_000,
    cacheTime: 1000 * 60 * 5,
  })
}

export function useAddInventory() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: inventoryService.add,
    onSuccess: () => queryClient.invalidateQueries(INVENTORY_QUERY_KEY),
  })
}

export function useUpdateInventory() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) => inventoryService.update(id, data),
    onSuccess: () => queryClient.invalidateQueries(INVENTORY_QUERY_KEY),
  })
}

export function useDeleteInventory() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: inventoryService.delete,
    onSuccess: () => queryClient.invalidateQueries(INVENTORY_QUERY_KEY),
  })
}
