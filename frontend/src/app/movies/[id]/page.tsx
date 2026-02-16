"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"

interface Movie {
  id: number
  title: string
  description: string
  poster_url: string
}

export default function MoviePage() {
  const params = useParams()
  const router = useRouter()
  const [movie, setMovie] = useState<Movie | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const movieId = params.id as string
    // Fetch movie from API
    fetch(`http://localhost:8080/api/v1/movies/${movieId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Movie not found')
        }
        return response.json()
      })
      .then(data => {
        setMovie(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching movie:', error)
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

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-8">
        <img src={movie.poster_url} alt={movie.title} className="w-full md:w-1/3 h-96 object-cover rounded" />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
          <p className="text-lg mb-4">{movie.description}</p>
          <button
            onClick={handleBookTickets}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Book Tickets
          </button>
        </div>
      </div>
    </div>
  )
}