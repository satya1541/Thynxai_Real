import { ArrowRight } from "lucide-react";
import { SiFacebook, SiX, SiDribbble, SiInstagram } from "react-icons/si";
import maleDevImage from "@assets/generated_images/male_developer_portrait.png";
import femaleDesignerImage from "@assets/generated_images/female_designer_portrait.png";
import aiRobotImage from "@assets/generated_images/female_ai_robot_profile.png";
import ScrollReveal from "@/components/ScrollReveal";

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export default function TeamSection() {
  const team: TeamMember[] = [
    { name: "John Lewis", role: "Photographer", image: maleDevImage },
    { name: "Jane Lee", role: "Art Director", image: femaleDesignerImage },
    { name: "Nicky Carter", role: "Project Manager", image: aiRobotImage },
  ];

  const socialLinks = [
    { icon: SiFacebook, href: "#" },
    { icon: SiX, href: "#" },
    { icon: SiDribbble, href: "#" },
    { icon: SiInstagram, href: "#" },
  ];

  return (
    <section id="team" className="py-12 sm:py-24 lg:py-32 bg-black" data-testid="section-team">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 mb-8 sm:mb-16">
          <ScrollReveal direction="left">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white">
              Extraordinary people
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <a
              href="#"
              className="flex items-center gap-2 text-white hover:text-fuchsia-400 transition-colors group w-fit"
              data-testid="link-view-team"
            >
              Our Team <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <ScrollReveal key={member.name} delay={index * 0.15}>
              <div
                className="group"
                data-testid={`card-team-${member.name.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="relative overflow-hidden rounded-xl mb-6">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {socialLinks.map((social, i) => (
                      <a
                        key={i}
                        href={social.href}
                        className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-fuchsia-500 transition-colors"
                      >
                        <social.icon className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-gray-500">{member.role}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
