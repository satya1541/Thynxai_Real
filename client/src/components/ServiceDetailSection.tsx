import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServiceDetailProps {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  image: string;
  reverse?: boolean;
}

export default function ServiceDetailSection({
  title,
  subtitle,
  description,
  features,
  image,
  reverse = false,
}: ServiceDetailProps) {
  return (
    <section
      className="py-20 lg:py-32 bg-background"
      data-testid={`section-service-detail-${title.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
            reverse ? "lg:flex-row-reverse" : ""
          }`}
        >
          <div className={reverse ? "lg:order-2" : ""}>
            <span className="text-fuchsia-400 text-sm font-medium uppercase tracking-wider">
              {subtitle}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6">
              {title}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">{description}</p>

            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-fuchsia-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-fuchsia-400" />
                  </div>
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              className="bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 text-white"
              data-testid={`button-learn-more-${title.toLowerCase().replace(/\s+/g, "-")}`}
            >
              Learn More <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className={`${reverse ? "lg:order-1" : ""} rounded-2xl overflow-hidden`}>
            <img
              src={image}
              alt={title}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
