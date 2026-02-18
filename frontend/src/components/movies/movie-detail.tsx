"use client"

import { Movie } from "@/lib/types"

interface MovieDetailProps {
  movie: Movie
  onBookTickets: () => void
}

export function MovieDetail({ movie, onBookTickets }: MovieDetailProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={movie.poster_url}
          alt={movie.title}
          className="w-full md:w-1/3 h-96 object-cover rounded-lg shadow-lg"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4 text-white">{movie.title}</h1>
          <p className="text-lg mb-6 text-neutral-300">{movie.description}</p>
          <button
            onClick={onBookTickets}
            className="bg-primary text-white px-8 py-3 rounded-lg hover:brightness-110 transition-all font-semibold shadow-lg shadow-primary/20"
          >
            Book Tickets
          </button>
        </div>
      </div>
    </div>
  )
}
