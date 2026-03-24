export type FaceShape = "oval" | "round" | "square" | "heart" | "oblong"

export interface FaceAnalysis {
  shape: FaceShape
  confidence: number
  measurements: {
    faceWidth: number
    faceHeight: number
    jawWidth: number
    foreheadWidth: number
    cheekboneWidth: number
    ratio: number
  }
}

export interface HaircutRecommendation {
  name: string
  description: string
  image: string
  tips: string[]
}

export const FACE_SHAPE_INFO: Record<
  FaceShape,
  { label: string; description: string; icon: string }
> = {
  oval: {
    label: "Ovalado",
    description:
      "Tu rostro es proporcionado con una frente ligeramente mas ancha que la mandibula. Es la forma mas versatil.",
    icon: "oval",
  },
  round: {
    label: "Redondo",
    description:
      "Tu rostro tiene un ancho y largo similares con mejillas llenas y una mandibula suave y redondeada.",
    icon: "circle",
  },
  square: {
    label: "Cuadrado",
    description:
      "Tu rostro tiene una mandibula fuerte y angular con la frente y mandibula de similar ancho.",
    icon: "square",
  },
  heart: {
    label: "Corazon",
    description:
      "Tu rostro tiene una frente amplia que se estrecha hacia una mandibula mas angosta y puntiaguda.",
    icon: "heart",
  },
  oblong: {
    label: "Alargado",
    description:
      "Tu rostro es mas largo que ancho con una frente, pomulos y mandibula de similar ancho.",
    icon: "rectangle",
  },
}

export const HAIRCUT_RECOMMENDATIONS: Record<FaceShape, HaircutRecommendation> =
  {
    oval: {
      name: "Capas Medias con Flequillo Lateral",
      description:
        "Un corte de capas medias con flequillo lateral realza tus proporciones naturales. La forma ovalada es la mas versatil, asi que puedes experimentar con muchos estilos.",
      image: "/images/haircut-oval.svg",
      tips: [
        "Experimenta con diferentes longitudes",
        "Las capas largas o medianas te favorecen",
        "El flequillo lateral anade dinamismo",
        "Evita demasiado volumen en la parte superior",
      ],
    },
    round: {
      name: "Capas Largas con Volumen Superior",
      description:
        "Las capas largas y angulares crean la ilusion de un rostro mas alargado. El volumen en la parte superior equilibra las proporciones redondeadas.",
      image: "/images/haircut-round.svg",
      tips: [
        "Anade volumen en la coronilla",
        "Evita cortes a la altura de la barbilla",
        "Las capas largas alargan el rostro visualmente",
        "El pelo liso a los lados reduce el ancho",
      ],
    },
    square: {
      name: "Bob Ondulado con Capas Suaves",
      description:
        "Un bob ondulado suaviza los angulos de la mandibula. Las capas suaves alrededor del rostro crean un look mas delicado y femenino.",
      image: "/images/haircut-square.svg",
      tips: [
        "Las ondas suavizan la mandibula angular",
        "Evita cortes muy geometricos",
        "Las capas laterales reducen la apariencia cuadrada",
        "El flequillo lateral complementa esta forma",
      ],
    },
    heart: {
      name: "Bob a la Altura de la Barbilla",
      description:
        "Un bob a la altura de la barbilla anade amplitud donde mas se necesita, equilibrando la frente mas amplia con la mandibula estrecha.",
      image: "/images/haircut-heart.svg",
      tips: [
        "Anade volumen a la altura de la barbilla",
        "La raya lateral equilibra la frente",
        "Evita demasiado volumen en la parte superior",
        "Las capas que terminan en la barbilla son ideales",
      ],
    },
    oblong: {
      name: "Corte con Flequillo y Volumen Lateral",
      description:
        "Un corte a la altura de los hombros con flequillo completo y volumen lateral acorta visualmente el rostro y anade la amplitud necesaria.",
      image: "/images/haircut-oblong.svg",
      tips: [
        "El flequillo acorta visualmente el rostro",
        "Anade volumen a los lados",
        "Evita el cabello muy largo y liso",
        "Las ondas y rizos sueltos aportan amplitud",
      ],
    },
  }

export function analyzeFaceShape(landmarks: number[][]): FaceAnalysis {
  // Key landmark indices for face-api.js 68-point model:
  // Jawline: 0-16
  // Right eyebrow: 17-21
  // Left eyebrow: 22-26
  // Nose bridge: 27-30
  // Nose tip: 31-35
  // Right eye: 36-41
  // Left eye: 42-47
  // Outer lips: 48-59
  // Inner lips: 60-67

  if (landmarks.length < 68) {
    return {
      shape: "oval",
      confidence: 0.5,
      measurements: {
        faceWidth: 0,
        faceHeight: 0,
        jawWidth: 0,
        foreheadWidth: 0,
        cheekboneWidth: 0,
        ratio: 1.3,
      },
    }
  }

  // Face width at cheekbones (widest part) - points 1 and 15
  const cheekboneWidth = Math.abs(landmarks[1][0] - landmarks[15][0])

  // Face height - from chin (8) to forehead (estimated from nose bridge 27)
  const chinY = landmarks[8][1]
  const noseBridgeY = landmarks[27][1]
  const foreheadY = noseBridgeY - (chinY - noseBridgeY) * 0.5
  const faceHeight = chinY - foreheadY

  // Jaw width - points 5 and 11
  const jawWidth = Math.abs(landmarks[5][0] - landmarks[11][0])

  // Forehead width - points 17 and 26 (eyebrow endpoints)
  const foreheadWidth = Math.abs(landmarks[17][0] - landmarks[26][0])

  // Face width at jaw - points 3 and 13
  const faceWidth = Math.abs(landmarks[3][0] - landmarks[13][0])

  const ratio = faceHeight / cheekboneWidth

  // Determine face shape based on proportions
  let shape: FaceShape
  let confidence: number

  const jawRatio = jawWidth / cheekboneWidth
  const foreheadRatio = foreheadWidth / cheekboneWidth

  if (ratio > 1.55) {
    // Face is significantly taller than wide
    shape = "oblong"
    confidence = Math.min(0.95, 0.7 + (ratio - 1.55) * 0.5)
  } else if (ratio < 1.15) {
    // Face is nearly as wide as tall
    if (jawRatio > 0.85) {
      shape = "square"
      confidence = Math.min(0.95, 0.7 + jawRatio * 0.2)
    } else {
      shape = "round"
      confidence = Math.min(0.95, 0.7 + (1.15 - ratio) * 0.5)
    }
  } else if (foreheadRatio > 0.9 && jawRatio < 0.7) {
    // Wide forehead, narrow jaw
    shape = "heart"
    confidence = Math.min(
      0.95,
      0.7 + (foreheadRatio - jawRatio) * 0.3
    )
  } else if (jawRatio > 0.85 && Math.abs(foreheadRatio - jawRatio) < 0.1) {
    // Similar jaw and forehead width with strong jaw
    shape = "square"
    confidence = Math.min(0.95, 0.7 + jawRatio * 0.2)
  } else {
    // Default proportional shape
    shape = "oval"
    confidence = Math.min(0.95, 0.6 + Math.abs(ratio - 1.35) * 0.3)
  }

  return {
    shape,
    confidence,
    measurements: {
      faceWidth,
      faceHeight,
      jawWidth,
      foreheadWidth,
      cheekboneWidth,
      ratio,
    },
  }
}
