import LoginForm from "@/components/AuthPages/Login-form";
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
                Welcome back
              </div>

              <h1 className="mt-6 max-w-xl text-4xl font-bold leading-tight text-gray-900 xl:text-5xl">
                Sign in to manage your orders and access your account
              </h1>

              <p className="mt-5 max-w-xl text-base leading-8 text-gray-500">
                Access your profile, review your orders, save your designs, and
                complete checkout faster with your account.
              </p>
            </div>

            <div className="mt-10 grid gap-4">
              <div className="rounded-2xl bg-gray-50 p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                  <ShoppingBag className="h-5 w-5 text-red-500" />
                </div>
                <h3 className="font-semibold text-gray-900">Track your orders</h3>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  View all your recent purchases and follow the progress of each order.
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                  <Zap className="h-5 w-5 text-red-500" />
                </div>
                <h3 className="font-semibold text-gray-900">Faster checkout</h3>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Sign in once and enjoy a smoother, quicker purchasing experience.
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                  <ShieldCheck className="h-5 w-5 text-red-500" />
                </div>
                <h3 className="font-semibold text-gray-900">Secure access</h3>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Your account access and sign-in flow are handled securely.
                </p>
              </div>
            </div>
          </div>

          <div className="w-full rounded-[36px] border border-gray-200 bg-white px-6 py-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] sm:px-8 md:px-10">
            <div className="mb-8 flex flex-col items-center justify-center border-b border-gray-100 pb-6 text-center">
              <Logo variant="fullDark" size="lg" className="mb-4" />

              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                Sign in
              </h2>

              <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
                Welcome back. Sign in to access your orders, saved designs, and
                checkout faster.
              </p>
            </div>

            <LoginForm callbackURL={callbackURL ?? undefined} />

            <div className="my-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                or continue with
              </span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <div className="flex flex-col items-center justify-center gap-4">
              <SignInOAuthButton
                provider="google"
                callbackURL={callbackURL ?? undefined}
              />
            </div>

            <div className="mt-8 rounded-2xl bg-gray-50 p-4 text-sm text-gray-600">
              Don&apos;t have an account ? {" "}
              <Link
                href={
                  callbackURL
                    ? `/inscription?callbackURL=${encodeURIComponent(callbackURL)}`
                    : "/inscription"
                }
                className="font-semibold text-red-500 underline-offset-4 transition hover:underline"
              >
                Sign up
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