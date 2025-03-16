"use client"

import { useState } from "react"
import { Lock, Unlock, Key, RefreshCw } from "lucide-react"

export default function EncryptionInteractive() {
  const [message, setMessage] = useState("Hello World")
  const [encryptedMessage, setEncryptedMessage] = useState("")
  const [decryptedMessage, setDecryptedMessage] = useState("")
  const [publicKey, setPublicKey] = useState("PUB_1A2B3C")
  const [privateKey, setPrivateKey] = useState("PRIV_X7Y8Z9")
  const [step, setStep] = useState(0)

  const encrypt = () => {
    // Simulate encryption (in reality, this would use actual encryption algorithms)
    const encrypted = message
      .split("")
      .map((char) => {
        const code = char.charCodeAt(0)
        return String.fromCharCode(code + 3) // Simple Caesar cipher for demonstration
      })
      .join("")

    setEncryptedMessage(encrypted)
    setStep(1)
  }

  const decrypt = () => {
    // Simulate decryption
    const decrypted = encryptedMessage
      .split("")
      .map((char) => {
        const code = char.charCodeAt(0)
        return String.fromCharCode(code - 3) // Reverse the Caesar cipher
      })
      .join("")

    setDecryptedMessage(decrypted)
    setStep(2)
  }

  const reset = () => {
    setStep(0)
    setEncryptedMessage("")
    setDecryptedMessage("")

    // Generate new "keys"
    const newPublic = "PUB_" + Math.random().toString(36).substring(2, 8).toUpperCase()
    const newPrivate = "PRIV_" + Math.random().toString(36).substring(2, 8).toUpperCase()
    setPublicKey(newPublic)
    setPrivateKey(newPrivate)
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={step > 0}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Enter a message to encrypt"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="flex items-center mb-1">
            <Key size={14} className="mr-1 text-teal-600" />
            <label className="block text-sm font-medium text-gray-700">Public Key</label>
          </div>
          <div className="px-3 py-2 bg-teal-50 border border-teal-200 rounded-md text-sm font-mono">{publicKey}</div>
        </div>
        <div>
          <div className="flex items-center mb-1">
            <Key size={14} className="mr-1 text-teal-600" />
            <label className="block text-sm font-medium text-gray-700">Private Key</label>
          </div>
          <div className="px-3 py-2 bg-teal-50 border border-teal-200 rounded-md text-sm font-mono">{privateKey}</div>
        </div>
      </div>

      <div className="space-y-4 mb-4">
        {step >= 1 && (
          <div className="p-3 bg-teal-50 rounded-md">
            <div className="flex items-center mb-1">
              <Lock size={14} className="mr-1 text-teal-600" />
              <label className="block text-sm font-medium text-teal-700">Encrypted with Public Key</label>
            </div>
            <div className="px-3 py-2 bg-white border border-teal-200 rounded-md text-sm font-mono break-all">
              {encryptedMessage}
            </div>
          </div>
        )}

        {step >= 2 && (
          <div className="p-3 bg-cyan-50 rounded-md">
            <div className="flex items-center mb-1">
              <Unlock size={14} className="mr-1 text-cyan-600" />
              <label className="block text-sm font-medium text-cyan-700">Decrypted with Private Key</label>
            </div>
            <div className="px-3 py-2 bg-white border border-cyan-200 rounded-md text-sm font-mono">
              {decryptedMessage}
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        {step === 0 && (
          <button
            onClick={encrypt}
            disabled={!message}
            className="w-full flex items-center justify-center px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors disabled:bg-gray-300 disabled:text-gray-500"
          >
            <Lock size={16} className="mr-2" /> Encrypt with Public Key
          </button>
        )}

        {step === 1 && (
          <button
            onClick={decrypt}
            className="w-full flex items-center justify-center px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition-colors"
          >
            <Unlock size={16} className="mr-2" /> Decrypt with Private Key
          </button>
        )}

        {step === 2 && (
          <button
            onClick={reset}
            className="w-full flex items-center justify-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            <RefreshCw size={16} className="mr-2" /> Try Again
          </button>
        )}
      </div>
    </div>
  )
}

