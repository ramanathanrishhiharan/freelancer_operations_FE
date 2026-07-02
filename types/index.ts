
export type ProjectStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
export type LeadStatus = "NEW" | "CONTACTED" | "QUALIFIED" | "CONVERTED" | "LOST"
export type ContactType = "LEAD" | "CLIENT"

export interface Project {
  id: number;
  name: string;
  description: string;
  status: ProjectStatus;
  contactId: number;
  contactName: string;
}

export interface Contact {
  id: number
  name: string
  email: string
  company: string
  type: ContactType
  status: LeadStatus
}

export interface AuthUser {
  id: number
  name: string
  email: string
}

export interface AuthResponse {
  token: string
  userId: number
  name: string
  email: string
}

export interface ApiError {
  message: string
  status: number
}

// ─── Request Bodies ───────────────────────────────────────
export interface RegisterRequest {
  name: string
  email: string
  password: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface ContactRequest {
  name: string
  email: string
  company: string
  type: ContactType        // reusing your union type
}

export interface ProjectRequest {
  name: string
  description: string
  status: ProjectStatus    // reusing your union type
  contactId: number
}