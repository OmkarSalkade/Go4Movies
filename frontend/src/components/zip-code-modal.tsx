"use client"

import { useState, useEffect } from "react"

interface ZipCodeModalProps {
  onSelectZipCode: (zipCode: string) => void
}

interface Location {
  id: number
  zipcode: string
  city: string
  state: string
  country: string
}

export function ZipCodeModal({ onSelectZipCode }: ZipCodeModalProps) {
  const [input, setInput] = useState("")
  const [allZipCodes, setAllZipCodes] = useState<string[]>([])
  const [filteredZipCodes, setFilteredZipCodes] = useState<string[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch locations from API
    fetch('http://localhost:8080/api/v1/locations')
      .then(response => response.json())
      .then(data => {
        const locations: Location[] = data.locations
        const zipCodes = [...new Set(locations.map(loc => loc.zipcode))]
        setAllZipCodes(zipCodes)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching locations:', error)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (input.length > 0) {
      const filtered = allZipCodes.filter(zip => zip.startsWith(input))
      setFilteredZipCodes(filtered)
      setShowDropdown(filtered.length > 0)
    } else {
      setFilteredZipCodes([])
      setShowDropdown(false)
    }
  }, [input, allZipCodes])

  const handleSelect = (zipCode: string) => {
    setInput(zipCode)
    setShowDropdown(false)
    onSelectZipCode(zipCode)
  }

  if (loading) {
    return (
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4 border">
        <p>Loading zip codes...</p>
      </div>
    )
  }

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4 border">
      <h2 className="text-xl font-semibold mb-4">Enter Your Zip Code</h2>
      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search for your zip code"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {showDropdown && (
          <ul className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto z-10">
            {filteredZipCodes.map((zip) => (
              <li
                key={zip}
                onClick={() => handleSelect(zip)}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {zip}
              </li>
            ))}
          </ul>
        )}
      </div>
      <p className="text-sm text-gray-600 mt-2">
        Please select a valid zip code to continue.
      </p>
    </div>
  )
}