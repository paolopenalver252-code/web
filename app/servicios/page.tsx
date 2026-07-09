import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { ServiceDetail } from "@/components/sections/service-detail";
import { FinalCta } from "@/components/sections/final-cta";
import { SERVICE_LEVELS } from "@/lib/services";

export const metadata: Metadata = {
  title: "Servicios — El sistema de cuatro niveles",
  description:
    "Auditoría de visibilidad, presencia digital profesional, reservas automatizadas y crecimiento mensual. Cuatro niveles, un mismo sistema de crecimiento para clínicas y centros de bienestar.",
};

export default function ServiciosPage() {
  return (
    <>
      <PageHero
        eyebrow="Servicios"
        title="Un sistema. Cuatro niveles de profundidad."
        description="Cada nivel resuelve un problema concreto y prepara el terreno para el siguiente. Empiece donde su clínica esté hoy — el sistema crece con usted."
      />
      <div>
        {SERVICE_LEVELS.map((level, i) => (
          <ServiceDetail key={level.id} level={level} index={i} />
        ))}
      </div>
      <FinalCta />
    </>
  );
}
