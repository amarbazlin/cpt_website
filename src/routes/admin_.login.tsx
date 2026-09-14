import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { useState } from "react";
import { AdminAuthProvider, useAdminAuth } from "@/lib/admin-auth";
import { supabaseConfigured } from "@/lib/supabase";

export const Route = createFileRoute("/admin_/login")({
  head: () => ({
    meta: [{ title: "Admin Login | CPT" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <AdminAuthProvider>
      <LoginForm />
    </AdminAuthProvider>
  );
}

function LoginForm() {
  const { session, loading, signIn } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (loading) {
    return <p className="py-20 text-center text-sm text-muted-foreground">Checking access…</p>;
  }
  // Already signed in — go straight to the dashboard.
  if (session) return <Navigate to="/admin" replace />;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(null);
    const err = await signIn(email, password);
    setBusy(false);
    if (err) setError(err);
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-4">
      <h1 className="font-display text-2xl font-extrabold">CPT Admin Login</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Private area — Ceylon Platinum Trading staff only.
      </p>

      {!supabaseConfigured && (
        <p className="mt-4 border border-destructive/40 bg-destructive/5 p-3 text-xs text-destructive">
          Supabase is not configured on this deployment.
        </p>
      )}

      <form onSubmit={submit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="admin-email" className="text-sm font-semibold">
            Email
          </label>
          <input
            id="admin-email"
            type="email"
            required
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 h-9 w-full rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
        <div>
          <label htmlFor="admin-password" className="text-sm font-semibold">
            Password
          </label>
          <input
            id="admin-password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 h-9 w-full rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
        {error && <p className="text-xs text-destructive">{error}</p>}
        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <Link to="/" className="mt-6 text-center text-sm text-muted-foreground underline">
        Back to website
      </Link>
    </div>
  );
}
