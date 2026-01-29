export default function TrustedBy() {
  const partners = [
    { name: "playvox", display: "playvox" },
    { name: "noupe", display: "noupe" },
    { name: "Linja", display: "Linja" },
    { name: "LINE Pay", display: "LINE Pay" },
    { name: "appstorm", display: "app⚡storm" },
  ];

  return (
    <section className="py-16 bg-black border-t border-b border-gray-900" data-testid="section-trusted-by">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-8">
          <div className="flex flex-wrap items-center gap-8 md:gap-16">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="text-gray-600 hover:text-gray-400 transition-colors cursor-pointer"
                data-testid={`logo-partner-${partner.name.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <span className="text-lg md:text-xl font-medium tracking-wide">{partner.display}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-px bg-white" />
            <span className="text-white font-medium text-lg">Trusted by</span>
          </div>
        </div>
      </div>
    </section>
  );
}
