import axiosInstance from "@/lib/axios"
import type { Project, ProjectRequest } from "@/types"

export const projectsService = {

  getAll: async (): Promise<Project[]> => {
    const response = await axiosInstance.get("/projects")
    return response.data
  },

  getById: async (id: number): Promise<Project> => {
    const response = await axiosInstance.get(`/projects/${id}`)
    return response.data
  },

  create: async (data: ProjectRequest): Promise<Project> => {
    const response = await axiosInstance.post("/projects", data)
    return response.data
  },

  update: async (id: number, data: ProjectRequest): Promise<Project> => {
    const response = await axiosInstance.put(`/projects/${id}`, data)
    return response.data
  },

  delete: async (id: number): Promise<string> => {
    const response = await axiosInstance.delete(`/projects/${id}`)
    return response.data
  },

}