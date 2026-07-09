import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { LegalProse } from "@/components/sections/legal-prose";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  description: "Términos y condiciones de uso de los servicios de POTENARIS AI Growth Systems.",
};

export default function TerminosPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Términos y Condiciones" />
      <LegalProse>
        <p>
          Estos términos regulan el uso de este sitio web y la contratación de los
          servicios ofrecidos por POTENARIS AI Growth Systems.
        </p>

        <h2>Servicios</h2>
        <p>
          POTENARIS ofrece servicios de auditoría digital, presencia web, automatización
          de reservas y gestión de crecimiento para clínicas privadas, centros de
          bienestar y profesionales de la salud, conforme al alcance descrito en cada
          nivel del sistema en la sección de{" "}
          <strong>Servicios</strong>.
        </p>

        <h2>Precios</h2>
        <p>
          Los precios indicados son orientativos y pueden variar según el alcance
          específico acordado con cada cliente. El presupuesto definitivo se confirma
          antes de iniciar cualquier trabajo.
        </p>

        <h2>Propiedad intelectual</h2>
        <p>
          Los entregables desarrollados específicamente para un cliente pasan a ser de
          su propiedad una vez completado el pago acordado, salvo herramientas o
          sistemas de uso interno de POTENARIS.
        </p>

        <h2>Contacto</h2>
        <p>
          Para cualquier consulta sobre estos términos, escríbanos a{" "}
          <strong>hola@potenaris.ai</strong>.
        </p>
      </LegalProse>
    </>
  );
}
