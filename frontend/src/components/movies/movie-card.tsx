"use client"

import { Movie } from "@/lib/types"

interface MovieCardProps {
  movie: Movie
  onClick: (movieId: number) => void
}

export function MovieCard({ movie, onClick }: MovieCardProps) {
  return (
    <div
      onClick={() => onClick(movie.id)}
      className="cursor-pointer bg-neutral-800 rounded-lg overflow-hidden hover:ring-2 hover:ring-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all group"
    >
      <div className="overflow-hidden">
        <img
          src={movie.poster_url}
          alt={movie.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-white group-hover:text-primary transition-colors">
          {movie.title}
        </h2>
        <p className="text-sm text-neutral-400 mt-1 line-clamp-2">
          {movie.description}
        </p>
      </div>
    </div>
  )
}
