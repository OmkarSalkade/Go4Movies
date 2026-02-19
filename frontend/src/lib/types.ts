// Shared type definitions for the application

export interface Movie {
  id: number
  title: string
  description: string
  poster_url: string
}

export interface Location {
  id: number
  zipcode: string
  city: string
  state: string
  country: string
}

export interface User {
  id: number
  email: string
  username: string
  full_name: string
  phone: string | null
  created_at: string
  updated_at: string
}

export interface RegisterPayload {
  email: string
  username: string
  password: string
  full_name: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface AuthSuccessResponse {
  message: string
  user: User
}
