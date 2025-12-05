import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import QuoteSection from "@/components/QuoteSection";
import ContentSection from "@/components/ContentSection";
import ScrollingText from "@/components/ScrollingText";
import StatsSection from "@/components/StatsSection";
import FeatureSection from "@/components/FeatureSection";
import AwardsTable from "@/components/AwardsTable";
import NewsletterSection from "@/components/NewsletterSection";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export default function Home() {
  const scrollToContact = () => {
    const element = document.getElementById("newsletter");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navigation onContactClick={scrollToContact} />
      
      <HeroSection onContactClick={scrollToContact} />
      
      <ServicesSection />

      <QuoteSection />
      
      <ContentSection />

      <ScrollReveal direction="left">
        <ScrollingText words={["Revolutionizing", "Innovative", "Empowering"]} />
      </ScrollReveal>

      <StatsSection />

      <FeatureSection />

      <ScrollReveal direction="right">
        <ScrollingText words={["Creative", "Inventive", "Progressive"]} />
      </ScrollReveal>

      <AwardsTable />

      <div id="newsletter">
        <NewsletterSection />
      </div>

      <BlogSection />

      <Footer />

      <ScrollToTopButton />
    </div>
  );
}
