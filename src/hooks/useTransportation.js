import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { transportService } from '../services/transportService'

const BUSES_QUERY_KEY = ['transport', 'buses']
const ROUTES_QUERY_KEY = ['transport', 'routes']
const DRIVERS_QUERY_KEY = ['transport', 'drivers']

export function useBuses() {
  return useQuery({
    queryKey: BUSES_QUERY_KEY,
    queryFn: transportService.listBuses,
    staleTime: 30_000,
    cacheTime: 1000 * 60 * 5,
  })
}

export function useRoutes() {
  return useQuery({
    queryKey: ROUTES_QUERY_KEY,
    queryFn: transportService.listRoutes,
    staleTime: 30_000,
    cacheTime: 1000 * 60 * 5,
  })
}

export function useDrivers() {
  return useQuery({
    queryKey: DRIVERS_QUERY_KEY,
    queryFn: transportService.listDrivers,
    staleTime: 30_000,
    cacheTime: 1000 * 60 * 5,
  })
}

export function useAddBus() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: transportService.addBus,
    onSuccess: () => queryClient.invalidateQueries(BUSES_QUERY_KEY),
  })
}

export function useAddRoute() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: transportService.addRoute,
    onSuccess: () => queryClient.invalidateQueries(ROUTES_QUERY_KEY),
  })
}

export function useAddDriver() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: transportService.addDriver,
    onSuccess: () => queryClient.invalidateQueries(DRIVERS_QUERY_KEY),
  })
}
