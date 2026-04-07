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

export const HAIRCUT_RECOMMENDATIONS: Record<
  FaceShape,
  HaircutRecommendation[]
> = {
  oval: [
    {
      name: "Middle Part",
      description:
        "La raya al medio aprovecha la simetria natural del rostro ovalado y da un look limpio y moderno.",
      image: "/img/middlepart.webp",
      tips: [
        "Mantener volumen medio en los laterales",
        "Funciona bien con largo medio",
        "Peina con acabado natural",
        "Recorta puntas cada 3-4 semanas",
      ],
    },
    {
      name: "Side Part",
      description:
        "Un side part define estructura sin endurecer facciones y encaja muy bien en rostros proporcionados.",
      image: "/img/sidepart.webp",
      tips: [
        "Marca una raya limpia con peine",
        "Usa pomada ligera para control",
        "Mantener laterales ordenados",
        "Ideal para estilo clasico o formal",
      ],
    },
    {
      name: "French Crop",
      description:
        "El french crop aporta textura frontal y es facil de mantener para un estilo actual.",
      image: "/img/frenchcrop.webp",
      tips: [
        "Texturiza la parte superior",
        "Flequillo corto para marcar frente",
        "Laterales limpios para contraste",
        "Perfecto si buscas bajo mantenimiento",
      ],
    },
  ],
  round: [
    {
      name: "Burst Fade",
      description:
        "El burst fade estiliza visualmente el rostro redondo al crear altura y contraste lateral.",
      image: "/img/burstfade.jpg",
      tips: [
        "Sube volumen en la zona superior",
        "Evita flequillos pesados y rectos",
        "Mantener degradado bien definido",
        "Textura arriba para alargar visualmente",
      ],
    },
    {
      name: "Mid Fade con Quiff",
      description:
        "El quiff con degradado medio aporta verticalidad y equilibra mejillas anchas.",
      image: "/img/midfadeconquif.jpg",
      tips: [
        "Seca elevando raiz frontal",
        "Usa cera mate para fijacion ligera",
        "Laterales mas cortos para estilizar",
        "Repaso cada 2-3 semanas",
      ],
    },
    {
      name: "Low Fade",
      description:
        "Un low fade bien trabajado reduce volumen lateral y da una silueta mas alargada.",
      image: "/img/lowfade.jpg",
      tips: [
        "Mantener transicion limpia",
        "Combinar con parte superior texturizada",
        "Evita dejar demasiado ancho en lados",
        "Ideal para look sobrio y moderno",
      ],
    },
  ],
  square: [
    {
      name: "Taper Fade",
      description:
        "El taper fade suaviza lineas fuertes de mandibula manteniendo un acabado profesional.",
      image: "/img/taperfade.webp",
      tips: [
        "No subas demasiado el degradado",
        "Conserva algo de largo arriba",
        "Peinado con textura para suavizar",
        "Muy versatil para diario",
      ],
    },
    {
      name: "Low Taper Fade",
      description:
        "El low taper fade conserva estructura pero baja dureza en contornos para un equilibrio natural.",
      image: "/img/lowtaperfade.webp",
      tips: [
        "Contorno limpio sin exagerar lineas",
        "Laterales discretos para equilibrio",
        "Acabado natural o semimate",
        "Combina bien con barba corta",
      ],
    },
  ],
  heart: [
    {
      name: "Buzz Cut",
      description:
        "El buzz cut simplifica volumen en la frente y deja un look potente y minimalista.",
      image: "/img/buzzcut.jpg",
      tips: [
        "Usa medidas medias para no endurecer",
        "Define bien contornos",
        "Hidrata cuero cabelludo",
        "Mantenimiento rapido semanal",
      ],
    },
    {
      name: "Mohicano",
      description:
        "El mohicano concentra protagonismo en el centro y reduce peso visual en los lados.",
      image: "/img/mohicano.jpg",
      tips: [
        "Laterales muy limpios para contraste",
        "Altura controlada en la cresta",
        "Fijacion flexible para movimiento",
        "Ideal para estilo atrevido",
      ],
    },
  ],
  oblong: [
    {
      name: "Modern Mullet",
      description:
        "El modern mullet aporta cuerpo en zona trasera y lateral para equilibrar rostros alargados.",
      image: "/img/modernmullet.jpeg",
      tips: [
        "No exagerar altura en la coronilla",
        "Aporta textura en laterales",
        "Mantener nuca con forma limpia",
        "Muy bueno para look urbano",
      ],
    },
    {
      name: "Calvo",
      description:
        "El estilo calvo limpio elimina contrastes verticales y proyecta un acabado solido y elegante.",
      image: "/img/calvo.jpg",
      tips: [
        "Afeitado uniforme y regular",
        "Protector solar en cuero cabelludo",
        "Hidratacion diaria para brillo sano",
        "Combina excelente con barba perfilada",
      ],
    },
  ],
}

export function getHaircutRecommendation(shape: FaceShape): HaircutRecommendation {
  const options = HAIRCUT_RECOMMENDATIONS[shape]
  const randomIndex = Math.floor(Math.random() * options.length)
  return options[randomIndex]
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
