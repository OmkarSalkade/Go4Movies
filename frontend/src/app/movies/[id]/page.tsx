"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Movie } from "@/lib/types"
import { fetchMovieById } from "@/lib/api"
import { MovieDetail } from "@/components/movies/movie-detail"

export default function MoviePage() {
  const params = useParams()
  const router = useRouter()
  const [movie, setMovie] = useState<Movie | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const movieId = params.id as string

    fetchMovieById(movieId)
      .then((data) => {
        setMovie(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching movie:", error)
        router.push("/movies")
      })
  }, [params.id, router])

  const handleBookTickets = () => {
    // In real app, navigate to booking page
    alert("Booking tickets for " + movie?.title)
  }

  if (loading) {
    return <div className="container mx-auto p-4">Loading movie...</div>
  }

  if (!movie) {
    return <div className="container mx-auto p-4">Movie not found</div>
  }

  return <MovieDetail movie={movie} onBookTickets={handleBookTickets} />
}