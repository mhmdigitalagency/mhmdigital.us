import { ForgotPasswordForm } from "@/components/forgot-password-form";
import ReturnButton from "@/components/return-button";
import { MailCheck, ShieldCheck, KeyRound } from "lucide-react";

const page = () => {
  return (
    <div className="min-h-screen bg-linear-to-b` from-white via-red-50/20 to-white">
      <div className="px-4 py-10 md:py-16 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]">
        <ReturnButton href="/connexion" label="Back to login page" />

        <div className="mt-8 grid items-stretch gap-8 lg:grid-cols-[1fr_580px]">
          <div className="hidden rounded-[36px] border border-gray-200 bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)] lg:flex lg:flex-col lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-500">
                Password recovery
              </div>

              <h1 className="mt-6 max-w-xl text-4xl font-bold leading-tight text-gray-900 xl:text-5xl">
                Reset your password and get back into your account
              </h1>

              <p className="mt-5 max-w-xl text-base leading-8 text-gray-500">
                Enter your email address and we will send you a secure password
                reset link so you can create a new password.
              </p>
            </div>

            <div className="mt-10 grid gap-4">
              <div className="rounded-2xl bg-gray-50 p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                  <MailCheck className="h-5 w-5 text-red-500" />
                </div>
                <h3 className="font-semibold text-gray-900">Email reset link</h3>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  We will send a secure link to the email address linked to your account.
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                  <ShieldCheck className="h-5 w-5 text-red-500" />
                </div>
                <h3 className="font-semibold text-gray-900">Secure recovery</h3>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Your reset request is handled securely for your account protection.
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                  <KeyRound className="h-5 w-5 text-red-500" />
                </div>
                <h3 className="font-semibold text-gray-900">Create a new password</h3>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Open the link from your email and choose a new secure password.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full rounded-[36px] border border-gray-200 bg-white px-6 py-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] sm:px-8 md:px-10">
            <div className="mb-8 border-b border-gray-100 pb-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
                <MailCheck className="h-8 w-8 text-red-500" />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                Forgot password
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Please enter your email address to receive a password reset link.
              </p>
            </div>

            <ForgotPasswordForm />

            <div className="mt-8 rounded-2xl bg-gray-50 p-4 text-sm text-gray-600">
              If you remember your password, you can go back and sign in normally.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;