import ScrollReveal from "@/components/ScrollReveal";

export default function QuoteSection() {
  return (
    <section className="py-24 lg:py-32 bg-black" data-testid="section-quote">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Transform your business with <span className="text-blue-400">AI</span>:{" "}
            <span className="text-fuchsia-400">
              Opportunities and Innovations
            </span>{" "}
            that will change the game
          </h2>
        </ScrollReveal>
      </div>
    </section>
  );
}
