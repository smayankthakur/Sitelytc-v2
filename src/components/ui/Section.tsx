import { cn } from "@/lib/utils";
import { Container } from "./Container";

/** Vertical-rhythm section wrapper. Fades up on scroll via `.reveal`. */
export function Section({
  id,
  className,
  containerClassName,
  bleed = false,
  reveal = true,
  children,
}: {
  id?: string;
  className?: string;
  containerClassName?: string;
  bleed?: boolean;
  reveal?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn("py-20 sm:py-24", reveal && "reveal", className)}
    >
      {bleed ? children : <Container className={containerClassName}>{children}</Container>}
    </section>
  );
}

/** Eyebrow + heading + optional lede block. */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="mt-3 text-pretty text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {lede ? (
        <p className="mt-4 text-lg leading-relaxed text-ink-300">{lede}</p>
      ) : null}
    </div>
  );
}
