import Link from "next/link";

export const metadata = { title: "Forgot Password" };

export default function ForgotPasswordPage() {
  return (
    <div className="pt-24 pb-16 min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-md px-4 text-center">
        <h1 className="text-3xl font-bold text-navy mb-4">Reset your password</h1>
        <p className="text-gray-600 mb-8">
          Password reset via email is coming in Phase 2. For now, please contact{" "}
          <a href="mailto:info@ekasar.com" className="text-gold font-semibold">
            info@ekasar.com
          </a>{" "}
          for assistance.
        </p>
        <Link
          href="/auth/sign-in"
          className="text-navy font-semibold hover:text-gold transition-colors"
        >
          ← Back to Sign In
        </Link>
      </div>
    </div>
  );
}
