import ReturnButton from "@/components/return-button";
import { SendVerificationEmailForm } from "@/components/send-verification-email-form";
import { redirect } from "next/navigation";
import { AlertTriangle, MailCheck, ShieldAlert } from "lucide-react";

interface PageProps {
  searchParams: Promise<{ error?: string; callbackURL?: string }>;
}

const page = async ({ searchParams }: PageProps) => {
  const { error, callbackURL } = await searchParams;
  const cb = callbackURL && callbackURL.startsWith("/") ? callbackURL : "/profile";

  if (!error) redirect(cb);

  const message =
    error === "invalid_token" || error === "token_expired"
      ? "Your verification link is invalid or has expired. Please request a new verification email below."
      : error === "email_not_verified"
      ? "Please verify your email or request a new verification link below."
      : "Oops! Something went wrong. Please try again.";

  return (
    <div className="min-h-screen bg-linear-to-b from-white via-red-50/20 to-white">
      <div className="px-4 py-10 md:py-16 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]">
        <ReturnButton
          href={`/connexion?callbackURL=${encodeURIComponent(cb)}`}
          label="Back to login page"
        />

        <div className="mt-8 grid items-stretch gap-8 lg:grid-cols-[1fr_480px]">
          <div className="hidden rounded-[36px] border border-gray-200 bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)] lg:flex lg:flex-col lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-500">
                Email verification required
              </div>

              <h1 className="mt-6 max-w-xl text-4xl font-bold leading-tight text-gray-900 xl:text-5xl">
                Verify your email to continue
              </h1>

              <p className="mt-5 max-w-xl text-base leading-8 text-gray-500">
                To keep your account secure, please verify your email address before
                continuing to your profile or dashboard.
              </p>
            </div>

            <div className="mt-10 grid gap-4">
              <div className="rounded-2xl bg-gray-50 p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                  <MailCheck className="h-5 w-5 text-red-500" />
                </div>
                <h3 className="font-semibold text-gray-900">Request a new email</h3>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Enter your email address again and receive a fresh verification link.
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                  <ShieldAlert className="h-5 w-5 text-red-500" />
                </div>
                <h3 className="font-semibold text-gray-900">Expired or invalid link</h3>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Verification links may expire, so requesting a new one is often the fastest fix.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full rounded-[36px] border border-gray-200 bg-white px-6 py-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] sm:px-8 md:px-10">
            <div className="mb-8 border-b border-gray-100 pb-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                Verify Email
              </h2>

              <p className="mt-3 text-sm leading-6 text-red-500">{message}</p>
            </div>

            <SendVerificationEmailForm callbackURL={cb} />

            <div className="mt-8 rounded-2xl bg-gray-50 p-4 text-sm text-gray-600">
              If you already received a valid verification email, open it and click the link to continue.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;