import ReturnButton from "@/components/return-button";
import Link from "next/link";
import { MailCheck, ArrowRight } from "lucide-react";

const page = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-white via-green-50/30 to-white">
      <div className="px-4 py-10 md:py-20 xl:px-14 xxl:px-40 xll:px-80 xxx:px-[22%] lll:px-[25%]">
        
        <ReturnButton href="/" label="Back to home" />

        <div className="mt-10 mx-auto w-full max-w-xl rounded-[36px] border border-gray-200 bg-white px-8 py-12 shadow-[0_20px_60px_rgba(0,0,0,0.08)] text-center">
          
          {/* Icon */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <MailCheck className="h-10 w-10 text-green-600" />
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900">
            Check your email
          </h1>

          {/* Description */}
          <p className="mt-4 text-base leading-7 text-gray-500">
            We’ve sent a password reset link to your email address.  
            Please open your inbox and follow the instructions to reset your password.
          </p>

          {/* Info */}
          <div className="mt-6 rounded-2xl bg-gray-50 p-4 text-sm text-gray-600">
            Didn’t receive the email? Check your spam folder or try again in a few minutes.
          </div>

          {/* Actions */}
          {/* <div className="mt-10 flex flex-col gap-4">
            <Link
              href="/connexion"
              className="flex items-center justify-center gap-2 rounded-full bg-red-500 px-6 py-4 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(239,68,68,0.25)] transition-all duration-300 hover:bg-red-600"
            >
              Back to login
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/auth/forgot-password"
              className="text-sm font-medium text-gray-500 transition hover:text-red-500"
            >
              Resend email
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default page;