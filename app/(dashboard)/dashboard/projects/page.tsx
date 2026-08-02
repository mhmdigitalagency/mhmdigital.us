import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireCustomer } from "@/lib/auth-redirect";
import { EmptyState } from "@/components/dashboard/empty-state";
import { FolderKanban, Plus } from "lucide-react";

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function statusLabel(status: string) {
  return status.replace(/_/g, " ");
}

function statusColor(status: string) {
  switch (status) {
    case "ACTIVE":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "AWAITING_APPROVAL":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "COMPLETED":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "ON_HOLD":
      return "bg-gray-50 text-gray-600 border-gray-200";
    case "CANCELED":
      return "bg-rose-50 text-rose-700 border-rose-200";
    default:
      return "bg-gray-50 text-gray-600 border-gray-200";
  }
}

export default async function ProjectsPage() {
  const session = await requireCustomer();

  const projects = await prisma.project.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
    include: { service: { select: { name: true } } },
  });

  return (
    <div>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-500 mt-1">Track your active and completed design projects.</p>
        </div>
        <Link
          href="/quote"
          className="inline-flex items-center gap-2 rounded-full bg-red-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-600 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Start a Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <EmptyState
          icon={FolderKanban}
          title="No projects yet"
          description="Start your first project by requesting a quote. Our team will set up a project workspace for you."
          actionHref="/quote"
          actionLabel="Request a Quote"
        />
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl border bg-white p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-bold text-gray-900">{project.title}</h2>
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${statusColor(project.status)}`}
                    >
                      {statusLabel(project.status)}
                    </span>
                  </div>
                  {project.description && (
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{project.description}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-2">
                    {project.service?.name && `${project.service.name} · `}
                    Updated {formatDate(project.updatedAt)}
                    {project.dueDate && ` · Due ${formatDate(project.dueDate)}`}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
