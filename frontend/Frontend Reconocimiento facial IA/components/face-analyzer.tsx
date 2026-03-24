"use client"

import { useState, useCallback, useEffect } from "react"
import { WebcamCapture } from "@/components/webcam-capture"
import { AnalysisResults } from "@/components/analysis-results"
import {
  analyzeFaceShape,
  HAIRCUT_RECOMMENDATIONS,
  type FaceAnalysis,
  type HaircutRecommendation,
} from "@/lib/face-shape"
import { Sparkles, ScanFace, Scissors, Zap } from "lucide-react"

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
        setLoadingStatus("Descargando modelos de deteccion facial...")
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
          "Error al cargar modelos. Recarga la pagina e intentalo de nuevo."
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
        // Create image element from captured data
        const img = document.createElement("img")
        img.crossOrigin = "anonymous"
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve()
          img.onerror = reject
          img.src = imageData
        })

        // Detect face and landmarks
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
          setRecommendation(HAIRCUT_RECOMMENDATIONS[result.shape])
        } else {
          // If no face detected, show a message
          setAnalysis(null)
          setRecommendation(null)
          alert(
            "No se detecto un rostro. Por favor, asegurate de que tu cara este bien iluminada y centrada."
          )
        }
      } catch (err) {
        console.error("Error analyzing face:", err)
        alert("Error al analizar la imagen. Por favor, intentalo de nuevo.")
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
      {/* Hero section */}
      <section className="ice-hero overflow-hidden">
        <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-24 text-center">
          <div className="ice-pill inline-flex items-center gap-2 px-4 py-1.5 text-sm text-primary mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            Tecnologia de Reconocimiento Facial
          </div>
          <h1 className="text-4xl font-serif font-bold text-foreground md:text-6xl leading-tight text-balance">
            Descubre tu Corte de
            <br />
            <span className="text-primary">Pelo Ideal</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty">
            Nuestra IA analiza la forma de tu rostro y te recomienda el corte de
            pelo perfecto. Solo necesitas una foto.
          </p>
        </div>
      </section>

      {/* How it works */}
      {!analysis && (
        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-12">
            <StepCard
              icon={<ScanFace className="h-6 w-6" />}
              step="01"
              title="Captura tu Rostro"
              description="Activa tu camara y toma una foto clara de tu rostro de frente"
            />
            <StepCard
              icon={<Zap className="h-6 w-6" />}
              step="02"
              title="Analisis con IA"
              description="Nuestra IA detecta los puntos clave de tu rostro y determina su forma"
            />
            <StepCard
              icon={<Scissors className="h-6 w-6" />}
              step="03"
              title="Tu Corte Ideal"
              description="Recibe una recomendacion personalizada con imagen del corte sugerido"
            />
          </div>
        </section>
      )}

      {/* Main content */}
      <section className="mx-auto max-w-3xl px-6 pb-20">
        {!isModelLoaded && loadingStatus && (
          <div className="flex flex-col items-center gap-4 py-12">
            <div className="h-10 w-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
            <p className="text-sm text-muted-foreground">{loadingStatus}</p>
          </div>
        )}

        {isModelLoaded && !analysis && (
          <WebcamCapture onCapture={handleCapture} isProcessing={isProcessing} />
        )}

        {analysis && recommendation && (
          <AnalysisResults
            analysis={analysis}
            recommendation={recommendation}
            onRetry={handleRetry}
          />
        )}
      </section>
    </main>
  )
}

function StepCard({
  icon,
  step,
  title,
  description,
}: {
  icon: React.ReactNode
  step: string
  title: string
  description: string
}) {
  return (
    <div className="ice-card group rounded-2xl p-6 transition-colors hover:border-primary/40">
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
