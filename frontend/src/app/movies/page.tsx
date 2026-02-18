"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Movie } from "@/lib/types"
import { fetchMoviesByZipCode } from "@/lib/api"
import { useZipCode } from "@/hooks/useZipCode"
import { MovieGrid } from "@/components/movies/movie-grid"
import { ZipCodeModal } from "@/components/ui/zip-code-modal"

const DEFAULT_ZIP_CODE = "32601"

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [zipCode, setZipCodeState] = useState(DEFAULT_ZIP_CODE)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()
  const { getZipCode, setZipCode } = useZipCode()

  const loadMovies = useCallback((zip: string) => {
    setLoading(true)
    fetchMoviesByZipCode(zip)
      .then((data) => {
        setMovies(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching movies:", error)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    const storedZip = getZipCode()
    if (storedZip) {
      // Returning user: load their saved zip
      setZipCodeState(storedZip)
      loadMovies(storedZip)
    } else {
      // First visit: show modal, load default movies in background
      setShowModal(true)
      // loadMovies(DEFAULT_ZIP_CODE)
    }
  }, [getZipCode, loadMovies])

  const handleSelectZipCode = (zip: string) => {
    setZipCode(zip)
    setZipCodeState(zip)
    setShowModal(false)
    loadMovies(zip)
  }

  const handleCloseModal = () => {
    // If user skips, persist the default so modal doesn't re-appear
    if (!getZipCode()) {
      setZipCode(DEFAULT_ZIP_CODE)
    }
    setShowModal(false)
  }

  const handleMovieClick = (movieId: number) => {
    router.push(`/movies/${movieId}`)
  }

  return (
    <>
      {showModal && (
        <ZipCodeModal
          onSelectZipCode={handleSelectZipCode}
          onClose={handleCloseModal}
        />
      )}
      <main className="flex-1 px-6 md:px-10 py-8 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">
            Movies in <span className="text-primary">{zipCode}</span>
          </h1>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 text-sm text-neutral-400 hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-lg">
              location_on
            </span>
            Change Location
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-neutral-400">Loading movies...</div>
          </div>
        ) : movies.length > 0 ? (
          <MovieGrid movies={movies} onMovieClick={handleMovieClick} />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-neutral-400">
            <span className="material-symbols-outlined text-5xl mb-4">
              movie
            </span>
            <p>No movies found for this location.</p>
          </div>
        )}
      </main>
    </>
  )
}