import Link from "next/link";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-canvas/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.webp" alt="Sitelytc" width={120} height={32} className="h-7 w-auto" />
            <span className="ml-1 hidden rounded-full border border-white/15 px-2 py-0.5 text-[11px] font-medium text-ink-300 sm:inline">
              Portals
            </span>
          </Link>
          <span className="inline-flex items-center gap-1.5 text-xs text-ink-400">
            <ShieldCheck className="h-3.5 w-3.5 text-gold-300" /> Secure area
          </span>
        </div>
      </header>
      {children}
    </div>
  );
}
