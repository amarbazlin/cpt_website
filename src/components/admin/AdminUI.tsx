import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Small stat card used across the admin dashboard/analytics pages. */
export function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: ReactNode;
  hint?: string;
}) {
  return (
    <div className="border border-border bg-card p-4 shadow-card">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 font-display text-2xl font-extrabold text-foreground">{value}</p>
      {hint && <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

const STATUS_STYLES: Record<string, string> = {
  New: "bg-blue-100 text-blue-800",
  Contacted: "bg-amber-100 text-amber-800",
  Confirmed: "bg-indigo-100 text-indigo-800",
  Preparing: "bg-purple-100 text-purple-800",
  Dispatched: "bg-cyan-100 text-cyan-800",
  Delivered: "bg-green-100 text-green-800",
  Converted: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-700",
  "Not Interested": "bg-stone-200 text-stone-700",
  Pending: "bg-amber-100 text-amber-800",
  Paid: "bg-green-100 text-green-800",
  Failed: "bg-red-100 text-red-700",
  Refunded: "bg-stone-200 text-stone-700",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold",
        STATUS_STYLES[status] ?? "bg-muted text-foreground",
      )}
    >
      {status}
    </span>
  );
}

export function AdminPageHeader({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-xl font-extrabold sm:text-2xl">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {children}
    </div>
  );
}

export function AdminEmpty({ message }: { message: string }) {
  return (
    <div className="border border-dashed border-border bg-card p-10 text-center">
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}

export function AdminError({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="border border-destructive/40 bg-destructive/5 p-6 text-center">
      <p className="text-sm text-destructive">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-3 rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium hover:bg-accent"
        >
          Try again
        </button>
      )}
    </div>
  );
}

/** Sidebar navigation shared by all admin pages. */
export const ADMIN_NAV = [
  { to: "/admin", label: "Dashboard", end: true },
  { to: "/admin/orders", label: "Orders" },
  { to: "/admin/leads", label: "WhatsApp Leads" },
  { to: "/admin/customers", label: "Customers" },
  { to: "/admin/saved-contacts", label: "Saved Contacts" },
  { to: "/admin/products", label: "Products" },
  { to: "/admin/analytics", label: "Analytics" },
  { to: "/admin/settings", label: "Settings" },
] as const;

export function AdminNavLinks({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-1">
      {ADMIN_NAV.map((n) => (
        <Link
          key={n.to}
          to={n.to}
          activeProps={{ className: "bg-primary text-primary-foreground" }}
          activeOptions={{ exact: "end" in n ? n.end : false }}
          onClick={onNavigate}
          className="rounded-md px-3 py-2 font-display text-sm font-semibold text-foreground transition-colors hover:bg-accent"
        >
          {n.label}
        </Link>
      ))}
    </nav>
  );
}
