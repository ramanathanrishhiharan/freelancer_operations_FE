import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { contactsService } from "@/services/contacts"
import type { ContactRequest } from "@/types"

export function useContacts() {
  return useQuery({
    queryKey: ["contacts"],
    queryFn: contactsService.getAll,
  })
}

export function useCreateContact() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: ContactRequest) => contactsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] })
    },
  })
}

export function useConvertContact() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => contactsService.convertToClient(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] })
    },
  })
}