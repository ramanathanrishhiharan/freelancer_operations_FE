"use client"

import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { authService } from "@/services/auth"
import { saveToken, clearToken } from "@/lib/auth"
import type { LoginRequest, RegisterRequest } from "@/types"

export function useLogin() {
  const router = useRouter()

  return useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),

    onSuccess: (response) => {
      saveToken(response.token)       // saves to localStorage + cookie
      toast.success(`Welcome back, ${response.name}!`)
      router.push("/dashboard")       // redirect after login
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ?? "Invalid email or password"
      )
    },
  })
}

export function useRegister() {
  const router = useRouter()

  return useMutation({
    mutationFn: (data: RegisterRequest) => authService.register(data),

    onSuccess: (response) => {
      toast.success(`Account created! Welcome, ${response.name}`)
      router.push("/auth/login")      // after register → go to login
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ?? "Registration failed. Try again."
      )
    },
  })
}

export function useLogout() {
  const router = useRouter()

  return () => {
    clearToken()
    router.push("/auth/login")
  }
}