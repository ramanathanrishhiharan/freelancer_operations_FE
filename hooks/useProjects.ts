import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { projectsService } from "@/services/projects"
import type { ProjectRequest } from "@/types"

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: projectsService.getAll,
  })
}

export function useProject(id: number) {
  return useQuery({
    queryKey: ["projects", id],
    queryFn: () => projectsService.getById(id),
  })
}

export function useCreateProject() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: ProjectRequest) => projectsService.create(data),
    onSuccess: () => {
      // after creating — refetch the list automatically
      queryClient.invalidateQueries({ queryKey: ["projects"] })
    },
  })
}

export function useUpdateProject(id: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: ProjectRequest) => projectsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
    },
  })
}

export function useDeleteProject() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => projectsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
    },
  })
}