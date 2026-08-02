import RegisterForm from "@/components/AuthPages/Register-form";
import ReturnButton from "@/components/return-button";
import SignInOAuthButton from "@/components/sign-in-oauth-button";
import { Logo } from "@/components/brand/Logo";
import Link from "next/link";
import { ShieldCheck, ShoppingBag, Zap } from "lucide-react";

type Props = {
  searchParams: Promise<{
    callbackURL?: string;
  }>;
};

function safeCallback(cb?: string) {
  const value = cb?.trim();
  if (!value) return null;
  if (!value.startsWith("/")) return null;
  if (value.startsWith("//")) return null;
  return value;
}

const page = async ({ searchParams }: Props) => {
  const sp = await searchParams;
  const callbackURL = safeCallback(sp?.callbackURL);

  return (
    <div className="min-h-screen bg-linear-to-b from-white via-red-50/20 to-white">
      <div className="px-4 py-10 md:py-16 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]">
        <ReturnButton href="/" label="Back to home" />

        <div className="mt-8 grid items-stretch gap-8 lg:grid-cols-[1fr_580px]">
          <div className="hidden rounded-[36px] border border-gray-200 bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)] lg:flex lg:flex-col lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-500">
                Create your account
              </div>

              <h1 className="mt-6 max-w-xl text-4xl font-bold leading-tight text-gray-900 xl:text-5xl">
                Start ordering faster and manage everything in one place
              </h1>

              <p className="mt-5 max-w-xl text-base leading-8 text-gray-500">
                Create your account to order printing services, manage projects,
                save time on future orders, and access your account dashboard.
              </p>
            </div>

            <div className="mt-10 grid gap-4">
              <div className="rounded-2xl bg-gray-50 p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                  <ShoppingBag className="h-5 w-5 text-red-500" />
                </div>
                <h3 className="font-semibold text-gray-900">Manage your orders</h3>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Keep track of your purchases and access your order history anytime.
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                  <Zap className="h-5 w-5 text-red-500" />
                </div>
                <h3 className="font-semibold text-gray-900">Save time</h3>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Use your account for a smoother and faster checkout experience.
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                  <ShieldCheck className="h-5 w-5 text-red-500" />
                </div>
                <h3 className="font-semibold text-gray-900">Secure access</h3>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Your registration and sign-in flow are handled securely.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full rounded-[36px] border border-gray-200 bg-white px-6 py-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] sm:px-8 md:px-10">
            <div className="mb-8 flex flex-col items-center justify-center border-b border-gray-100 pb-6 text-center">
              <Logo variant="full" size="lg" className="mb-4" />

              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                Create an account
              </h2>

              <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
                Order printing services, manage projects, and save time on future
                orders.
              </p>
            </div>

            <RegisterForm callbackURL={callbackURL ?? undefined} />

            <div className="my-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                or continue with
              </span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <div className="my-6 flex w-full flex-col items-center justify-center gap-4">
              <SignInOAuthButton
                signUp
                provider="google"
                callbackURL={callbackURL ?? undefined}
              />
            </div>

            <div className="mt-8 rounded-2xl bg-gray-50 p-4 text-sm text-gray-600">
              Already have an account ? {" "}
              <Link
                href={
                  callbackURL
                    ? `/connexion?callbackURL=${encodeURIComponent(callbackURL)}`
                    : "/connexion"
                }
                className="font-semibold text-red-500 underline-offset-4 transition hover:underline"
              >
                Login
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-2 text-xs text-gray-500">
              <span>By continuing, you agree to the</span>
              <Link
                href="/terms"
                className="font-medium text-gray-700 transition hover:text-red-500 hover:underline"
              >
                Terms
              </Link>
              <span>and</span>
              <Link
                href="/conditions"
                className="font-medium text-gray-700 transition hover:text-red-500 hover:underline"
              >
                Conditions
              </Link>
              <span>and</span>
              <Link
                href="/privacy-policy"
                className="font-medium text-gray-700 transition hover:text-red-500 hover:underline"
              >
                Privacy policy
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-gray-500">
              <Link
                href="/help"
                className="transition hover:text-red-500 hover:underline"
              >
                Need help?
              </Link>
              <Link
                href="/privacy"
                className="transition hover:text-red-500 hover:underline"
              >
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;