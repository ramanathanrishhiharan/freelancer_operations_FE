import axiosInstance from "@/lib/axios";
import type { LoginRequest, RegisterRequest, AuthUser, AuthResponse } from "@/types"
import { AsyncResource } from "async_hooks";

export const authService ={
    register :async (data:RegisterRequest):Promise<AuthUser>=>{
        const response =await axiosInstance.post("/auth/register",data)
        return response.data
    },
    login :async(data:LoginRequest):Promise<AuthResponse>=>{
        const response = await axiosInstance.post("/auth/login",data)
        return response.data
    }
}