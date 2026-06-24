import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  // Premium gold gradient with a subtle glow that intensifies on hover.
  primary:
    "bg-gradient-to-b from-gold-300 to-gold-500 text-ink-950 shadow-[0_4px_24px_-6px_rgba(224,168,46,0.6)] hover:shadow-[0_8px_30px_-4px_rgba(224,168,46,0.8)] hover:brightness-110 active:scale-[0.98]",
  secondary:
    "bg-white/5 text-white ring-1 ring-inset ring-white/15 backdrop-blur hover:bg-white/10 hover:ring-white/25 active:scale-[0.98]",
  ghost: "text-ink-200 hover:bg-white/5 hover:text-white",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-[3.25rem] px-7 text-base",
};

type StyleProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
};

function buttonClasses({ variant = "primary", size = "md", className }: StyleProps) {
  return cn(base, variants[variant], sizes[size], className);
}

/** Action button. */
export function Button({
  variant,
  size,
  className,
  children,
  ...props
}: StyleProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={buttonClasses({ variant, size, className })} {...props}>
      {children}
    </button>
  );
}

/** Link styled as a button. Set `external` for an <a> that opens in a new tab. */
export function ButtonLink({
  href,
  external = false,
  variant,
  size,
  className,
  children,
}: StyleProps & {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  const classes = buttonClasses({ variant, size, className });

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
