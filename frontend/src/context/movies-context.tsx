"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react"
import type { Movie } from "@/lib/types"

interface MoviesContextValue {
  /** Movies currently loaded on the page */
  movies: Movie[]
  /** Called by the movies page whenever it loads new data */
  setMovies: (movies: Movie[]) => void
}

const MoviesContext = createContext<MoviesContextValue | undefined>(undefined)

export function MoviesProvider({ children }: { children: ReactNode }) {
  const [movies, setMoviesState] = useState<Movie[]>([])

  const setMovies = useCallback((m: Movie[]) => {
    setMoviesState(m)
  }, [])

  return (
    <MoviesContext.Provider value={{ movies, setMovies }}>
      {children}
    </MoviesContext.Provider>
  )
}

export function useMovies(): MoviesContextValue {
  const ctx = useContext(MoviesContext)
  if (!ctx) {
    throw new Error("useMovies must be used within a <MoviesProvider>")
  }
  return ctx
}
