"use client"

import { useEffect, useRef } from "react"

type Flake = {
  x: number
  y: number
  radius: number
  speed: number
  drift: number
  alpha: number
}

function prefersReducedMotion() {
  if (typeof window === "undefined") return true
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
}

export function Snowfall({ density = 1 }: { density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number | null>(null)
  const flakesRef = useRef<Flake[]>([])

  useEffect(() => {
    if (prefersReducedMotion()) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      canvas.style.width = "100%"
      canvas.style.height = "100%"
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const area = window.innerWidth * window.innerHeight
      const baseCount = Math.min(140, Math.max(40, Math.floor(area / 16000)))
      const count = Math.floor(baseCount * density)

      const next: Flake[] = []
      for (let i = 0; i < count; i += 1) {
        next.push(makeFlake(window.innerWidth, window.innerHeight, true))
      }
      flakesRef.current = next
    }

    const tick = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      ctx.clearRect(0, 0, width, height)
      const flakes = flakesRef.current

      for (const flake of flakes) {
        flake.y += flake.speed
        flake.x += flake.drift

        if (flake.y - flake.radius > height) {
          Object.assign(flake, makeFlake(width, height, false))
          flake.y = -flake.radius - Math.random() * 12
        }

        if (flake.x < -20) flake.x = width + 20
        if (flake.x > width + 20) flake.x = -20

        ctx.beginPath()
        ctx.fillStyle = `rgba(160, 220, 255, ${flake.alpha})`
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      rafRef.current = window.requestAnimationFrame(tick)
    }

    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        if (rafRef.current) window.cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      } else if (!rafRef.current) {
        rafRef.current = window.requestAnimationFrame(tick)
      }
    }

    resize()
    rafRef.current = window.requestAnimationFrame(tick)

    window.addEventListener("resize", resize, { passive: true })
    document.addEventListener("visibilitychange", onVisibility)

    return () => {
      window.removeEventListener("resize", resize)
      document.removeEventListener("visibilitychange", onVisibility)
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current)
    }
  }, [density])

  return (
    <canvas
      ref={canvasRef}
      className="ice-snow"
      aria-hidden="true"
    />
  )
}

function makeFlake(width: number, height: number, randomY: boolean): Flake {
  const radius = 0.7 + Math.random() * 1.6
  const speed = 0.35 + Math.random() * 0.9
  const drift = (Math.random() - 0.5) * 0.25
  const alpha = 0.08 + Math.random() * 0.18

  return {
    x: Math.random() * width,
    y: randomY ? Math.random() * height : -10,
    radius,
    speed,
    drift,
    alpha,
  }
}

