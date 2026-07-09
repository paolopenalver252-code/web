import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { Container } from "@/components/ui/container";
import { CTA_HREF } from "@/components/layout/nav-links";

const columns = [
  {
    title: "Sistema de crecimiento",
    links: [
      { label: "Auditoría de visibilidad", href: "/servicios#nivel-01" },
      { label: "Presencia digital", href: "/servicios#nivel-02" },
      { label: "Reservas automatizadas", href: "/servicios#nivel-03" },
      { label: "Crecimiento mensual", href: "/servicios#nivel-04" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Nosotros", href: "/nosotros" },
      { label: "Proceso", href: "/#proceso" },
      { label: "Resultados", href: "/#resultados" },
      { label: "Contacto", href: "/contacto" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-60"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(79,209,224,0.5), transparent)",
        }}
      />
      <Container className="flex flex-col gap-16 py-24 md:py-32">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-5">
            <Logo />
            <p className="max-w-[34ch] text-[15px] leading-[1.7] text-fg-muted">
              Sistemas de crecimiento para centros de bienestar, clínicas privadas y
              profesionales de la salud. Más reservas. Menos dependencia del
              boca a boca.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-5">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-faint">
                {col.title}
              </h3>
              <ul className="flex flex-col gap-3.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[14.5px] text-fg-muted transition-colors duration-300 hover:text-fg"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="flex flex-col gap-5">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-faint">
              Empieza
            </h3>
            <p className="text-[14.5px] leading-[1.7] text-fg-muted">
              ¿Listo para dejar de depender del boca a boca?
            </p>
            <Link
              href={CTA_HREF}
              className="text-[14.5px] font-medium text-accent-400 transition-colors hover:text-accent-300"
            >
              Reservar auditoría →
            </Link>
          </div>
        </div>

        <div className="flex flex-col-reverse items-start gap-6 border-t border-border pt-8 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[12px] text-fg-faint">
            © {new Date().getFullYear()} POTENARIS AI Growth Systems. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <Link href="/privacidad" className="text-[13px] text-fg-faint hover:text-fg-muted">
              Privacidad
            </Link>
            <Link href="/terminos" className="text-[13px] text-fg-faint hover:text-fg-muted">
              Términos
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
