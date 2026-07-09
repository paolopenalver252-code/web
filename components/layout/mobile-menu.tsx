"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { NAV_LINKS, CTA_LABEL, CTA_HREF } from "@/components/layout/nav-links";
import { cn } from "@/lib/utils";

export function MobileMenu() {
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="bg-noise fixed inset-0 top-0 z-40 flex flex-col justify-between border-t border-border bg-void/98 pb-10 pt-28 backdrop-blur-2xl md:hidden"
    >
      <nav className="flex flex-col px-8">
        {NAV_LINKS.map((link, i) => {
          const active = pathname === link.href;
          return (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.1 + i * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="border-b border-border py-5"
            >
              <Link
                href={link.href}
                className={cn(
                  "font-display text-[30px] text-fg-muted transition-colors",
                  active && "text-fg"
                )}
              >
                {link.label}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="px-8"
      >
        <Link
          href={CTA_HREF}
          className="flex h-14 w-full items-center justify-center rounded-full bg-fg text-[15px] font-medium text-void"
        >
          {CTA_LABEL}
        </Link>
        <p className="mt-6 text-center font-mono text-[12px] uppercase tracking-[0.2em] text-fg-faint">
          Wellness · Clínicas · Terapeutas
        </p>
      </motion.div>
    </motion.div>
  );
}
