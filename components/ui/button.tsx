import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonBaseProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  icon?: boolean;
};

type ButtonAsLink = ButtonBaseProps & {
  href: string;
  onClick?: never;
  type?: never;
};

type ButtonAsButton = ButtonBaseProps & {
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit";
};

type ButtonProps = ButtonAsLink | ButtonAsButton;

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-[-0.01em] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-400 disabled:opacity-40 disabled:pointer-events-none";

const sizes = {
  md: "h-11 px-6 text-[14.5px]",
  lg: "h-14 px-8 text-[15.5px]",
};

const variants = {
  primary:
    "bg-fg text-void shadow-[0_1px_0_rgba(255,255,255,0.4)_inset,0_18px_40px_-14px_rgba(79,209,224,0.35)] hover:shadow-[0_1px_0_rgba(255,255,255,0.5)_inset,0_22px_50px_-12px_rgba(79,209,224,0.55)] hover:-translate-y-0.5 active:translate-y-0",
  secondary:
    "glass-panel text-fg hover:border-border-accent hover:-translate-y-0.5 active:translate-y-0",
  ghost:
    "text-fg-muted hover:text-fg px-0 h-auto",
};

function Inner({
  children,
  icon,
  variant,
}: {
  children: React.ReactNode;
  icon?: boolean;
  variant: "primary" | "secondary" | "ghost";
}) {
  return (
    <>
      <span className={cn(variant === "ghost" && "relative")}>
        {children}
        {variant === "ghost" && (
          <span className="pointer-events-none absolute -bottom-0.5 left-0 h-px w-full origin-center scale-x-0 bg-fg transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
        )}
      </span>
      {icon && (
        <ArrowUpRight
          className={cn(
            "transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
            variant === "ghost" ? "size-[15px]" : "size-4"
          )}
        />
      )}
    </>
  );
}

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  icon = false,
  href,
  onClick,
  type = "button",
}: ButtonProps) {
  const classes = cn(
    base,
    variant !== "ghost" && sizes[size],
    variants[variant],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        <Inner icon={icon} variant={variant}>
          {children}
        </Inner>
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      <Inner icon={icon} variant={variant}>
        {children}
      </Inner>
    </button>
  );
}
