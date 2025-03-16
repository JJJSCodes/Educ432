"use client"

import { useState, useEffect } from "react"

export default function IPAddressInteractive() {
  const [binaryValues, setBinaryValues] = useState<boolean[][]>([
    Array(8).fill(false),
    Array(8).fill(false),
    Array(8).fill(false),
    Array(8).fill(false),
  ])

  const [ipAddress, setIpAddress] = useState("0.0.0.0")
  const [userIP, setUserIP] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Convert binary values to decimal IP address
    const decimalValues = binaryValues.map((octet) => {
      return octet.reduce((acc, bit, index) => {
        return acc + (bit ? Math.pow(2, 7 - index) : 0)
      }, 0)
    })

    setIpAddress(decimalValues.join("."))
  }, [binaryValues])

  const toggleBit = (octetIndex: number, bitIndex: number) => {
    const newBinaryValues = [...binaryValues]
    newBinaryValues[octetIndex][bitIndex] = !newBinaryValues[octetIndex][bitIndex]
    setBinaryValues(newBinaryValues)
  }

  const setRandomIP = () => {
    const randomBinaryValues = Array(4)
      .fill(0)
      .map(() =>
        Array(8)
          .fill(false)
          .map(() => Math.random() > 0.5),
      )
    setBinaryValues(randomBinaryValues)
  }

  const clearIP = () => {
    setBinaryValues([Array(8).fill(false), Array(8).fill(false), Array(8).fill(false), Array(8).fill(false)])
  }

  // Update the fetchUserIP function to only display the IP without setting the binary toggles
  const fetchUserIP = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("https://api.ipify.org?format=json")
      const data = await response.json()
      setUserIP(data.ip)
      // No longer setting the binary values automatically
    } catch (error) {
      console.error("Failed to fetch IP:", error)
      setUserIP("Failed to fetch IP")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="mb-4">
        <div className="text-2xl font-mono text-center font-bold text-orange-500 mb-2">{ipAddress}</div>
        <div className="h-1 w-full bg-gradient-to-r from-amber-300 to-orange-400 rounded-full"></div>
      </div>

      <div className="flex justify-center mb-4">
        {binaryValues.map((octet, octetIndex) => (
          <div key={octetIndex} className="flex flex-col items-center">
            <div className="grid grid-cols-4 gap-1 mb-1">
              {octet.slice(0, 4).map((bit, bitIndex) => (
                <button
                  key={bitIndex}
                  className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-mono ${
                    bit ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700"
                  } hover:bg-orange-300 transition-colors`}
                  onClick={() => toggleBit(octetIndex, bitIndex)}
                >
                  {bit ? "1" : "0"}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-1">
              {octet.slice(4, 8).map((bit, bitIndex) => (
                <button
                  key={bitIndex + 4}
                  className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-mono ${
                    bit ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700"
                  } hover:bg-orange-300 transition-colors`}
                  onClick={() => toggleBit(octetIndex, bitIndex + 4)}
                >
                  {bit ? "1" : "0"}
                </button>
              ))}
            </div>
            <div className="text-xs mt-1 font-mono text-gray-500">
              {octet.reduce((acc, bit, index) => {
                return acc + (bit ? Math.pow(2, 7 - index) : 0)
              }, 0)}
            </div>

            {/* Add dot separator except for the last octet */}
            {octetIndex < 3 && <div className="mx-1 text-lg font-bold text-orange-500 self-center">.</div>}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-between gap-2 mb-2">
        <button
          onClick={setRandomIP}
          className="px-3 py-1 bg-amber-100 text-orange-600 rounded-md text-sm hover:bg-amber-200 transition-colors"
        >
          Random IP
        </button>
        <button
          onClick={clearIP}
          className="px-3 py-1 bg-gray-100 text-gray-600 rounded-md text-sm hover:bg-gray-200 transition-colors"
        >
          Clear
        </button>
      </div>

      <button
        onClick={fetchUserIP}
        disabled={isLoading}
        className="w-full px-3 py-2 bg-orange-500 text-white rounded-md text-sm hover:bg-orange-600 transition-colors disabled:bg-orange-300"
      >
        {isLoading ? "Fetching your IP..." : userIP ? "Refresh Your IP" : "Get Your IP Address"}
      </button>

      {userIP && (
        <div className="mt-2 text-center text-sm text-gray-600">
          Your IP: <span className="font-medium">{userIP}</span>
        </div>
      )}

      {userIP && (
        <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded-md">
          <p className="text-sm text-gray-700 mb-1">Try to toggle the bits above to match your IP address:</p>
          <div className="flex justify-between items-center">
            <span className="font-mono text-orange-600">{userIP}</span>
            {ipAddress === userIP && <span className="text-green-600 text-sm font-medium">✓ Match!</span>}
          </div>
        </div>
      )}
    </div>
  )
}

