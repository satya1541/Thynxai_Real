import { ArrowRight } from "lucide-react";
import { useLocation } from "wouter";
import studioImage from "@assets/generated_images/technology_project_dashboard_interface.png";
import ScrollReveal from "@/components/ScrollReveal";

export default function FeatureSection() {
  const [, setLocation] = useLocation();

  const handleContactClick = () => {
    setLocation("/contacts");
  };

  return (
    <section className="relative min-h-[600px] bg-black overflow-hidden" data-testid="section-feature">
      <div className="absolute inset-0 z-0">
        <img
          src={studioImage}
          alt="Technology Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32 flex items-center min-h-[600px]">
        <div className="max-w-xl">
          <ScrollReveal direction="left">
            <span className="text-fuchsia-400 text-sm font-semibold uppercase tracking-widest">
              Our Mission
            </span>
          </ScrollReveal>
          <ScrollReveal direction="left" delay={0.1}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-6 mb-6 leading-tight">
              From Idea to Market
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="left" delay={0.2}>
            <p className="text-gray-300 leading-relaxed text-lg">One complete ecosystem for Innovators. Validate your idea with AI, find the right team, build with powerful tools, and sell directly to your audience - all in one place.</p>
          </ScrollReveal>
        </div>

        <ScrollReveal direction="right" delay={0.3}>
          <div className="absolute right-8 lg:right-16 top-1/2 -translate-y-1/2 hidden md:block">
            <button
              className="group flex items-center gap-4 bg-black/30 backdrop-blur-sm border border-white/20 rounded-full px-8 py-5 hover:bg-black/50 hover:border-white/40 transition-all"
              onClick={handleContactClick}
              data-testid="button-contact-us"
            >
              <span className="text-white font-medium text-lg">Contact Us</span>
              <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                <ArrowRight className="w-5 h-5" />
              </div>
            </button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
