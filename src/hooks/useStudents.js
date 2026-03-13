import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { studentService } from '../services/studentService'

const STUDENTS_QUERY_KEY = (gradeId) => ['students', gradeId]

export function useStudents(gradeId) {
  return useQuery({
    queryKey: STUDENTS_QUERY_KEY(gradeId),
    queryFn: () => studentService.listByGrade(gradeId),
    enabled: Boolean(gradeId),
    staleTime: 30_000,
    cacheTime: 1000 * 60 * 5,
  })
}

export function useAddStudent() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: studentService.add,
    onSuccess: (_, variables) => {
      if (variables?.gradeId) {
        queryClient.invalidateQueries(STUDENTS_QUERY_KEY(variables.gradeId))
      }
    },
  })
}

export function useUpdateStudent() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) => studentService.update(id, data),
    onSuccess: (_, variables) => {
      if (variables?.data?.gradeId) {
        queryClient.invalidateQueries(STUDENTS_QUERY_KEY(variables.data.gradeId))
      }
    },
  })
}

export function useDeleteStudent() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: studentService.delete,
    onSuccess: () => {
      // Invalidate all student queries since we don't know which grade it was in.
      queryClient.invalidateQueries(['students'])
    },
  })
}
