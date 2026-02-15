"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface Movie {
  id: string
  title: string
  poster: string
  description: string
}

const mockMovies: Movie[] = [
  {
    id: "1",
    title: "The Dark Knight",
    poster: "/movie1.jpg",
    description: "A superhero action film."
  },
  {
    id: "2",
    title: "Inception",
    poster: "/movie2.jpg",
    description: "A mind-bending thriller."
  },
  {
    id: "3",
    title: "Interstellar",
    poster: "/movie3.jpg",
    description: "A space exploration epic."
  }
]

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [zipCode, setZipCode] = useState("")
  const router = useRouter()

  useEffect(() => {
    const selectedZip = localStorage.getItem("selectedZipCode")
    if (!selectedZip) {
      router.push("/")
      return
    }
    setZipCode(selectedZip)
    // In real app, fetch movies by zip code from backend
    setMovies(mockMovies)
  }, [router])

  const handleMovieClick = (movieId: string) => {
    router.push(`/movies/${movieId}`)
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
            <img src={movie.poster} alt={movie.title} className="w-full h-48 object-cover rounded" />
            <h2 className="text-lg font-semibold mt-2">{movie.title}</h2>
            <p className="text-sm text-gray-600">{movie.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}