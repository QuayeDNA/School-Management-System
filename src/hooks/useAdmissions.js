import { useMutation } from '@tanstack/react-query'
import { admissionsService } from '../services/admissionsService'

export function useAddAdmission() {
  return useMutation({
    mutationFn: admissionsService.add,
  })
}
