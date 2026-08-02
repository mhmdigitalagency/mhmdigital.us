const STATUS_COLORS: Record<string, string> = {
  NEW: "bg-blue-100 text-blue-700",
  CONTACTED: "bg-cyan-100 text-cyan-700",
  QUALIFIED: "bg-indigo-100 text-indigo-700",
  PROPOSAL: "bg-violet-100 text-violet-700",
  NEGOTIATION: "bg-purple-100 text-purple-700",
  WON: "bg-emerald-100 text-emerald-700",
  LOST: "bg-gray-100 text-gray-600",
  DRAFT: "bg-gray-100 text-gray-600",
  ACTIVE: "bg-emerald-100 text-emerald-700",
  ON_HOLD: "bg-amber-100 text-amber-700",
  AWAITING_APPROVAL: "bg-orange-100 text-orange-700",
  REVISION_REQUESTED: "bg-yellow-100 text-yellow-700",
  COMPLETED: "bg-emerald-100 text-emerald-700",
  CANCELED: "bg-gray-100 text-gray-600",
  CANCELLED: "bg-gray-100 text-gray-600",
  SENT: "bg-blue-100 text-blue-700",
  VIEWED: "bg-cyan-100 text-cyan-700",
  ACCEPTED: "bg-emerald-100 text-emerald-700",
  DECLINED: "bg-red-100 text-red-700",
  EXPIRED: "bg-gray-100 text-gray-600",
  CONVERTED: "bg-violet-100 text-violet-700",
  PARTIALLY_PAID: "bg-amber-100 text-amber-700",
  PAID: "bg-emerald-100 text-emerald-700",
  OVERDUE: "bg-red-100 text-red-700",
  REFUNDED: "bg-gray-100 text-gray-600",
  OPEN: "bg-blue-100 text-blue-700",
  IN_PROGRESS: "bg-violet-100 text-violet-700",
  WAITING_CUSTOMER: "bg-amber-100 text-amber-700",
  RESOLVED: "bg-emerald-100 text-emerald-700",
  CLOSED: "bg-gray-100 text-gray-600",
  IN_PRODUCTION: "bg-orange-100 text-orange-700",
  QUALITY_CHECK: "bg-yellow-100 text-yellow-700",
  SHIPPED: "bg-blue-100 text-blue-700",
  DELIVERED: "bg-emerald-100 text-emerald-700",
  USER: "bg-slate-100 text-slate-700",
  COMPANY_ADMIN: "bg-violet-100 text-violet-700",
  COMPANY_MEMBER: "bg-indigo-100 text-indigo-700",
};

export function StatusBadge({ status }: { status: string }) {
  const label = status.replace(/_/g, " ");
  const color = STATUS_COLORS[status] ?? "bg-gray-100 text-gray-600";

  return (
    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${color}`}>
      {label}
    </span>
  );
}
