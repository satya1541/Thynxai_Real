import { ArrowRight } from "lucide-react";
import ideaLabImage from "@assets/generated_images/minimalist_ai_neural_brain.png";
import studioImage from "@assets/generated_images/minimalist_tech_dashboard_abstract.png";
import repoImage from "@assets/generated_images/minimalist_code_repository_graph.png";
import freeMarketImage from "@assets/generated_images/minimalist_marketplace_abstract_cubes.png";
import ScrollReveal from "@/components/ScrollReveal";

export default function ServicesSection() {
  const services = [
    {
      number: "01",
      title: "Idea Lab",
      description: "Your Personal AI Consultant",
      image: ideaLabImage,
      targetId: "idea-lab",
    },
    {
      number: "02",
      title: "Thynx Studio",
      description: "Your Personal Technology Officer",
      image: studioImage,
      targetId: "thynx-studio",
    },
    {
      number: "03",
      title: "Thynx Repo",
      description: "Your Personal AI Repository",
      image: repoImage,
      targetId: "thynx-repo",
    },
    {
      number: "04",
      title: "Free Market",
      description: "Your Personal Trading Platform",
      image: freeMarketImage,
      targetId: "free-market",
    },
  ];

  const handleScrollToSection = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="services" className="py-12 sm:py-24 lg:py-32 bg-black" data-testid="section-services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 sm:gap-8 mb-12 sm:mb-16">
          <ScrollReveal direction="left">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white">
              <span className="text-blue-400">AI</span> products
            </h2>
          </ScrollReveal>
          <div className="flex flex-col lg:flex-row lg:items-start gap-6 sm:gap-8 lg:gap-16">
            <ScrollReveal delay={0.1}>
              <p className="text-gray-400 max-w-md text-sm sm:text-lg leading-relaxed">Transform your Innovative ideas into reality with our <span className="text-blue-400">AI</span>-powered ecosystem. From concept validation to market launch, Thynxai provides the tools, talent and technology you need to succeed.</p>
            </ScrollReveal>
            <ScrollReveal delay={0.2} direction="right">
              <a
                href="#about"
                className="flex items-center gap-2 text-white hover:text-fuchsia-400 transition-colors whitespace-nowrap group"
                data-testid="link-view-more-services"
              >
                View More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </ScrollReveal>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ScrollReveal key={service.number} delay={index * 0.15}>
              <div
                className="group cursor-pointer"
                data-testid={`card-service-${service.title.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => handleScrollToSection(service.targetId)}
              >
                <div className="relative rounded-xl overflow-hidden mb-6">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg font-medium text-white flex items-center gap-2">
                    <span className="inline-block overflow-hidden">
                      <span className="inline-block text-fuchsia-400 font-medium translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                        {service.number}.
                      </span>
                    </span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      {service.title}
                    </span>
                  </h3>
                  <button
                    className="w-8 h-8 rounded-full border border-gray-700 flex items-center justify-center group-hover:border-fuchsia-400 transition-colors"
                    aria-label={`Go to ${service.title} section`}
                  >
                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-fuchsia-400 transition-colors" />
                  </button>
                </div>
                
                <div className="mt-4 h-px bg-gray-800 group-hover:bg-gray-700 transition-colors" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
