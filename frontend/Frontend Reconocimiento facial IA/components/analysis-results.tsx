"use client"

import { Check, Sparkles, ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { FaceAnalysis, HaircutRecommendation } from "@/lib/face-shape"
import { FACE_SHAPE_INFO } from "@/lib/face-shape"

interface AnalysisResultsProps {
  analysis: FaceAnalysis
  recommendation: HaircutRecommendation
  onRetry: () => void
}

export function AnalysisResults({
  analysis,
  recommendation,
  onRetry,
}: AnalysisResultsProps) {
  const shapeInfo = FACE_SHAPE_INFO[analysis.shape]
  const confidencePercent = Math.round(analysis.confidence * 100)

  return (
    <div className="flex flex-col gap-8">
      {/* Face shape result */}
      <div className="text-center">
        <Badge className="ice-pill mb-4 bg-transparent text-primary px-4 py-1.5 text-sm">
          <Sparkles className="mr-1.5 h-3.5 w-3.5" />
          Analisis Completado
        </Badge>
        <h2 className="text-3xl font-serif font-bold text-foreground md:text-4xl">
          Tu rostro es{" "}
          <span className="text-primary">{shapeInfo.label}</span>
        </h2>
        <p className="mt-3 text-muted-foreground max-w-md mx-auto leading-relaxed">
          {shapeInfo.description}
        </p>
        <div className="mt-4 flex items-center justify-center gap-2">
          <div className="h-2 w-32 rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-1000"
              style={{ width: `${confidencePercent}%` }}
            />
          </div>
          <span className="text-sm text-muted-foreground">
            {confidencePercent}% confianza
          </span>
        </div>
      </div>

      {/* Measurements */}
      <Card className="ice-card p-6">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
          Mediciones del Rostro
        </h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          <MeasurementItem
            label="Proporcion"
            value={analysis.measurements.ratio.toFixed(2)}
          />
          <MeasurementItem
            label="Ancho Pomulos"
            value={`${Math.round(analysis.measurements.cheekboneWidth)}px`}
          />
          <MeasurementItem
            label="Ancho Mandibula"
            value={`${Math.round(analysis.measurements.jawWidth)}px`}
          />
          <MeasurementItem
            label="Ancho Frente"
            value={`${Math.round(analysis.measurements.foreheadWidth)}px`}
          />
          <MeasurementItem
            label="Alto Rostro"
            value={`${Math.round(analysis.measurements.faceHeight)}px`}
          />
          <MeasurementItem
            label="Ancho Rostro"
            value={`${Math.round(analysis.measurements.faceWidth)}px`}
          />
        </div>
      </Card>

      {/* Haircut Recommendation */}
      <Card className="ice-card overflow-hidden">
        <div className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">
            Corte Recomendado
          </h3>
          <h4 className="text-2xl font-serif font-bold text-foreground">
            {recommendation.name}
          </h4>
        </div>

        <div className="relative flex w-full items-center justify-center overflow-hidden bg-secondary/30 p-4 md:p-6">
          <img
            src={recommendation.image}
            alt={`Corte de pelo recomendado: ${recommendation.name}`}
            className="h-auto max-h-[24rem] w-auto max-w-full rounded-xl object-contain md:max-h-[30rem]"
          />
        </div>

        <div className="p-6">
          <p className="text-muted-foreground leading-relaxed mb-6">
            {recommendation.description}
          </p>

          <h5 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <ArrowRight className="h-4 w-4 text-primary" />
            Consejos para tu tipo de rostro
          </h5>
          <ul className="flex flex-col gap-2.5">
            {recommendation.tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Check className="h-3 w-3 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground leading-relaxed">
                  {tip}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Card>

      <div className="flex justify-center">
        <Button onClick={onRetry} variant="outline" size="lg" className="ice-button-outline gap-2">
          Analizar Otro Rostro
        </Button>
      </div>
    </div>
  )
}

function MeasurementItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="ice-card rounded-xl p-3 text-center">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-lg font-semibold text-foreground">{value}</p>
    </div>
  )
}
