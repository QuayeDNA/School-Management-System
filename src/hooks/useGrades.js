import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { gradeService } from '../services/gradeService'

const GRADES_QUERY_KEY = ['grades']

export function useGrades() {
  return useQuery({
    queryKey: GRADES_QUERY_KEY,
    queryFn: gradeService.list,
    staleTime: 30_000,
    cacheTime: 1000 * 60 * 5,
  })
}

export function useAddGrade() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: gradeService.add,
    onSuccess: () => {
      queryClient.invalidateQueries(GRADES_QUERY_KEY)
    },
  })
}

export function useDeleteGrade() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: gradeService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries(GRADES_QUERY_KEY)
    },
  })
}
