export const barbershopData = {
  name: "Ice Cold Barbershop",
  slogan: "Donde el estilo cobra vida",
  description: "Expertos en cortes clásicos y modernos. Tu barbería de confianza con más de 10 años de experiencia.",
  
  contact: {
    phone: "+34 612 345 678",
    whatsapp: "34612345678",
    email: "info@icecold.es",
    instagram: "icecold_barbershop",
  },
  
  location: {
    address: "Calle Gran Vía, 45",
    city: "Madrid",
    postalCode: "28013",
    country: "España",
    googleMapsUrl: "https://maps.google.com/?q=Gran+Via+45+Madrid",
    coordinates: {
      lat: 40.4200,
      lng: -3.7025,
    }
  },
  
  hours: [
    { day: "Lunes", hours: "Cerrado" },
    { day: "Martes", hours: "10:00 - 20:00" },
    { day: "Miércoles", hours: "10:00 - 20:00" },
    { day: "Jueves", hours: "10:00 - 20:00" },
    { day: "Viernes", hours: "10:00 - 21:00" },
    { day: "Sábado", hours: "09:00 - 18:00" },
    { day: "Domingo", hours: "Cerrado" },
  ],
  
  services: [
    {
      id: 1,
      name: "Corte Clásico",
      description: "Corte tradicional con tijera y máquina, incluye lavado y peinado.",
      price: 15,
      duration: "30 min",
    },
    {
      id: 2,
      name: "Corte + Barba",
      description: "Corte completo más perfilado y arreglo de barba con navaja.",
      price: 25,
      duration: "45 min",
    },
    {
      id: 3,
      name: "Degradado / Fade",
      description: "Corte con degradado personalizado, bajo, medio o alto.",
      price: 18,
      duration: "35 min",
    },
    {
      id: 4,
      name: "Arreglo de Barba",
      description: "Perfilado, recorte y cuidado de barba con productos premium.",
      price: 12,
      duration: "20 min",
    },
    {
      id: 5,
      name: "Afeitado Clásico",
      description: "Afeitado tradicional con navaja, toalla caliente y aftershave.",
      price: 15,
      duration: "25 min",
    },
    {
      id: 6,
      name: "Tratamiento Capilar",
      description: "Tratamiento hidratante y nutritivo para el cabello.",
      price: 20,
      duration: "30 min",
    },
  ],
  
  team: [
    {
      id: 1,
      name: "Carlos Mendoza",
      role: "Fundador & Master Barber",
      bio: "Con más de 15 años de experiencia, Carlos fundó Ice Cold con la visión de crear un espacio único donde el estilo clásico se encuentra con las tendencias modernas.",
      specialties: ["Fades", "Cortes clásicos", "Diseños"],
    },
    {
      id: 2,
      name: "Miguel Ángel Torres",
      role: "Senior Barber",
      bio: "Especialista en degradados y técnicas modernas. Miguel trae creatividad y precisión a cada corte.",
      specialties: ["Degradados", "Texturas", "Barba"],
    },
    {
      id: 3,
      name: "David Ruiz",
      role: "Barber & Stylist",
      bio: "Apasionado por las últimas tendencias, David combina técnica clásica con estilos contemporáneos.",
      specialties: ["Tendencias", "Color", "Styling"],
    },
  ],
  
  gallery: [
    { id: 1, alt: "Degradado bajo con línea" },
    { id: 2, alt: "Corte clásico con barba" },
    { id: 3, alt: "Fade medio texturizado" },
    { id: 4, alt: "Diseño geométrico" },
    { id: 5, alt: "Pompadour moderno" },
    { id: 6, alt: "Buzz cut con degradado" },
  ],
  
  about: {
    title: "Más que una barbería",
    description: "Ice Cold Barbershop nació en 2014 con una misión clara: ofrecer servicios de barbería de primera calidad en un ambiente único. Combinamos técnicas tradicionales con las últimas tendencias para crear looks personalizados que reflejan tu estilo.",
    features: [
      "Más de 10 años de experiencia",
      "Productos premium de barbería",
      "Ambiente exclusivo y relajado",
      "Atención personalizada",
    ],
  },
}

export type Service = typeof barbershopData.services[number]
export type TeamMember = typeof barbershopData.team[number]
export type GalleryItem = typeof barbershopData.gallery[number]
