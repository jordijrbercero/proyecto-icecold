"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import type { CSSProperties, ReactNode } from "react"
import { WebcamCapture } from "@/components/webcam-capture"
import { AnalysisResults } from "@/components/analysis-results"
import { Button } from "@/components/ui/button"
import {
  analyzeFaceShape,
  getHaircutRecommendation,
  type FaceAnalysis,
  type HaircutRecommendation,
} from "@/lib/face-shape"
import { ScanFace, Scissors, Sparkles, Star, Zap } from "lucide-react"

type FaceApiModule = {
  nets: {
    tinyFaceDetector: { loadFromUri: (uri: string) => Promise<void> }
    faceLandmark68Net: { loadFromUri: (uri: string) => Promise<void> }
  }
  detectSingleFace: (
    input: HTMLImageElement | HTMLCanvasElement,
    options?: unknown
  ) => {
    withFaceLandmarks: () => Promise<{
      landmarks: { positions: { x: number; y: number }[] }
    } | undefined>
  }
  TinyFaceDetectorOptions: new () => unknown
}

let faceapi: FaceApiModule | null = null

export function FaceAnalyzer() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [isModelLoaded, setIsModelLoaded] = useState(false)
  const [analysis, setAnalysis] = useState<FaceAnalysis | null>(null)
  const [recommendation, setRecommendation] =
    useState<HaircutRecommendation | null>(null)
  const [loadingStatus, setLoadingStatus] = useState("Cargando modelos de IA...")

  useEffect(() => {
    async function loadModels() {
      try {
        setLoadingStatus("Descargando modelos de detección facial...")
        const faceApiModule = await import("face-api.js")
        faceapi = faceApiModule as unknown as FaceApiModule

        const modelSources = [
          "/models",
          "https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights",
        ]

        let loaded = false
        let lastError: unknown = null
        for (const modelUrl of modelSources) {
          try {
            await Promise.all([
              faceapi.nets.tinyFaceDetector.loadFromUri(modelUrl),
              faceapi.nets.faceLandmark68Net.loadFromUri(modelUrl),
            ])
            loaded = true
            break
          } catch (error) {
            lastError = error
          }
        }

        if (!loaded) {
          throw lastError ?? new Error("No se pudieron cargar los modelos")
        }

        setIsModelLoaded(true)
        setLoadingStatus("")
      } catch (err) {
        console.error("Error loading face-api models:", err)
        setLoadingStatus(
          "Error al cargar modelos. Recarga la página e inténtalo de nuevo."
        )
      }
    }
    loadModels()
  }, [])

  const handleCapture = useCallback(
    async (imageData: string) => {
      if (!faceapi || !isModelLoaded) return

      setIsProcessing(true)
      try {
        const img = document.createElement("img")
        img.crossOrigin = "anonymous"
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve()
          img.onerror = reject
          img.src = imageData
        })

        const options = new faceapi.TinyFaceDetectorOptions()
        const detection = await faceapi
          .detectSingleFace(img, options)
          .withFaceLandmarks()

        if (detection) {
          const landmarks = detection.landmarks.positions.map((p) => [
            p.x,
            p.y,
          ])
          const result = analyzeFaceShape(landmarks)
          setAnalysis(result)
          setRecommendation(getHaircutRecommendation(result.shape))
        } else {
          setAnalysis(null)
          setRecommendation(null)
          alert(
            "No se detectó un rostro. Asegúrate de que tu cara esté bien iluminada y centrada."
          )
        }
      } catch (err) {
        console.error("Error analyzing face:", err)
        alert("Error al analizar la imagen. Por favor, inténtalo de nuevo.")
      } finally {
        setIsProcessing(false)
      }
    },
    [isModelLoaded]
  )

  const handleRetry = useCallback(() => {
    setAnalysis(null)
    setRecommendation(null)
  }, [])

  return (
    <main className="ice-shell">
      {/* ── Hero ── */}
      <section id="inicio" className="ice-hero overflow-hidden">
        <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-24 text-center">
          <div className="ice-pill inline-flex items-center gap-2 px-4 py-1.5 text-sm text-primary mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            Premium · Tech · IA
          </div>
          <h1 className="text-5xl font-serif font-bold text-foreground md:text-7xl leading-tight tracking-tight">
            IceCold
          </h1>
          <p className="mt-4 text-2xl md:text-3xl text-foreground/90 font-medium text-balance">
            Descubre tu pelo ideal
          </p>
          <p className="mt-3 text-sm md:text-base text-muted-foreground tracking-wide uppercase">
            Escáner capilar con Inteligencia Artificial
          </p>
          <div className="mt-10 flex items-center justify-center gap-3">
            <Button asChild size="lg" className="ice-button px-10">
              <a href="#escaner">Probar escáner</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="ice-button-outline px-8"
            >
              <a href="#reserva">Reserva / Contacto</a>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Scanner section ── */}
      <section id="escaner" className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="ice-panel rounded-3xl p-6 md:p-8">
          <div className="grid gap-4 md:grid-cols-3">
            <RevealOnScroll direction="left">
              <StepCard
                icon={<ScanFace className="h-5 w-5" />}
                step="01"
                title="Analiza tu rostro"
                description="Detecta puntos clave y proporciones en segundos."
              />
            </RevealOnScroll>
            <RevealOnScroll direction="right" delay={90}>
              <StepCard
                icon={<Zap className="h-5 w-5" />}
                step="02"
                title="Recomienda el mejor corte"
                description="Estilos que encajan con tu forma facial."
              />
            </RevealOnScroll>
            <RevealOnScroll direction="left" delay={180}>
              <StepCard
                icon={<Scissors className="h-5 w-5" />}
                step="03"
                title="100% personalizado"
                description="Sugerencias adaptadas con IA para ti."
              />
            </RevealOnScroll>
          </div>

          <div className="mt-10 flex flex-col gap-2">
            <p className="text-sm text-primary font-medium">
              Escáner capilar con Inteligencia Artificial
            </p>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              Prueba el escáner ahora
            </h3>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
              Enfoca tu rostro, captura una foto y recibe una recomendación de
              estilo pensada para ti.
            </p>
          </div>

          <div className="mt-10 lg:mx-auto lg:max-w-3xl">
            {/* Loading state */}
            {!isModelLoaded && loadingStatus && (
              <div className="flex flex-col items-center gap-4 py-10">
                <div className="h-10 w-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                <p className="text-sm text-muted-foreground">{loadingStatus}</p>
              </div>
            )}

            {/* Webcam — el efecto escáner vive dentro de WebcamCapture */}
            {isModelLoaded && !analysis && (
              <WebcamCapture
                onCapture={handleCapture}
                isProcessing={isProcessing}
              />
            )}

            {/* Results */}
            {analysis && recommendation && (
              <AnalysisResults
                analysis={analysis}
                recommendation={recommendation}
                onRetry={handleRetry}
              />
            )}
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section id="estilos" className="mx-auto max-w-6xl px-6 pb-16 md:pb-24">
        <div className="flex flex-col gap-2 text-center mb-10">
          <p className="text-sm text-primary font-medium">Inspiración</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
            Cortes, antes / después y estilo
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Inspiración real de cortes y acabados. Úsalo como referencia para tu
            próxima visita.
          </p>
        </div>

        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-6">
          <RevealOnScroll direction="left" className="lg:col-span-2">
            <ImageSlot
              title="Cortes premium"
              hint="Cortes elegantes y precisos."
              imageSrc="/images/galeria/corte-premium.png"
              className="lg:col-span-2"
            />
          </RevealOnScroll>
          <RevealOnScroll
            direction="right"
            delay={90}
            className="lg:col-span-2"
          >
            <ImageSlot
              title="Antes / Después"
              hint="Cambios reales, resultado claro."
              imageSrc="/images/galeria/antes-despues.png"
              className="lg:col-span-2"
            />
          </RevealOnScroll>
          <RevealOnScroll
            direction="left"
            delay={180}
            className="lg:col-span-2"
          >
            <ImageSlot
              title="Fade & textura"
              hint="Degradado limpio y textura."
              imageSrc="/images/galeria/fade-y-textura.png"
              className="lg:col-span-2"
            />
          </RevealOnScroll>
          <RevealOnScroll direction="right" className="lg:col-span-3">
            <ImageSlot
              title="Estilo clásico"
              hint="Look atemporal y cuidado."
              imageSrc="/images/galeria/estilo-clasico.png"
              imagePosition="center 22%"
              aspectRatio="16 / 9"
              minHeight="200px"
              className="lg:col-span-3"
            />
          </RevealOnScroll>
          <RevealOnScroll direction="left" delay={90} className="lg:col-span-3">
            <ImageSlot
              title="Look moderno"
              hint="Tendencia actual con estilo."
              imageSrc="/images/galeria/look-moderno.png"
              imagePosition="center 22%"
              aspectRatio="16 / 9"
              minHeight="200px"
              className="lg:col-span-3"
            />
          </RevealOnScroll>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section id="resenas" className="mx-auto max-w-6xl px-6 pb-16 md:pb-24">
        <div className="flex flex-col gap-2 text-center mb-10">
          <p className="text-sm text-primary font-medium">Reseñas</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
            Opiniones sobre el escáner
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Tecnología útil, resultados claros y una experiencia diferente.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <RevealOnScroll direction="left">
            <TestimonialCard
              name="Álvaro"
              title="Me clavó el estilo."
              text="El escáner acertó con el corte que mejor me quedaba. Rápido y muy fácil."
            />
          </RevealOnScroll>
          <RevealOnScroll direction="right" delay={90}>
            <TestimonialCard
              name="Marcos"
              title="Experiencia futurista."
              text="La sensación es premium: cámara, escaneo y recomendación en un momento."
            />
          </RevealOnScroll>
          <RevealOnScroll direction="left" delay={180}>
            <TestimonialCard
              name="Dani"
              title="Innovación que se nota."
              text="Me gustó que fuese 100% personalizado. Te da confianza antes de cortarte."
            />
          </RevealOnScroll>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="reserva" className="mx-auto max-w-6xl px-6 pb-20 md:pb-28">
        <div className="ice-card rounded-3xl p-8 md:p-12 text-center overflow-hidden relative">
          <div className="ice-cta-glow" aria-hidden="true" />
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
            Reserva o Contacto
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Es necesario instalar la app
          </p>
          <div className="mt-8 flex justify-center">
            <Button size="lg" className="ice-button ice-button-install px-12">
              Instalar App IceCold
            </Button>
          </div>

          {/* Instagram */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <a
              href="https://instagram.com/icecoldbarberapp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              @icecoldbarberapp
            </a>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Star className="h-4 w-4 text-primary" />
            <span>Premium · Tecnología · Estilo</span>
          </div>
        </div>
      </section>
    </main>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function RevealOnScroll({
  children,
  direction = "left",
  delay = 0,
  className,
}: {
  children: ReactNode
  direction?: "left" | "right"
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("is-visible")
          observer.unobserve(element)
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal-slide ${direction === "right" ? "from-right" : "from-left"} ${className ?? ""}`}
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

function StepCard({
  icon,
  step,
  title,
  description,
}: {
  icon: ReactNode
  step: string
  title: string
  description: string
}) {
  return (
    <div className="ice-card group rounded-2xl p-5 transition-colors hover:border-primary/40">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary group-hover:bg-primary/25 transition-colors shadow-[0_0_18px_rgba(76,201,255,0.25)]">
          {icon}
        </div>
        <span className="text-xs font-mono text-muted-foreground">{step}</span>
      </div>
      <h3 className="text-base font-semibold text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  )
}

function ImageSlot({
  title,
  hint,
  imageSrc,
  className,
  imagePosition,
  minHeight,
  aspectRatio,
}: {
  title: string
  hint: string
  imageSrc: string
  className?: string
  imagePosition?: string
  minHeight?: string
  aspectRatio?: string
}) {
  return (
    <div className={`ice-card rounded-3xl overflow-hidden ${className ?? ""}`}>
      <div
        className="ice-img-slot"
        style={
          {
            ["--slot-image" as string]: `url('${imageSrc}')`,
            ...(imagePosition
              ? { ["--slot-image-position" as string]: imagePosition }
              : {}),
            ...(minHeight ? { ["--slot-min-height" as string]: minHeight } : {}),
            ...(aspectRatio
              ? { ["--slot-aspect-ratio" as string]: aspectRatio }
              : {}),
          } as CSSProperties
        }
        role="img"
        aria-label={title}
      />
      <div className="p-5">
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{hint}</p>
      </div>
    </div>
  )
}

function TestimonialCard({
  name,
  title,
  text,
}: {
  name: string
  title: string
  text: string
}) {
  return (
    <div className="ice-card rounded-3xl p-6">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-foreground">{name}</p>
        <div
          className="flex items-center gap-1 text-primary/80"
          aria-hidden="true"
        >
          <Star className="h-4 w-4" fill="currentColor" />
          <Star className="h-4 w-4" fill="currentColor" />
          <Star className="h-4 w-4" fill="currentColor" />
          <Star className="h-4 w-4" fill="currentColor" />
          <Star className="h-4 w-4" fill="currentColor" />
        </div>
      </div>
      <p className="mt-4 text-base font-medium text-foreground">{title}</p>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        {text}
      </p>
    </div>
  )
}
