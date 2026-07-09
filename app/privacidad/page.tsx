import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { LegalProse } from "@/components/sections/legal-prose";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: "Política de privacidad y tratamiento de datos de POTENARIS AI Growth Systems.",
};

export default function PrivacidadPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Política de Privacidad" />
      <LegalProse>
        <p>
          En POTENARIS AI Growth Systems (&quot;POTENARIS&quot;, &quot;nosotros&quot;)
          nos tomamos en serio la protección de sus datos personales. Esta política
          explica qué información recopilamos, cómo la usamos y qué derechos le
          corresponden conforme al Reglamento General de Protección de Datos (RGPD).
        </p>

        <h2>Qué datos recopilamos</h2>
        <p>Cuando utiliza nuestro formulario de contacto o solicita una auditoría, podemos recopilar:</p>
        <ul>
          <li>Nombre completo y datos de contacto (email, teléfono)</li>
          <li>Nombre de su clínica o centro</li>
          <li>Información que usted decida compartir sobre su negocio</li>
        </ul>

        <h2>Para qué usamos sus datos</h2>
        <p>
          Utilizamos su información exclusivamente para responder a su solicitud,
          prestar los servicios contratados y, si nos lo autoriza, enviarle
          comunicaciones relacionadas con nuestros servicios.
        </p>

        <h2>Sus derechos</h2>
        <p>
          Puede ejercer sus derechos de acceso, rectificación, supresión, oposición,
          limitación y portabilidad escribiendo a{" "}
          <strong>hola@potenaris.ai</strong>.
        </p>

        <h2>Conservación de datos</h2>
        <p>
          Conservamos sus datos únicamente durante el tiempo necesario para cumplir
          con la finalidad para la que fueron recogidos y las obligaciones legales
          aplicables.
        </p>
      </LegalProse>
    </>
  );
}
