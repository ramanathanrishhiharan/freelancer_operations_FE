import { number, string } from "zod";

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
