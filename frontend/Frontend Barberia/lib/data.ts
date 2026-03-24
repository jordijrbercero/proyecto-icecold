export const platformData = {
  name: "Ice Cold",
  tagline: "La plataforma para barberías que combina reservas online y recomendaciones de cortes con IA",
  description: "Estamos construyendo una nueva forma de descubrir cortes de pelo: analiza tu rostro, encuentra tu estilo ideal y reserva fácilmente.",
  
  contact: {
    email: "hola@icecold.io",
    instagram: "icecold_app",
  },

  howItWorks: [
    {
      step: 1,
      title: "Escanea tu rostro",
      description: "El cliente utiliza la cámara para analizar su cara de forma rápida y segura.",
      icon: "scan",
    },
    {
      step: 2,
      title: "La IA recomienda el mejor corte",
      description: "Nuestro sistema analiza la forma del rostro y sugiere estilos que favorecen al cliente.",
      icon: "sparkles",
    },
    {
      step: 3,
      title: "Reserva fácilmente",
      description: "El cliente puede reservar en barberías que utilicen la plataforma.",
      icon: "calendar",
    },
  ],

  benefits: [
    {
      title: "Más reservas",
      description: "Un sistema moderno que facilita que los clientes encuentren y reserven barberías en cualquier momento.",
      icon: "trending",
    },
    {
      title: "Clientes más satisfechos",
      description: "La IA ayuda a elegir un corte que realmente favorece al cliente, reduciendo malentendidos.",
      icon: "smile",
    },
    {
      title: "Diferenciación tecnológica",
      description: "Las barberías podrán ofrecer una experiencia innovadora basada en inteligencia artificial.",
      icon: "star",
    },
    {
      title: "Menos indecisión del cliente",
      description: "Los clientes llegan sabiendo qué corte quieren, eliminando el típico 'no sé qué cortarme'.",
      icon: "target",
    },
  ],

  technology: {
    title: "Inteligencia artificial aplicada al estilo personal",
    description: "Nuestro sistema analiza características faciales para recomendar los estilos de corte que mejor se adaptan a cada persona.",
    features: [
      {
        title: "Forma del rostro",
        description: "Detectamos si el rostro es ovalado, redondo, cuadrado, alargado u otras formas.",
      },
      {
        title: "Proporciones faciales",
        description: "Analizamos las proporciones entre frente, nariz, mandíbula y pómulos.",
      },
      {
        title: "Línea de la mandíbula",
        description: "Evaluamos la definición y ángulo de la mandíbula para sugerir cortes que la favorezcan.",
      },
      {
        title: "Frente y pómulos",
        description: "Consideramos el tamaño de la frente y la estructura de los pómulos.",
      },
    ],
  },

  faq: [
    {
      question: "¿Cómo funcionará el escáner de IA?",
      answer: "El cliente accederá a la web de la barbería, activará la cámara y nuestro algoritmo analizará su rostro en segundos. Basándose en la forma de la cara, proporciones y características faciales, sugerirá los cortes que mejor le favorecerán.",
    },
    {
      question: "¿Se necesitará hardware especial?",
      answer: "No, todo funcionará a través del navegador web. Los clientes solo necesitarán un smartphone o tablet con cámara.",
    },
    {
      question: "¿Cuándo estará disponible la plataforma?",
      answer: "Estamos en fase de desarrollo. Síguenos en redes sociales para estar al tanto de las novedades y el lanzamiento.",
    },
    {
      question: "¿Cómo se integrará con mi negocio?",
      answer: "Proporcionaremos un enlace único para cada barbería. Podrás compartirlo en redes sociales, WhatsApp, o añadirlo a tu web existente.",
    },
  ],

  vision: {
    title: "La próxima generación de barberías será digital",
    description: "Estamos desarrollando una plataforma que conectará inteligencia artificial, reservas online y barberías para crear una nueva experiencia para los clientes.",
  },
}

export type HowItWorksStep = typeof platformData.howItWorks[number]
export type Benefit = typeof platformData.benefits[number]
export type FAQ = typeof platformData.faq[number]
