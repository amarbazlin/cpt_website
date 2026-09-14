import { createFileRoute, Link, Navigate, Outlet, useRouter } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { AdminNavLinks } from "@/components/admin/AdminUI";
import { AdminAuthProvider, useAdminAuth } from "@/lib/admin-auth";
import { business } from "@/lib/site";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "CPT Admin" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: AdminRoot,
});

function AdminRoot() {
  return (
    <AdminAuthProvider>
      <AdminLayout />
    </AdminAuthProvider>
  );
}

function AdminLayout() {
  const { session, loading, signOut, email } = useAdminAuth();
  const router = useRouter();
  const [navOpen, setNavOpen] = useState(false);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">Checking access…</p>
      </div>
    );
  }
  // Unauthenticated visitors are blocked from every /admin/* page.
  if (!session) return <Navigate to="/admin/login" replace />;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
        <div className="flex items-center gap-3">
          <button
            className="rounded-md border border-input p-2 lg:hidden"
            aria-label="Toggle admin navigation"
            onClick={() => setNavOpen((v) => !v)}
          >
            {navOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
          <div>
            <p className="font-display text-lg font-extrabold">{business.name} — Admin</p>
            <p className="text-xs text-muted-foreground">Signed in as {email}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="rounded-md border border-input px-3 py-1.5 text-sm font-medium hover:bg-accent"
          >
            View website
          </Link>
          <button
            onClick={async () => {
              await signOut();
              router.navigate({ to: "/admin/login" });
            }}
            className="rounded-md bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <aside className={navOpen ? "block" : "hidden lg:block"}>
          <AdminNavLinks onNavigate={() => setNavOpen(false)} />
        </aside>
        <div className="min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
