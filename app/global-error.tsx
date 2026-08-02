"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col items-center justify-center px-4 text-center font-sans">
        <p className="text-red-500 font-bold text-sm uppercase tracking-wider mb-2">500</p>
        <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
        <p className="text-gray-600 max-w-md mb-8">
          We encountered an unexpected error. Please try again or contact our support team.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            type="button"
            onClick={reset}
            className="bg-red-500 text-white rounded-full px-8 py-3 font-semibold hover:bg-red-600"
          >
            Try Again
          </button>
          <a href="/" className="border rounded-full px-8 py-3 font-semibold hover:bg-gray-50">
            Go Home
          </a>
        </div>
      </body>
    </html>
  );
}
