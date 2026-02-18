"use client"

import { Movie } from "@/lib/types"
import { MovieCard } from "./movie-card"

interface MovieGridProps {
  movies: Movie[]
  onMovieClick: (movieId: number) => void
}

export function MovieGrid({ movies, onMovieClick }: MovieGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onClick={onMovieClick} />
      ))}
    </div>
  )
}
