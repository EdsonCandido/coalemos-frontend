import type { ApiResponse } from "@/types/types"
import { http } from "./http"


export interface Client {
  id: string
  name: string
  email: string
}

export const ClientsService = {
  async getAll(): Promise<ApiResponse<Client[]>> {
    const response = await http.get<ApiResponse<Client[]>>("/clients")
    return response.data
  },

  async getById(id: string): Promise<ApiResponse<Client>> {
    const response = await http.get<ApiResponse<Client>>(`/clients/${id}`)
    return response.data
  },

  async create(client: Omit<Client, "id">): Promise<ApiResponse<Client>> {
    const response = await http.post<ApiResponse<Client>>("/clients", client)
    return response.data
  },

  async update(id: string, client: Omit<Client, "id">): Promise<ApiResponse<Client>> {
    const response = await http.put<ApiResponse<Client>>(`/clients/${id}`, client)
    return response.data
  },

  async delete(id: string): Promise<ApiResponse<null>> {
    const response = await http.delete<ApiResponse<null>>(`/clients/${id}`)
    return response.data
  },
}
