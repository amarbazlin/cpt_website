import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminPageHeader } from "@/components/admin/AdminUI";
import { useAdminAuth } from "@/lib/admin-auth";
import { business } from "@/lib/site";
import { supabaseConfigured } from "@/lib/supabase";

export const Route = createFileRoute("/admin/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const { email, signOut } = useAdminAuth();

  return (
    <div>
      <AdminPageHeader title="Settings" description="Admin panel configuration." />

      <div className="max-w-xl space-y-4">
        <div className="border border-border bg-card p-4">
          <h2 className="font-display text-sm font-extrabold">Signed-in admin</h2>
          <p className="mt-1 text-sm">{email}</p>
          <button
            onClick={() => signOut()}
            className="mt-3 rounded-md bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Logout
          </button>
        </div>

        <div className="border border-border bg-card p-4 text-sm">
          <h2 className="font-display text-sm font-extrabold">Database</h2>
          <p className="mt-1">
            Supabase:{" "}
            <span className={supabaseConfigured ? "text-green-700" : "text-destructive"}>
              {supabaseConfigured ? "Connected" : "Not configured"}
            </span>
          </p>
          <p className="mt-1 text-muted-foreground">
            Connection details come from the VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY
            environment variables.
          </p>
        </div>

        <div className="border border-border bg-card p-4 text-sm">
          <h2 className="font-display text-sm font-extrabold">Business</h2>
          <p className="mt-1">{business.name}</p>
          <p className="text-muted-foreground">{business.addressFull}</p>
          <Link to="/" className="mt-2 inline-block text-primary underline">
            Open website
          </Link>
        </div>
      </div>
    </div>
  );
}
