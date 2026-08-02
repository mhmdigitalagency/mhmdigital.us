import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <p className="text-red-500 font-bold text-sm uppercase tracking-wider mb-2">404</p>
      <h1 className="text-4xl font-bold mb-4">Page not found</h1>
      <p className="text-gray-600 max-w-md mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link href="/" className="bg-red-500 text-white rounded-full px-8 py-3 font-semibold hover:bg-red-600">
          Go Home
        </Link>
        <Link href="/contact" className="border rounded-full px-8 py-3 font-semibold hover:bg-gray-50">
          Contact Us
        </Link>
      </div>
    </div>
  );
}
