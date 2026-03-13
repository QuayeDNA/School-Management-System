import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { transactionService } from '../services/transactionService'

const TRANSACTIONS_QUERY_KEY = ['transactions']

export function useTransactions() {
  return useQuery({
    queryKey: TRANSACTIONS_QUERY_KEY,
    queryFn: transactionService.list,
    staleTime: 30_000,
    cacheTime: 1000 * 60 * 5,
  })
}

export function useAddTransaction() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: transactionService.add,
    onSuccess: () => queryClient.invalidateQueries(TRANSACTIONS_QUERY_KEY),
  })
}

export function useDeleteTransaction() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: transactionService.delete,
    onSuccess: () => queryClient.invalidateQueries(TRANSACTIONS_QUERY_KEY),
  })
}
