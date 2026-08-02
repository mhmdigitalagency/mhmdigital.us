import Link from "next/link";
import RegisterForm from "@/components/AuthPages/Register-form";
import SignInOAuthButton from "@/components/sign-in-oauth-button";
import { Logo } from "@/components/brand/Logo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Company Registration | MHM Digital",
  description: "Register your company account to manage team members, projects, and print orders.",
};

export default async function CompanyRegistrationPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackURL?: string }>;
}) {
  const { callbackURL } = await searchParams;

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-center bg-red-500 text-white p-12">
        <h1 className="text-4xl font-bold mb-4">Company Account</h1>
        <p className="text-red-100 text-lg leading-relaxed mb-8">
          Manage multiple team members, shared projects, company invoices, approval workflows,
          and bulk print orders from one dashboard.
        </p>
        <ul className="space-y-3 text-red-50">
          <li>✓ Multiple users and role-based access</li>
          <li>✓ Shared files and project collaboration</li>
          <li>✓ Company billing and purchase orders</li>
          <li>✓ Bulk print ordering and quotes</li>
        </ul>
      </div>

      <div className="flex flex-col justify-center px-6 py-12 lg:px-16">
        <div className="max-w-md mx-auto w-full">
          <div className="mb-8 flex justify-center">
            <Logo variant="full" size="md" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Register Your Company</h2>
          <p className="text-gray-500 mb-8">
            Create an account first, then complete your company profile in the dashboard.
          </p>
          <RegisterForm accountType="company" />
          <div className="mt-6">
            <SignInOAuthButton provider="google" signUp callbackURL={callbackURL || "/dashboard/company"} />
          </div>
          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/connexion" className="text-red-500 font-semibold hover:underline">
              Sign in
            </Link>
          </p>
          <p className="mt-2 text-center text-sm text-gray-500">
            Individual account?{" "}
            <Link href="/inscription" className="text-red-500 font-semibold hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
