export const platformData = {
  name: "Ice Cold",
  tagline: "Reservas + IA para barberias.",
  description: "Software para barberias con reservas online y IA facial.",
  eyebrow: "Reservas + IA",

  contact: {
    email: "hola@icecold.io",
    instagram: "icecold_app",
  },

  heroStats: [
    { value: "24/7", label: "Reservas" },
    { value: "IA", label: "IA facial" },
    { value: "B2B", label: "Para barberias" },
  ],

  services: [
    {
      category: "Reservas",
      items: [
        {
          name: "Agenda online",
          detail: "Reserva rapida desde el movil.",
          price: "24/7",
        },
        {
          name: "Captacion social",
          detail: "Instagram y WhatsApp a reserva.",
          price: "Mas reservas",
        },
      ],
    },
    {
      category: "IA",
      items: [
        {
          name: "IA facial",
          detail: "Sugerencias antes de reservar.",
          price: "IA aplicada",
        },
        {
          name: "Diagnostico previo",
          detail: "Mas contexto en cada cita.",
          price: "Mas claridad",
        },
      ],
    },
    {
      category: "Marca",
      items: [],
    },
  ],

  howItWorks: [
    {
      step: 1,
      title: "Activa el enlace",
      description: "Comparte en web, bio o WhatsApp.",
      icon: "scan",
    },
    {
      step: 2,
      title: "IA orienta el estilo",
      description: "Sugerencias claras antes de reservar.",
      icon: "sparkles",
    },
    {
      step: 3,
      title: "Reserva con contexto",
      description: "La cita llega mejor preparada.",
      icon: "calendar",
    },
  ],

  benefits: [
    {
      title: "Tecnologia con identidad",
      description: "Visual de barberia, sin sonar generico.",
      icon: "star",
    },
    {
      title: "Mas reservas, menos gestion",
      description: "Menos mensajes, mas citas.",
      icon: "trending",
    },
    {
      title: "Clientes mas decididos",
      description: "IA previa para orientar el estilo.",
      icon: "smile",
    },
    {
      title: "Barberias mejor posicionadas",
      description: "Imagen mas moderna y clara.",
      icon: "target",
    },
  ],

  technology: {
    title: "IA facial para mejorar la reserva",
    description: "Analizamos rasgos para sugerir estilos. El barbero decide.",
    features: [
      {
        title: "Lectura facial",
        description: "Detecta forma y proporciones.",
      },
      {
        title: "Sugerencia previa",
        description: "Antes de la cita, con contexto.",
      },
      {
        title: "Agenda integrada",
        description: "IA y reserva en un solo flujo.",
      },
      {
        title: "Ventaja real",
        description: "Innovacion sin perder identidad.",
      },
    ],
  },

  faq: [
    {
      question: "Que es Ice Cold?",
      answer: "Software para barberias con reservas e IA facial.",
    },
    {
      question: "La IA sustituye al barbero?",
      answer: "No. La IA orienta, el barbero decide.",
    },
    {
      question: "Hace falta hardware especial?",
      answer: "No. Funciona en navegador y movil.",
    },
    {
      question: "Que gana una barberia?",
      answer: "Mas reservas y mejor experiencia.",
    },
  ],

  vision: {
    title: "Tecnologia que encaja con el sector barberia.",
    description: "Reservas, marca e IA en una propuesta clara.",
  },
}

export type HowItWorksStep = typeof platformData.howItWorks[number]
export type Benefit = typeof platformData.benefits[number]
export type FAQ = typeof platformData.faq[number]
