import { createFileRoute, Outlet } from "@tanstack/react-router";
import { BrandShell } from "@/components/brand-shell";

export const Route = createFileRoute("/")({
  component: () => (
    <BrandShell brand="calabi">
      <Outlet />
    </BrandShell>
  ),
});
