export type ServiceLevel = {
  id: string;
  n: string;
  tag: string;
  name: string;
  priceRange: string;
  priceSuffix?: string;
  goal: string;
  forWhom: string;
  outcomes: string[];
  ctaLabel: string;
  ctaHref: string;
  featured?: boolean;
};

export const SERVICE_LEVELS: ServiceLevel[] = [
  {
    id: "nivel-01",
    n: "01",
    tag: "Punto de entrada",
    name: "Auditoría de Visibilidad y Reservas",
    priceRange: "29€ – 59€",
    goal: "Descubrir exactamente por qué su clínica no recibe más reservas online.",
    forWhom:
      "Clínicas que sospechan que están perdiendo pacientes online, pero no saben identificar dónde ni por qué.",
    outcomes: [
      "Análisis completo de su presencia en Google y redes sociales",
      "Revisión del proceso de reserva actual, paso a paso",
      "Comparativa directa frente a su competencia local",
      "Informe con las 3 acciones de mayor impacto inmediato",
    ],
    ctaLabel: "Reservar mi auditoría",
    ctaHref: "/contacto",
    featured: true,
  },
  {
    id: "nivel-02",
    n: "02",
    tag: "Fundamentos",
    name: "Presencia Digital Profesional",
    priceRange: "297€ – 697€",
    goal: "Una presencia digital que transmite la confianza que su clínica ya merece.",
    forWhom:
      "Clínicas con una web anticuada, lenta, o sin presencia digital estructurada más allá de redes sociales.",
    outcomes: [
      "Web profesional optimizada para conversión y velocidad",
      "Perfil de Google Business optimizado para búsquedas locales",
      "Estructura de contenido pensada para SEO local",
      "Base de reputación: reseñas centralizadas y presentables",
    ],
    ctaLabel: "Hablar sobre este nivel",
    ctaHref: "/contacto",
  },
  {
    id: "nivel-03",
    n: "03",
    tag: "Automatización",
    name: "Sistema de Reservas Automatizado",
    priceRange: "500€ – 1.500€",
    goal: "Que las reservas entren solas, sin que usted tenga que perseguirlas.",
    forWhom:
      "Clínicas que ya tienen demanda, pero pierden tiempo y pacientes gestionando citas manualmente.",
    outcomes: [
      "Reservas online 24/7 sincronizadas con su agenda",
      "Recordatorios y confirmaciones automáticas por WhatsApp y SMS",
      "Captura de nuevos leads sin intervención manual",
      "Reducción de ausencias mediante recordatorios inteligentes",
    ],
    ctaLabel: "Hablar sobre este nivel",
    ctaHref: "/contacto",
  },
  {
    id: "nivel-04",
    n: "04",
    tag: "Motor de crecimiento",
    name: "Sistema de Crecimiento Mensual",
    priceRange: "350€ – 900€",
    priceSuffix: "/mes",
    goal: "Crecimiento predecible, mes a mes, sin depender de campañas puntuales.",
    forWhom:
      "Clínicas que ya tienen el sistema base y quieren un motor de crecimiento gestionado de forma continua.",
    outcomes: [
      "SEO local y gestión de reputación de forma continua",
      "Contenido y campañas orientadas a captar nuevos pacientes",
      "Optimización continua del sistema de reservas",
      "Reporting mensual con métricas reales de negocio",
    ],
    ctaLabel: "Hablar con nosotros",
    ctaHref: "/contacto",
  },
];
