import { Suspense } from "react";
import { SignInForm } from "@/components/auth/SignInForm";

export const metadata = { title: "Sign In" };

export default function SignInPage() {
  return (
    <div className="pt-24 pb-16 min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-navy mb-2">Welcome back</h1>
          <p className="text-gray-600">Sign in to your Ekasar account</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <Suspense fallback={<p className="text-center text-gray-500">Loading...</p>}>
            <SignInForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
