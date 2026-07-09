import { Container } from "@/components/ui/container";

export function LegalProse({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative pb-28 md:pb-40">
      <Container>
        <div className="prose-legal mx-auto flex max-w-[720px] flex-col gap-8 text-[15px] leading-[1.75] text-fg-muted [&_h2]:font-display [&_h2]:text-[22px] [&_h2]:font-normal [&_h2]:text-fg [&_h2]:mt-4 [&_p]:text-fg-muted [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2 [&_strong]:text-fg [&_strong]:font-medium">
          {children}
        </div>
      </Container>
    </section>
  );
}
