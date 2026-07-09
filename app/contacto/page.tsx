import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { ContactForm } from "@/components/sections/contact-form";
import { ContactInfo } from "@/components/sections/contact-info";
import { Container } from "@/components/ui/container";
import { Glow } from "@/components/effects/glow";

export const metadata: Metadata = {
  title: "Contacto — Reserve su auditoría",
  description:
    "Reserve su auditoría de visibilidad y reservas, o hable con nosotros sobre qué nivel del sistema de crecimiento encaja mejor con su clínica.",
};

export default function ContactoPage() {
  return (
    <>
      <PageHero
        eyebrow="Contacto"
        title="Empecemos por entender su situación."
        description="Cuéntenos brevemente cómo funciona hoy la captación de pacientes en su clínica. Nosotros nos encargamos del resto."
      />
      <section className="relative overflow-hidden pb-32 md:pb-48">
        <Glow position="bottom-left" size="lg" tone="faint" />
        <Container className="grid grid-cols-1 gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <ContactForm />
          <ContactInfo />
        </Container>
      </section>
    </>
  );
}
