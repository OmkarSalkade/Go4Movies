// API client for backend communication
// Centralizes all fetch calls so endpoints and error handling live in one place.

import { Movie, Location } from "./types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

/**
 * Fetch all locations (zip codes) from the backend.
 */
export async function fetchLocations(): Promise<Location[]> {
  const response = await fetch(`${API_BASE_URL}/api/v1/locations`)
  if (!response.ok) {
    throw new Error("Failed to fetch locations")
  }
  const data = await response.json()
  return data.locations
}

/**
 * Fetch movies for a given zip code.
 */
export async function fetchMoviesByZipCode(zipCode: string): Promise<Movie[]> {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/movies?zipcode=${zipCode}`
  )
  if (!response.ok) {
    throw new Error("Failed to fetch movies")
  }
  return response.json()
}

/**
 * Fetch a single movie by ID.
 */
export async function fetchMovieById(movieId: string): Promise<Movie> {
  const response = await fetch(`${API_BASE_URL}/api/v1/movies/${movieId}`)
  if (!response.ok) {
    throw new Error("Movie not found")
  }
  return response.json()
}
