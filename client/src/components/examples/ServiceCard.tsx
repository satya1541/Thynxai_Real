import ServiceCard from "../ServiceCard";
import ideaLabImage from "@assets/generated_images/ai_consultant_holographic_interface.png";

export default function ServiceCardExample() {
  return (
    <div className="max-w-md">
      <ServiceCard
        title="Idea Lab"
        description="Your Personal AI Consultant for innovative ideas"
        image={ideaLabImage}
        onClick={() => console.log("Service clicked")}
      />
    </div>
  );
}
