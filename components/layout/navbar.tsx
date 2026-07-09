"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Logo } from "@/components/layout/logo";
import { NAV_LINKS, CTA_LABEL, CTA_HREF } from "@/components/layout/nav-links";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 32);
  });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        animate={{
          marginTop: scrolled ? 12 : 0,
          paddingLeft: scrolled ? 8 : 0,
          paddingRight: scrolled ? 8 : 0,
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-[1280px] px-6 md:px-10 lg:px-16"
      >
        <motion.nav
          animate={{
            height: scrolled ? 62 : 84,
            borderRadius: scrolled ? 20 : 0,
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "relative flex items-center justify-between border border-transparent px-5 transition-colors duration-500 md:px-6",
            scrolled && "glass-nav border-border shadow-[0_10px_40px_-14px_rgba(2,6,16,0.6)]"
          )}
        >
          <Logo />

          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 md:flex">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "group relative py-2 text-[14px] font-medium tracking-[-0.005em] text-fg-muted transition-colors duration-300 hover:text-fg",
                      active && "text-fg"
                    )}
                  >
                    {link.label}
                    <span
                      className={cn(
                        "pointer-events-none absolute -bottom-0.5 left-1/2 h-px w-full -translate-x-1/2 scale-x-0 bg-accent-400 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100",
                        active && "scale-x-100"
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden md:block">
            <Button href={CTA_HREF} size="md">
              {CTA_LABEL}
            </Button>
          </div>

          <button
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative flex size-9 flex-col items-center justify-center gap-[5px] md:hidden"
          >
            <motion.span
              animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="h-px w-5 bg-fg"
            />
            <motion.span
              animate={{ opacity: open ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              className="h-px w-5 bg-fg"
            />
            <motion.span
              animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="h-px w-5 bg-fg"
            />
          </button>
        </motion.nav>
      </motion.div>

      <AnimatePresence>{open && <MobileMenu />}</AnimatePresence>
    </header>
  );
}
