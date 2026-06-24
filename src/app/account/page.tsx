import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { signOut } from "@/lib/auth";
import Link from "next/link";

export const metadata = { title: "My Account" };

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) redirect("/auth/sign-in?returnUrl=/account");

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-navy mb-8">My Account</h1>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">Name</p>
            <p className="font-medium text-navy">{session.user.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Email</p>
            <p className="font-medium text-navy">{session.user.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Role</p>
            <p className="font-medium text-navy capitalize">{session.user.role.toLowerCase()}</p>
          </div>

          <div className="pt-4 border-t border-gray-100 flex flex-wrap gap-4">
            <Link
              href="/blog"
              className="text-gold font-semibold hover:underline"
            >
              Browse Insights →
            </Link>
            {(session.user.role === "EDITOR" || session.user.role === "ADMIN") && (
              <Link href="/admin" className="text-gold font-semibold hover:underline">
                Admin Dashboard →
              </Link>
            )}
          </div>

          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button
              type="submit"
              className="text-red-600 text-sm font-medium hover:underline"
            >
              Sign Out
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
