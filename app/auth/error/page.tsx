import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const page = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-white via-red-50/20 to-white px-4 py-20">
      <div className="mx-auto max-w-xl rounded-[32px] border border-gray-200 bg-white p-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
        <h1 className="text-3xl font-bold text-gray-900">Authentication</h1>
        <p className="mt-4 text-base leading-7 text-gray-500">
          Return to the login page to continue accessing your account.
        </p>

        <Link href="/connexion" className="mt-8 inline-flex">
          <Button className="rounded-full bg-red-500 px-6 py-6 text-white hover:bg-red-600">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à la page de connexion
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default page;