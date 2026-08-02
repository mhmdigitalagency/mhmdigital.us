import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireCustomer } from "@/lib/auth-redirect";
import { EmptyState } from "@/components/dashboard/empty-state";
import { FileUploadForm } from "@/components/dashboard/file-upload-form";
import { Upload, FileIcon, ExternalLink } from "lucide-react";

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default async function FilesPage() {
  const session = await requireCustomer();

  const files = await prisma.customerFile.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: {
      project: { select: { title: true } },
      printOrder: { select: { orderNumber: true, productName: true } },
    },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Files</h1>
        <p className="text-gray-500 mt-1">
          Upload and manage artwork, brand assets, and project deliverables.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-6">
        <div>
          {files.length === 0 ? (
            <EmptyState
              icon={Upload}
              title="No files uploaded"
              description="Upload your artwork, logos, and brand assets. Accepted formats: PDF, PNG, JPG, AI, EPS, SVG, ZIP (max 10 MB)."
              actionHref="/print-services"
              actionLabel="Start a Print Order"
            />
          ) : (
            <div className="space-y-3">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="rounded-2xl border bg-white p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50">
                      <FileIcon className="h-5 w-5 text-red-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="font-semibold text-gray-900 truncate">{file.originalName}</h2>
                        <span className="inline-flex rounded-full border bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-600 capitalize">
                          {file.category.toLowerCase().replace(/_/g, " ")}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        {formatBytes(file.size)} · Uploaded {formatDate(file.createdAt)}
                        {file.project && ` · Project: ${file.project.title}`}
                        {file.printOrder && ` · ${file.printOrder.orderNumber}`}
                      </p>
                      <a
                        href={file.url}
                        className="mt-2 inline-flex items-center gap-1 text-sm text-red-500 font-medium hover:underline"
                      >
                        View file <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {files.length > 0 && (
            <p className="mt-6 text-sm text-gray-500">
              Need to attach files to a print order?{" "}
              <Link href="/dashboard/print-orders" className="text-red-500 font-medium hover:underline">
                View your print orders
              </Link>
            </p>
          )}
        </div>

        <div className="rounded-2xl border bg-white p-6 lg:sticky lg:top-8 lg:self-start">
          <h2 className="font-bold text-lg mb-4">Upload File</h2>
          <FileUploadForm />
        </div>
      </div>
    </div>
  );
}
