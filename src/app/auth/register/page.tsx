import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata = { title: "Register" };

export default function RegisterPage() {
  return (
    <div className="pt-24 pb-16 min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-navy mb-2">Create your account</h1>
          <p className="text-gray-600">
            Join Ekasar to access exclusive insights and project updates
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
