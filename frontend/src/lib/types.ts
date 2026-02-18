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
