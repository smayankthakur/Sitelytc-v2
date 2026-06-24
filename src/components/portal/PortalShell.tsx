import Link from "next/link";
import {
  LayoutDashboard,
  FolderLock,
  ShieldAlert,
  Receipt,
  Users,
  GitBranch,
  Home,
  type LucideIcon,
} from "lucide-react";
import { LogoutButton } from "@/components/portal/LogoutButton";

type NavItem = { label: string; href: string; icon: LucideIcon };

const clientNav: NavItem[] = [
  { label: "Overview", href: "/portal/client", icon: LayoutDashboard },
  { label: "Deliverables", href: "/portal/client#deliverables", icon: FolderLock },
  { label: "Findings", href: "/portal/client#findings", icon: ShieldAlert },
  { label: "Invoices", href: "/portal/client#invoices", icon: Receipt },
];

const agencyNav: NavItem[] = [
  { label: "Overview", href: "/portal/agency", icon: LayoutDashboard },
  { label: "Clients", href: "/portal/agency#clients", icon: Users },
  { label: "Pipeline", href: "/portal/agency#pipeline", icon: GitBranch },
];

export function PortalShell({
  role,
  title,
  user,
  children,
}: {
  role: "client" | "agency";
  title: string;
  user: { name: string; org: string };
  children: React.ReactNode;
}) {
  const nav = role === "client" ? clientNav : agencyNav;
  return (
    <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[15rem_1fr] lg:px-8">
      {/* Sidebar */}
      <aside className="reveal hidden lg:block">
        <div className="sticky top-24 space-y-1">
          {nav.map((n, i) => (
            <Link
              key={n.label}
              href={n.href}
              className={`reveal reveal-d${i + 1} flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink-300 transition-colors hover:bg-white/5 hover:text-white`}
            >
              <n.icon className="h-4 w-4 text-gold-300" />
              {n.label}
            </Link>
          ))}
          <div className="!mt-6 space-y-1 border-t border-white/10 pt-4">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              <Home className="h-4 w-4" /> Back to site
            </Link>
            <LogoutButton />
          </div>
        </div>
      </aside>

      {/* Main */}
      <main>
        <div className="reveal flex flex-col gap-1 border-b border-white/10 pb-6">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {title}
            </h1>
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-gold-500/10 px-3 py-1 text-xs font-semibold text-gold-300">
                Demo
              </span>
              <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-600 text-sm font-bold text-white">
                {user.name.slice(0, 1)}
              </span>
            </div>
          </div>
          <p className="text-sm text-ink-400">
            {user.name} · {user.org}
          </p>
        </div>
        <div className="mt-8 space-y-12">{children}</div>
      </main>
    </div>
  );
}

const sevStyles: Record<string, string> = {
  critical: "bg-red-500/15 text-red-300 ring-red-500/30",
  high: "bg-orange-500/15 text-orange-300 ring-orange-500/30",
  medium: "bg-amber-500/15 text-amber-300 ring-amber-500/30",
  low: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
};

export function SeverityBadge({ severity }: { severity: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ring-1 ring-inset ${sevStyles[severity] ?? sevStyles.low}`}
    >
      {severity}
    </span>
  );
}
