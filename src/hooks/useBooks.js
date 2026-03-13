import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { bookService } from '../services/bookService'

const BOOKS_QUERY_KEY = ['books']

export function useBooks() {
  return useQuery({
    queryKey: BOOKS_QUERY_KEY,
    queryFn: bookService.list,
    staleTime: 30_000,
    cacheTime: 1000 * 60 * 5,
  })
}

export function useAddBook() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: bookService.add,
    onSuccess: () => queryClient.invalidateQueries(BOOKS_QUERY_KEY),
  })
}

export function useUpdateBook() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) => bookService.update(id, data),
    onSuccess: () => queryClient.invalidateQueries(BOOKS_QUERY_KEY),
  })
}

export function useDeleteBook() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: bookService.delete,
    onSuccess: () => queryClient.invalidateQueries(BOOKS_QUERY_KEY),
  })
}
