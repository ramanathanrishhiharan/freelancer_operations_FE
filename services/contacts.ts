import axiosInstance from "@/lib/axios"
import type { Contact, ContactRequest } from "@/types"

export const contactsService = {

  getAll: async (): Promise<Contact[]> => {
    const response = await axiosInstance.get("/contacts")
    return response.data
  },

  create: async (data: ContactRequest): Promise<Contact> => {
    const response = await axiosInstance.post("/contacts", data)
    return response.data
  },

  convertToClient: async (id: number): Promise<Contact> => {
    const response = await axiosInstance.post(`/contacts/convert/${id}`)
    return response.data
  },

}