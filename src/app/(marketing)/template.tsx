import { RouteTransition } from "@/components/fx/RouteTransition";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RouteTransition />
      <div className="route-enter">{children}</div>
    </>
  );
}
