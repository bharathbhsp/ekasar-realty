import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Leads" };

export default async function AdminLeadsPage() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") redirect("/admin");

  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div>
      <h2 className="text-xl font-bold text-navy mb-6">Lead Submissions</h2>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Date</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Name</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Contact</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Project</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Message</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                  {new Date(lead.createdAt).toLocaleDateString("en-IN")}
                </td>
                <td className="px-4 py-3 font-medium text-navy">{lead.name}</td>
                <td className="px-4 py-3">
                  <p>{lead.phone}</p>
                  <p className="text-gray-500 text-xs">{lead.email}</p>
                </td>
                <td className="px-4 py-3 text-gray-600">{lead.projectInterest || "—"}</td>
                <td className="px-4 py-3 text-gray-600 max-w-xs truncate">{lead.message || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {leads.length === 0 && (
          <p className="text-center text-gray-500 py-12">No leads yet.</p>
        )}
      </div>
    </div>
  );
}
