import Image from "next/image";
import { Container } from "@/components/ui/Container";

const clients = [
  { name: "BabyDocShop", src: "/Client/BabyDoc_Shop_Logo.webp" },
  { name: "Dealzook", src: "/Client/DealZook_logo.webp" },
  { name: "PreVot Associates", src: "/Client/Prevot_Associates_logo.webp" },
  { name: "HairDoc", src: "/Client/HairDoc_logo.webp" },
  { name: "M Digital Bay Area", src: "/Client/mdigitalbayarea_logo.webp" },
  { name: "Global Corporate Tour", src: "/Client/Global_corporate_tour_Logo.webp" },
  { name: "Ozuna Tortilla Factory", src: "/Client/Ozuna_logo.webp" },
];

export function LogoMarquee() {
  return (
    <section className="border-y border-white/10 bg-surface py-12">
      <Container>
        <div className="flex justify-center">
          <p className="eyebrow">trusted by ambitious brands</p>
        </div>
      </Container>

      <div className="marquee-pause relative mt-8 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-canvas to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-canvas to-transparent" />

        <div className="flex w-max animate-marquee items-center">
          {[...clients, ...clients].map((c, i) => (
            <span
              key={`${c.name}-${i}`}
              className="mx-10 flex h-10 w-32 shrink-0 items-center justify-center"
            >
              <Image
                src={c.src}
                alt={c.name}
                width={128}
                height={40}
                className="h-9 w-auto max-w-[8rem] object-contain opacity-60 brightness-0 invert transition hover:opacity-100"
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
