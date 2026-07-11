"use client"

import { useEffect, useRef, useCallback, useState } from "react"
import createGlobe from "cobe"

interface InteractiveMarker {
  id: string
  location: [number, number]
  name: string
  users: number
}

interface GlobeInteractiveProps {
  markers?: InteractiveMarker[]
  className?: string
  speed?: number
}

// Saraswati Niwas Greater Noida Hostel Locations
const defaultMarkers: InteractiveMarker[] = [
  { id: "india", location: [20.5937, 78.9629], name: "India", users: 690 }
]

export function GlobeInteractive({
  markers = defaultMarkers,
  className = "",
  speed = 0.003,
}: GlobeInteractiveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null)
  const dragOffset = useRef({ phi: 0, theta: 0 })
  const phiOffsetRef = useRef(0)
  const thetaOffsetRef = useRef(0)
  const isPausedRef = useRef(false)
  const [expanded, setExpanded] = useState<string | null>(null)

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    pointerInteracting.current = { x: e.clientX, y: e.clientY }
    if (canvasRef.current) canvasRef.current.style.cursor = "grabbing"
    isPausedRef.current = true
  }, [])

  const handlePointerUp = useCallback(() => {
    if (pointerInteracting.current !== null) {
      phiOffsetRef.current += dragOffset.current.phi
      thetaOffsetRef.current += dragOffset.current.theta
      dragOffset.current = { phi: 0, theta: 0 }
    }
    pointerInteracting.current = null
    if (canvasRef.current) canvasRef.current.style.cursor = "grab"
    isPausedRef.current = false
  }, [])

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (pointerInteracting.current !== null) {
        dragOffset.current = {
          phi: (e.clientX - pointerInteracting.current.x) / 300,
          theta: (e.clientY - pointerInteracting.current.y) / 1000,
        }
      }
    }
    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    window.addEventListener("pointerup", handlePointerUp, { passive: true })
    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerup", handlePointerUp)
    }
  }, [handlePointerUp])

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    let globe: ReturnType<typeof createGlobe> | null = null
    let animationId: number
    // Start phi facing India (approx 1.35 radians longitude)
    let phi = 1.35

    function init() {
      const width = canvas.offsetWidth
      if (width === 0) return
      if (globe) return // already initialized

      // Custom theme matching the Saraswati Niwas colors
      // Base: Lavender surface (#F8F9FE), Markers: Electric Violet (#6C63FF), Glow: Mint/Teal (#4ECDC4)
      globe = createGlobe(canvas, {
        devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        width, height: width,
        phi: 1.35, theta: 0.3, dark: 0, diffuse: 1.5,
        mapSamples: 16000, mapBrightness: 10,
        baseColor: [0.2, 0.6, 0.25], // Earthy green land dots
        markerColor: [1.0, 0.3, 0.2], // Vibrant red location pin
        glowColor: [0.25, 0.55, 0.9], // Deep ocean blue atmosphere glow
        markerElevation: 0,
        markers: markers.map((m) => ({ location: m.location, size: 0.05, id: m.id })),
        arcs: [], arcColor: [1.0, 0.3, 0.2],
        arcWidth: 0.5, arcHeight: 0.25, opacity: 0.8,
      })

      function animate() {
        if (!isPausedRef.current) phi += speed
        globe!.update({
          phi: phi + phiOffsetRef.current + dragOffset.current.phi,
          theta: 0.3 + thetaOffsetRef.current + dragOffset.current.theta,
        })
        animationId = requestAnimationFrame(animate)
      }
      animate()
      setTimeout(() => canvas && (canvas.style.opacity = "1"))
    }

    if (canvas.offsetWidth > 0) {
      init()
    } else {
      const ro = new ResizeObserver((entries) => {
        if (entries[0]?.contentRect.width > 0) {
          ro.disconnect()
          init()
        }
      })
      ro.observe(canvas)
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
      if (globe) globe.destroy()
    }
  }, [markers, speed])

  return (
    <div 
      className={className}
      style={{
        position: "relative",
        aspectRatio: "1/1",
        userSelect: "none"
      }}
    >
      <style>{`
        @keyframes fade-slide-in {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 0.8; transform: translateY(0); }
        }
      `}</style>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        style={{
          width: "100%", height: "100%", cursor: "grab", opacity: 0,
          transition: "opacity 1.2s ease", borderRadius: "50%", touchAction: "none",
        }}
      />
      {markers.map((m) => (
        <div
          key={m.id}
          onClick={() => setExpanded(expanded === m.id ? null : m.id)}
          style={{
            position: "absolute",
            positionAnchor: `--cobe-${m.id}`,
            bottom: "anchor(top)",
            left: "anchor(center)",
            translate: "-50% 0",
            marginBottom: 6,
            display: "flex",
            flexDirection: "column" as const,
            alignItems: "center",
            padding: expanded === m.id ? "0.4rem 0.6rem" : "0.3rem 0.5rem",
            background: "#1a1a2e",
            color: "#fff",
            borderRadius: 3,
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            opacity: `var(--cobe-visible-${m.id}, 1)`, // default to visible in static environments
            filter: `blur(calc((1 - var(--cobe-visible-${m.id}, 1)) * 8px))`,
            transition: "opacity 0.4s, filter 0.4s, transform 0.2s, padding 0.2s",
            zoom: expanded === m.id ? 1.05 : 1,
            zIndex: 10
          } as any}
        >
          <span style={{
            fontFamily: "monospace", fontSize: "0.65rem", fontWeight: 600,
            letterSpacing: "0.08em", textTransform: "uppercase" as const,
          }}>{m.name}</span>
          {expanded === m.id && (
            <div 
              onClick={(e) => e.stopPropagation()} 
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                marginTop: "10px",
                alignItems: "flex-start",
                width: "160px",
                animation: "fade-slide-in 0.2s ease-out",
                borderTop: "1px solid rgba(255,255,255,0.15)",
                paddingTop: "10px"
              }}
            >
              <span style={{ fontSize: "0.55rem", opacity: 0.6, marginBottom: "2px", letterSpacing: "0.05em" }}>OUR BRANCHES:</span>
              <a href="/hostels?location=Near%20IIMT" style={{ color: "#4ECDC4", textDecoration: "none", fontSize: "0.65rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "6px", transition: "transform 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.transform = "translateX(2px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "none"}>
                <span>📍</span> Near IIMT
              </a>
              <a href="/hostels?location=Pari%20Chowk" style={{ color: "#4ECDC4", textDecoration: "none", fontSize: "0.65rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "6px", transition: "transform 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.transform = "translateX(2px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "none"}>
                <span>📍</span> Pari Chowk
              </a>
              <a href="/hostels?location=Knowledge%20Park%202" style={{ color: "#4ECDC4", textDecoration: "none", fontSize: "0.65rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "6px", transition: "transform 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.transform = "translateX(2px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "none"}>
                <span>📍</span> Knowledge Park 2
              </a>
              <a href="/hostels?location=Alpha%202" style={{ color: "#4ECDC4", textDecoration: "none", fontSize: "0.65rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "6px", transition: "transform 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.transform = "translateX(2px)"} onMouseLeave={(e) => e.currentTarget.style.transform = "none"}>
                <span>📍</span> Alpha 2
              </a>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
