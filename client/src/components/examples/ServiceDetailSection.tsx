import ServiceDetailSection from "../ServiceDetailSection";
import ideaLabImage from "@assets/generated_images/ai_consultant_holographic_interface.png";

export default function ServiceDetailSectionExample() {
  return (
    <ServiceDetailSection
      title="Idea Lab"
      subtitle="Your Personal AI Consultant"
      description="Discuss your innovative ideas with our advanced AI consultant that provides comprehensive insights on project requirements, limitations, and optimal approaches."
      features={[
        "AI-powered project analysis",
        "Real-time consultation",
        "Budget and timeline estimation",
        "Technology stack recommendations",
      ]}
      image={ideaLabImage}
    />
  );
}
