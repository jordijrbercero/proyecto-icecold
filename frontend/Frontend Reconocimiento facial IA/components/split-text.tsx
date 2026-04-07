"use client"

import { useEffect, useMemo, useRef } from "react"
import gsap from "gsap"

type SplitType = "chars" | "words"

type AnimationVars = {
  opacity?: number
  y?: number
  x?: number
  scale?: number
}

interface SplitTextProps {
  text: string
  className?: string
  animationId?: string
  oncePerPageLoad?: boolean
  replayOnScroll?: boolean
  delay?: number
  duration?: number
  ease?: string
  splitType?: SplitType
  from?: AnimationVars
  to?: AnimationVars
  threshold?: number
  rootMargin?: string
  textAlign?: "left" | "center" | "right"
  onLetterAnimationComplete?: () => void
  showCallback?: boolean
}

const animatedIds = new Set<string>()
const devReplayPrimedIds = new Set<string>()

export default function SplitText({
  text,
  className,
  animationId,
  oncePerPageLoad = true,
  replayOnScroll = false,
  delay = 100,
  duration = 1.25,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "left",
  onLetterAnimationComplete,
  showCallback = false,
}: SplitTextProps) {
  const containerRef = useRef<HTMLSpanElement | null>(null)
  const charRefs = useRef<HTMLSpanElement[]>([])
  const hasAnimatedInViewRef = useRef(false)
  const hasAnimatedOnceRef = useRef(false)

  const pieces = useMemo(() => {
    if (splitType === "words") return text.split(" ")
    return Array.from(text)
  }, [splitType, text])
  const resolvedAnimationId = animationId ?? `${splitType}:${text}`

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    if (
      replayOnScroll &&
      process.env.NODE_ENV === "development" &&
      !devReplayPrimedIds.has(resolvedAnimationId)
    ) {
      devReplayPrimedIds.add(resolvedAnimationId)
      gsap.set(charRefs.current, to)
      return
    }

    if (!replayOnScroll && oncePerPageLoad && animatedIds.has(resolvedAnimationId)) {
      gsap.set(charRefs.current, to)
      return
    }

    const playAnimation = () => {
      gsap.killTweensOf(charRefs.current)
      gsap.set(charRefs.current, from)
      gsap.to(charRefs.current, {
        ...to,
        duration,
        ease,
        stagger: splitType === "chars" ? 0.035 : 0.06,
        delay: delay / 1000,
        onComplete: () => {
          if (showCallback) {
            onLetterAnimationComplete?.()
          }
        },
      })
      hasAnimatedInViewRef.current = true
      hasAnimatedOnceRef.current = true
    }

    const isInitiallyInViewport = () => {
      const rect = container.getBoundingClientRect()
      return rect.bottom > 0 && rect.top < window.innerHeight
    }

    if (replayOnScroll && isInitiallyInViewport()) {
      playAnimation()
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return

        if (replayOnScroll && !entry.isIntersecting) {
          hasAnimatedInViewRef.current = false
          if (hasAnimatedOnceRef.current) {
            gsap.set(charRefs.current, from)
          }
          return
        }

        if (!entry.isIntersecting) return
        if (replayOnScroll && hasAnimatedInViewRef.current) return

        if (!replayOnScroll && oncePerPageLoad) {
          animatedIds.add(resolvedAnimationId)
          observer.disconnect()
        }
        playAnimation()
      },
      { threshold, rootMargin }
    )

    observer.observe(container)

    return () => {
      observer.disconnect()
      gsap.killTweensOf(charRefs.current)
    }
  }, [
    delay,
    duration,
    ease,
    from,
    onLetterAnimationComplete,
    oncePerPageLoad,
    replayOnScroll,
    resolvedAnimationId,
    rootMargin,
    showCallback,
    splitType,
    threshold,
    to,
  ])

  return (
    <span
      ref={containerRef}
      className={className}
      style={{ display: "inline-block", textAlign }}
    >
      {pieces.map((piece, index) => {
        const value = piece === " " ? "\u00A0" : piece
        const trailingSpace = splitType === "words" && index < pieces.length - 1 ? "\u00A0" : ""
        return (
          <span
            key={`${piece}-${index}`}
            ref={(el) => {
              if (el) charRefs.current[index] = el
            }}
            style={{ display: "inline-block", willChange: "transform, opacity" }}
          >
            {value}
            {trailingSpace}
          </span>
        )
      })}
    </span>
  )
}
