import React, { useState, useEffect, useRef } from "react"

export default function RickrollPDFViewer({ onClose }) {
  const [isDecrypted, setIsDecrypted] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = false
      videoRef.current.volume = 1.0
      videoRef.current.play().catch(err => {
        console.warn("Background preload play failed, will try again on button click", err)
      })
    }
  }, [])

  const handleDecrypt = () => {
    setIsDecrypted(true)
    if (videoRef.current) {
      videoRef.current.muted = false
      videoRef.current.volume = 1.0
      videoRef.current.play().catch(err => {
        console.error("Direct unmuted play failed", err)
      })
    }
  }

  return (
    <div className="fixed inset-0 z-[999999] bg-[#525659] flex flex-col font-sans select-none pointer-events-auto">
      {/* Fake PDF Viewer Top Toolbar */}
      <div className="h-12 bg-[#323639] flex items-center justify-between px-4 text-white shadow-md border-b border-[#1c1e20]">

        {/* Left Side: Document Title */}
        <div className="flex items-center gap-3">
          <span className="text-red-500 text-xl font-bold">📄</span>
          <span className="text-sm font-semibold tracking-wide truncate max-w-[200px] md:max-w-sm">
            citizen_certificate_FINAL_APPROVED.pdf
          </span>
        </div>

        {/* Center: Controls (Fake) */}
        <div className="hidden md:flex items-center gap-4 text-sm text-gray-300">
          <div className="flex items-center bg-[#202124] rounded px-2 py-0.5 border border-[#4a4d51]">
            <button className="hover:text-white px-1.5">-</button>
            <span className="mx-2 text-xs">147%</span>
            <button className="hover:text-white px-1.5">+</button>
          </div>
          <div className="h-4 w-[1px] bg-gray-600" />
          <span className="text-xs">Page 1 of 1</span>
        </div>

        {/* Right Side: Action Buttons & Close */}
        <div className="flex items-center gap-3">
          {/* Fake Print Button */}
          <button
            onClick={() => alert("Print spooler corrupted. citizen_certificate.pdf requires manual notary stamp.")}
            className="hover:bg-[#4a4d51] p-1.5 rounded text-gray-300 hover:text-white transition-colors animate-pulse"
            title="Print Document"
          >
            🖨️
          </button>

          {/* Fake Download Button */}
          <button
            onClick={() => alert("Download failed: Citizen emotional tax liability unpaid.")}
            className="hover:bg-[#4a4d51] p-1.5 rounded text-gray-300 hover:text-white transition-colors"
            title="Download PDF"
          >
            📥
          </button>

          <div className="h-4 w-[1px] bg-gray-600" />

          {/* Close PDF Viewer Button */}
          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-4 py-1.5 rounded transition-all shadow-sm border border-red-500 active:scale-95"
          >
            Exit Reader
          </button>
        </div>
      </div>

      {/* Main Viewport Container */}
      <div className="flex-1 bg-[#525659] flex items-center justify-center p-4 overflow-auto">
        {/* Fake PDF Page shadow wrapper */}
        <div className="w-full max-w-4xl bg-black rounded shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden relative border border-neutral-700 aspect-[16/9] flex items-center justify-center">

          {/* Watermark Banner */}
          <div className="absolute top-2 left-2 z-50 bg-black/60 backdrop-blur-sm text-[10px] text-green-400 font-mono px-2 py-1 rounded border border-green-500/30">
            OFFICIAL SECURE CITIZEN PORTAL — CERTIFICATE RENDERER
          </div>

          {/* Realistic Encryption Page Overlay */}
          <div className={`absolute inset-0 bg-[#202124] flex flex-col items-center justify-center p-6 text-center font-mono border-4 border-double border-red-700/50 m-4 rounded transition-all duration-300 z-10 ${isDecrypted ? "opacity-0 pointer-events-none scale-95" : "opacity-100"}`}>
            <div className="w-20 h-20 bg-red-950/40 border-2 border-red-500/30 rounded-full flex items-center justify-center mb-6 animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.1)]">
              <span className="text-4xl text-red-500">🔒</span>
            </div>
            <h2 className="text-xl font-bold text-red-500 mb-2 tracking-wide uppercase">
              Secure Document Detected
            </h2>
            <p className="text-xs text-neutral-400 max-w-md mb-8 leading-relaxed">
              citizen_certificate_FINAL_APPROVED.pdf has been encrypted under Section 47-C of the digital quarantine mandates. Direct authentication authorization is required to access your certificate.
            </p>
            <button
              onClick={handleDecrypt}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm tracking-wider px-8 py-3.5 rounded border border-blue-500 shadow-[0_5px_20px_rgba(37,99,235,0.4)] hover:shadow-[0_8px_25px_rgba(37,99,235,0.6)] hover:scale-105 active:scale-95 transition-all cursor-pointer pointer-events-auto uppercase"
            >
              🔑 Decrypt & Open Document
            </button>
          </div>

          {/* Rickroll Video Element */}
          <video
            ref={videoRef}
            src="/rickroll.mp4"
            loop
            playsInline
            controls
            className={`w-full h-full object-cover transition-opacity duration-300 ${isDecrypted ? "opacity-100" : "opacity-0"}`}
          />
        </div>
      </div>
    </div>
  )
}
