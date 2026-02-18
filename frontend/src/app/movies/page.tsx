"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface Movie {
  id: number
  title: string
  description: string
  poster_url: string
}

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [zipCode, setZipCode] = useState("")
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const selectedZip = localStorage.getItem("selectedZipCode")
    if (!selectedZip) {
      router.push("/")
      return
    }
    setZipCode(selectedZip)
    // Fetch movies from API
    fetch(`http://localhost:8080/api/v1/movies?zipcode=${selectedZip}`)
      .then(response => response.json())
      .then(data => {
        setMovies(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching movies:', error)
        setLoading(false)
      })
  }, [router])

  const handleMovieClick = (movieId: number) => {
    router.push(`/movies/${movieId}`)
  }

  if (loading) {
    return <div className="container mx-auto p-4">Loading movies...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Movies in {zipCode}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => handleMovieClick(movie.id)}
            className="cursor-pointer border rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <img src={movie.poster_url} alt={movie.title} className="w-full h-48 object-cover rounded" />
            <h2 className="text-lg font-semibold mt-2">{movie.title}</h2>
            <p className="text-sm text-gray-600">{movie.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}