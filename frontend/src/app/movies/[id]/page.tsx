"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"

interface Movie {
  id: string
  title: string
  poster: string
  description: string
  fullDescription: string
}

const mockMovies: Movie[] = [
  {
    id: "1",
    title: "The Dark Knight",
    poster: "/movie1.jpg",
    description: "A superhero action film.",
    fullDescription: "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker."
  },
  {
    id: "2",
    title: "Inception",
    poster: "/movie2.jpg",
    description: "A mind-bending thriller.",
    fullDescription: "Dom Cobb is a skilled thief, the absolute best in the dangerous art of extraction, stealing valuable secrets from deep within the subconscious during the dream state, when the mind is at its most vulnerable. Cobb's rare ability has made him a coveted player in this treacherous new world of corporate espionage, but it has also made him an international fugitive."
  },
  {
    id: "3",
    title: "Interstellar",
    poster: "/movie3.jpg",
    description: "A space exploration epic.",
    fullDescription: "In the near future, Earth has been devastated by drought and famine, causing a scarcity in food and extreme changes in climate. A team of astronauts undertakes a mission to find a new habitable planet for humanity."
  }
]

export default function MoviePage() {
  const params = useParams()
  const router = useRouter()
  const [movie, setMovie] = useState<Movie | null>(null)

  useEffect(() => {
    const movieId = params.id as string
    const foundMovie = mockMovies.find(m => m.id === movieId)
    if (foundMovie) {
      setMovie(foundMovie)
    } else {
      router.push("/movies")
    }
  }, [params.id, router])

  const handleBookTickets = () => {
    // In real app, navigate to booking page
    alert("Booking tickets for " + movie?.title)
  }

  if (!movie) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-8">
        <img src={movie.poster} alt={movie.title} className="w-full md:w-1/3 h-96 object-cover rounded" />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
          <p className="text-lg mb-4">{movie.fullDescription}</p>
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