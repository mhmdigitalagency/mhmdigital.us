import Link from "next/link";
import { Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/auth-redirect";
import { StatusBadge } from "@/components/admin/StatusBadge";

export default async function AdminProjectsPage() {
  await requireStaff();

  const projects = await prisma.project.findMany({
    orderBy: { updatedAt: "desc" },
    include: {
      user: { select: { name: true, email: true } },
      assignee: { select: { name: true } },
    },
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-500 mt-1">Monitor active and completed client projects.</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Project
        </Link>
      </div>

      <div className="rounded-2xl border bg-white p-6">
        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No projects yet. Create one to start tracking client work.</p>
            <Link
              href="/admin/projects/new"
              className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-5 py-2.5 text-sm font-semibold text-brand hover:bg-brand/10 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Create your first project
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-gray-500">
                  <th className="pb-3 font-medium">Project</th>
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Assignee</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Due date</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id} className="border-b last:border-0">
                    <td className="py-3 pr-4">
                      <p className="font-medium text-gray-900">{project.title}</p>
                    </td>
                    <td className="py-3 pr-4">
                      <p>{project.user.name}</p>
                      <p className="text-xs text-gray-500">{project.user.email}</p>
                    </td>
                    <td className="py-3 pr-4 text-gray-600">{project.assignee?.name ?? "—"}</td>
                    <td className="py-3 pr-4">
                      <StatusBadge status={project.status} />
                    </td>
                    <td className="py-3 text-gray-500">
                      {project.dueDate ? new Date(project.dueDate).toLocaleDateString() : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
