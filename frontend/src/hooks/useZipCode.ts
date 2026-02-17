"use client"

import { useCallback } from "react"
import { useRouter } from "next/navigation"

/**
 * Custom hook for managing zip code state via localStorage.
 * Encapsulates the zip code read/write/clear logic in one place.
 * 
 * Keep this hook generic — page-specific behavior (like showing modals
 * or clearing on mount) belongs in the page/component that uses the hook.
 */
export function useZipCode() {
  const router = useRouter()

  const getZipCode = useCallback((): string | null => {
    return localStorage.getItem("selectedZipCode")
  }, [])

  const setZipCode = useCallback((zipCode: string) => {
    localStorage.setItem("selectedZipCode", zipCode)
  }, [])

  const clearZipCode = useCallback(() => {
    localStorage.removeItem("selectedZipCode")
  }, [])

  const requireZipCode = useCallback((): string | null => {
    const zip = localStorage.getItem("selectedZipCode")
    if (!zip) {
      router.push("/")
    }
    return zip
  }, [router])

  return { getZipCode, setZipCode, clearZipCode, requireZipCode }
}
