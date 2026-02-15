"use client"

import { useState, useEffect } from "react"

interface ZipCodeModalProps {
  onSelectZipCode: (zipCode: string) => void
}

const mockZipCodes = [
  "10001", "10002", "10003", "10004", "10005",
  "90210", "90211", "90212", "90213", "90214",
  "60601", "60602", "60603", "60604", "60605"
]

export function ZipCodeModal({ onSelectZipCode }: ZipCodeModalProps) {
  const [input, setInput] = useState("")
  const [filteredZipCodes, setFilteredZipCodes] = useState<string[]>([])
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    if (input.length > 0) {
      const filtered = mockZipCodes.filter(zip => zip.startsWith(input))
      setFilteredZipCodes(filtered)
      setShowDropdown(filtered.length > 0)
    } else {
      setFilteredZipCodes([])
      setShowDropdown(false)
    }
  }, [input])

  const handleSelect = (zipCode: string) => {
    setInput(zipCode)
    setShowDropdown(false)
    onSelectZipCode(zipCode)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
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
    </div>
  )
}