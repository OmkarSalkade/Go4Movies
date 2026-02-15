"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ZipCodeModal } from "@/components/zip-code-modal"

export default function Home() {
  const [showModal, setShowModal] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Clear any previously stored zip code to ensure modal always shows
    localStorage.removeItem("selectedZipCode")
    setShowModal(true)
  }, [])

  const handleSelectZipCode = (zipCode: string) => {
    localStorage.setItem("selectedZipCode", zipCode)
    setShowModal(false)
    router.push("/movies")
  }

  return (
    <div>
      {showModal && <ZipCodeModal onSelectZipCode={handleSelectZipCode} />}
    </div>
  )
}
