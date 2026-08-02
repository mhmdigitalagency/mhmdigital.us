import Link from "next/link";
import { ArrowRight, LucideIcon } from "lucide-react";

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  actionHref: string;
  actionLabel: string;
};

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionHref,
  actionLabel,
}: EmptyStateProps) {
  return (
    <div className="rounded-2xl border bg-white p-10 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
        <Icon className="h-8 w-8 text-red-400" />
      </div>
      <h2 className="mt-5 text-xl font-bold text-gray-900">{title}</h2>
      <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">{description}</p>
      <Link
        href={actionHref}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-red-500 px-6 py-3 text-sm font-semibold text-white hover:bg-red-600 transition-colors"
      >
        {actionLabel}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
