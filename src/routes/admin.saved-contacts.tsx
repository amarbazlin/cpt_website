import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminEmpty, AdminError, AdminPageHeader } from "@/components/admin/AdminUI";
import { fmtDate, listSavedContacts, type AdminSavedContact } from "@/lib/admin-queries";

export const Route = createFileRoute("/admin/saved-contacts")({
  component: SavedContactsPage,
});

function SavedContactsPage() {
  const [rows, setRows] = useState<AdminSavedContact[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("all");
  const [since, setSince] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    setError(null);
    const res = await listSavedContacts({
      search,
      city,
      since: since ? new Date(since).toISOString() : undefined,
    });
    setLoading(false);
    if (res.error) {
      setError("Could not load saved contacts. Check your RLS policies for saved_contacts.");
      return;
    }
    const data = (res.data ?? []) as AdminSavedContact[];
    setRows(data);
    setCities([...new Set(data.map((r) => r.city).filter(Boolean) as string[])].sort());
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city, since]);

  return (
    <div>
      <AdminPageHeader
        title="Saved Contacts"
        description="Details customers explicitly chose to save for next time."
      />

      <div className="mb-4 flex flex-wrap gap-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && load()}
          placeholder="Search name, contact or email…"
          className="h-9 w-full max-w-xs rounded-md border border-input bg-background px-3 text-sm"
        />
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="h-9 cursor-pointer rounded-md border border-input bg-background px-3 text-sm"
          aria-label="Filter by city"
        >
          <option value="all">All cities</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={since}
          onChange={(e) => setSince(e.target.value)}
          className="h-9 rounded-md border border-input bg-background px-3 text-sm"
          aria-label="Saved from date"
        />
        <button
          onClick={load}
          className="h-9 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Search
        </button>
      </div>

      {error ? (
        <AdminError message={error} onRetry={load} />
      ) : loading ? (
        <p className="py-10 text-center text-sm text-muted-foreground">Loading…</p>
      ) : rows.length === 0 ? (
        <AdminEmpty message="No saved contacts found." />
      ) : (
        <div className="overflow-x-auto border border-border bg-card">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="border-b border-border bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-3 py-2">First Name</th>
                <th className="px-3 py-2">Last Name</th>
                <th className="px-3 py-2">Contact</th>
                <th className="px-3 py-2">Email</th>
                <th className="px-3 py-2">City</th>
                <th className="px-3 py-2">Source</th>
                <th className="px-3 py-2">Saved</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((r) => (
                <tr key={r.id}>
                  <td className="px-3 py-2">{r.first_name ?? "—"}</td>
                  <td className="px-3 py-2">{r.last_name ?? "—"}</td>
                  <td className="px-3 py-2">{r.contact_no ?? "—"}</td>
                  <td className="px-3 py-2">{r.email ?? "—"}</td>
                  <td className="px-3 py-2">{r.city ?? "—"}</td>
                  <td className="px-3 py-2">{r.source ?? "—"}</td>
                  <td className="px-3 py-2 text-xs text-muted-foreground">
                    {fmtDate(r.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
