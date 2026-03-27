"use client"

import { useRef, useState, useCallback, useEffect } from "react"
import { Camera, RotateCcw, Loader2, ScanFace } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WebcamCaptureProps {
  onCapture: (imageData: string) => void
  isProcessing: boolean
}

export function WebcamCapture({ onCapture, isProcessing }: WebcamCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const [isCaptured, setIsCaptured] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const startCamera = useCallback(async () => {
    try {
      setError(null)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 640 },
          height: { ideal: 480 },
        },
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play()
          setIsStreaming(true)
        }
      }
    } catch {
      setError(
        "No se pudo acceder a la camara. Por favor, permite el acceso a la camara en tu navegador."
      )
    }
  }, [])

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
      videoRef.current.srcObject = null
      setIsStreaming(false)
    }
  }, [])

  const capture = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext("2d")
      if (ctx) {
        // Mirror the image for selfie view
        ctx.translate(canvas.width, 0)
        ctx.scale(-1, 1)
        ctx.drawImage(video, 0, 0)
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        const imageData = canvas.toDataURL("image/jpeg", 0.9)
        setCapturedImage(imageData)
        setIsCaptured(true)
        stopCamera()
        onCapture(imageData)
      }
    }
  }, [onCapture, stopCamera])

  const retake = useCallback(() => {
    setCapturedImage(null)
    setIsCaptured(false)
    startCamera()
  }, [startCamera])

  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [stopCamera])

  return (
    <div className="flex flex-col items-center gap-6">
      <div
        className={`ice-panel ice-grid-surface ice-scanner relative w-full max-w-xl overflow-hidden rounded-2xl ${
          isStreaming && !isCaptured ? "ice-scanner-active" : ""
        }`}
      >
        {/* Scanning overlay animation */}
        {isStreaming && !isCaptured && (
          <div className="absolute inset-0 z-10 pointer-events-none">
            <div className="absolute inset-4 rounded-lg border-2 border-primary/40">
              <div className="absolute top-0 left-0 h-6 w-6 border-t-2 border-l-2 border-primary rounded-tl-md" />
              <div className="absolute top-0 right-0 h-6 w-6 border-t-2 border-r-2 border-primary rounded-tr-md" />
              <div className="absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-primary rounded-bl-md" />
              <div className="absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-primary rounded-br-md" />
            </div>
            <div className="absolute inset-4 overflow-hidden rounded-lg">
              <div className="absolute inset-x-0 h-0.5 bg-primary/60 animate-[scanline_2s_ease-in-out_infinite]" />
            </div>
          </div>
        )}

        {isProcessing && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">
                Analizando tu rostro...
              </p>
            </div>
          </div>
        )}

        {!isStreaming && !isCaptured && !error && (
          <div className="flex aspect-[4/3] flex-col items-center justify-center gap-4 p-8">
            <div className="rounded-full bg-primary/15 p-6 shadow-[0_0_24px_rgba(76,201,255,0.35)]">
              <ScanFace className="h-12 w-12 text-primary" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground">
                Activa tu camara
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Necesitamos acceso a tu camara para analizar la forma de tu
                rostro
              </p>
            </div>
            <Button onClick={startCamera} className="ice-button gap-2 px-6">
              <Camera className="h-4 w-4" />
              Iniciar Camara
            </Button>
          </div>
        )}

        {error && (
          <div className="flex aspect-[4/3] flex-col items-center justify-center gap-4 p-8">
            <div className="rounded-full bg-destructive/10 p-6">
              <Camera className="h-12 w-12 text-destructive" />
            </div>
            <p className="text-center text-sm text-destructive">{error}</p>
            <Button onClick={startCamera} variant="outline" className="ice-button-outline gap-2 px-6">
              <RotateCcw className="h-4 w-4" />
              Reintentar
            </Button>
          </div>
        )}

        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`aspect-[4/3] w-full object-cover -scale-x-100 ${
            isStreaming && !isCaptured ? "block" : "hidden"
          }`}
        />

        {isCaptured && capturedImage && (
          <img
            src={capturedImage}
            alt="Foto capturada de tu rostro"
            className="aspect-[4/3] w-full object-cover"
          />
        )}

        <canvas ref={canvasRef} className="hidden" />
      </div>

      {isStreaming && !isCaptured && (
        <Button
          onClick={capture}
          size="lg"
          className="ice-button gap-2 px-8"
        >
          <Camera className="h-5 w-5" />
          Capturar Foto
        </Button>
      )}

      {isCaptured && !isProcessing && (
        <Button
          onClick={retake}
          variant="outline"
          size="lg"
          className="ice-button-outline gap-2 px-6"
        >
          <RotateCcw className="h-5 w-5" />
          Tomar Otra Foto
        </Button>
      )}
    </div>
  )
}
