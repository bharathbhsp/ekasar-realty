export const metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-gold font-medium tracking-widest uppercase text-sm mb-3">
          About Ekasar
        </p>
        <h1 className="text-4xl font-bold text-navy mb-8">
          Building communities that move families forward
        </h1>

        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p>
            Ekasar Realty was founded on a simple belief: every family deserves a home
            built with rigor, empathy, and long-term value. For over 18 years, we have
            delivered residential communities across Bangalore that balance city access
            with neighborhood calm.
          </p>
          <p>
            Our approach — which we call <strong>The Ekasar Promise</strong> — applies
            disciplined planning to every decision: from legal due diligence and value
            engineering to lifestyle design and on-time delivery.
          </p>
          <p>
            Today, with 12 delivered projects and 6 lakh square feet under active
            development, we continue to raise the bar for what homebuyers can expect
            from a developer they trust.
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-3 gap-6">
          {[
            { label: "Founded", value: "2008" },
            { label: "Headquarters", value: "Bangalore" },
            { label: "Focus", value: "Residential" },
          ].map((item) => (
            <div key={item.label} className="bg-cream rounded-xl p-6 text-center">
              <p className="text-2xl font-bold text-navy">{item.value}</p>
              <p className="text-sm text-gray-600 mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
