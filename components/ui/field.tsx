import { cn } from "@/lib/utils";

const fieldClasses =
  "w-full rounded-xl border border-border bg-surface-900/60 px-4 py-3.5 text-[15px] text-fg placeholder:text-fg-faint transition-colors duration-300 outline-none focus:border-border-accent focus:bg-surface-900";

export function Label({
  htmlFor,
  children,
  optional = false,
}: {
  htmlFor: string;
  children: React.ReactNode;
  optional?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-fg-faint"
    >
      {children}
      {optional && <span className="normal-case tracking-normal text-fg-faint/70">opcional</span>}
    </label>
  );
}

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(fieldClasses, className)} {...props} />;
}

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(fieldClasses, "resize-none", className)} {...props} />;
}

export function Select({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select
        className={cn(fieldClasses, "appearance-none pr-10", className)}
        {...props}
      >
        {children}
      </select>
      <svg
        aria-hidden
        className="pointer-events-none absolute right-4 top-1/2 size-3.5 -translate-y-1/2 text-fg-faint"
        viewBox="0 0 12 8"
        fill="none"
      >
        <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    </div>
  );
}
