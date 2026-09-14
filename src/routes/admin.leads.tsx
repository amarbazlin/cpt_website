import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminEmpty, AdminError, AdminPageHeader, StatusBadge } from "@/components/admin/AdminUI";
import {
  fmtDate,
  listLeads,
  updateLeadStatus,
  LEAD_STATUSES,
  type AdminLead,
} from "@/lib/admin-queries";

export const Route = createFileRoute("/admin/leads")({
  component: LeadsPage,
});

function LeadsPage() {
  const [leads, setLeads] = useState<AdminLead[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [openMessage, setOpenMessage] = useState<AdminLead | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    const res = await listLeads({ search, status });
    setLoading(false);
    if (res.error) {
      setError("Could not load leads. Check your RLS policies for whatsapp_leads.");
      return;
    }
    setLeads((res.data ?? []) as AdminLead[]);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  async function setStatusFor(lead: AdminLead, lead_status: string) {
    const res = await updateLeadStatus(lead.id, lead_status as (typeof LEAD_STATUSES)[number]);
    if (!res.error)
      setLeads((prev) => prev.map((l) => (l.id === lead.id ? { ...l, lead_status } : l)));
  }

  return (
    <div>
      <AdminPageHeader
        title="WhatsApp Leads"
        description="Every 'Place Order via WhatsApp' click, with follow-up status."
      />

      <div className="mb-4 flex flex-wrap gap-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && load()}
          placeholder="Search contact or product…"
          className="h-9 w-full max-w-xs rounded-md border border-input bg-background px-3 text-sm"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="h-9 cursor-pointer rounded-md border border-input bg-background px-3 text-sm"
          aria-label="Filter by lead status"
        >
          <option value="all">All statuses</option>
          {LEAD_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
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
        <p className="py-10 text-center text-sm text-muted-foreground">Loading leads…</p>
      ) : leads.length === 0 ? (
        <AdminEmpty message="No WhatsApp leads found." />
      ) : (
        <LeadsTable leads={leads} onStatus={setStatusFor} onOpenMessage={setOpenMessage} />
      )}

      {openMessage && <MessageDialog lead={openMessage} onClose={() => setOpenMessage(null)} />}
    </div>
  );

  function LeadsTable({
    leads,
    onStatus,
    onOpenMessage,
  }: {
    leads: AdminLead[];
    onStatus: (lead: AdminLead, s: string) => void;
    onOpenMessage: (lead: AdminLead) => void;
  }) {
    return (
      <div className="overflow-x-auto border border-border bg-card">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead className="border-b border-border bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-3 py-2">Customer</th>
              <th className="px-3 py-2">Contact</th>
              <th className="px-3 py-2">Product / Cart</th>
              <th className="px-3 py-2">Qty</th>
              <th className="px-3 py-2">Message</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {leads.map((l) => (
              <tr key={l.id} className={l.lead_status === "New" ? "bg-blue-50/50" : ""}>
                <td className="px-3 py-2">
                  {l.customers ? `${l.customers.first_name} ${l.customers.last_name}` : "—"}
                </td>
                <td className="px-3 py-2">{l.contact_no ?? "—"}</td>
                <td className="max-w-[220px] px-3 py-2">{l.product_name ?? "—"}</td>
                <td className="px-3 py-2">{l.quantity ?? "—"}</td>
                <td className="px-3 py-2">
                  <button
                    onClick={() => onOpenMessage(l)}
                    className="text-xs font-semibold text-primary underline"
                  >
                    View
                  </button>
                </td>
                <td className="px-3 py-2">
                  <select
                    value={l.lead_status}
                    onChange={(e) => onStatus(l, e.target.value)}
                    className="rounded border border-input bg-background px-1.5 py-1 text-xs"
                    aria-label={`Lead status for ${l.contact_no ?? "lead"}`}
                  >
                    {LEAD_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <span className="mt-1 block">
                    <StatusBadge status={l.lead_status} />
                  </span>
                </td>
                <td className="px-3 py-2 text-xs text-muted-foreground">{fmtDate(l.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  function MessageDialog({ lead, onClose }: { lead: AdminLead; onClose: () => void }) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        onClick={onClose}
      >
        <div
          className="max-h-[80vh] w-full max-w-lg overflow-y-auto border border-border bg-card p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between">
            <h2 className="font-display text-lg font-extrabold">Lead message</h2>
            <button onClick={onClose} className="text-sm text-muted-foreground underline">
              Close
            </button>
          </div>
          <pre className="mt-3 whitespace-pre-wrap break-words border border-border bg-surface p-3 text-xs">
            {lead.message ?? "—"}
          </pre>
        </div>
      </div>
    );
  }
}
