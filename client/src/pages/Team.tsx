import { SiLinkedin } from "react-icons/si";
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import subhamImage from "@assets/team-subham.png";
import biswajeetImage from "@assets/team-biswajeet.png";
import diptiImage from "@assets/team-dipti.png";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  linkedin: string;
}

export default function Team() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const teamMembers: TeamMember[] = [
    {
      name: "Er. Subham Subhadarshi Panda",
      role: "Founder & CEO",
      image: subhamImage,
      linkedin: "https://www.linkedin.com/in/subham-subhadarshi-panda-119965171/",
    },
    {
      name: "Mr. Biswajeet Mishra",
      role: "CTO",
      image: biswajeetImage,
      linkedin: "https://www.linkedin.com/in/biswajeet-mishra-0005141ba/",
    },
    {
      name: "Mr. Dipti Sundar Mohanty",
      role: "Director & Advisor",
      image: diptiImage,
      linkedin: "https://www.linkedin.com/in/dipti-sundar-mohanty/",
    },
    {
      name: "Mr. Ramya Ranjan Behura",
      role: "Director",
      image: "https://static.wixstatic.com/media/fd607a_1321a397529a416e936d55b53d5b280d~mv2.png/v1/fill/w_225,h_219,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/6.png",
      linkedin: "https://www.linkedin.com/in/ramya-ranjan-behura-4347a1103/",
    },
    {
      name: "Mr. Amiya Chand Panda",
      role: "Director",
      image: "https://static.wixstatic.com/media/fd607a_7a0ae7bcc9af4a2d82fbe63a272a1f35~mv2.png/v1/fill/w_225,h_219,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Illustration_Thynxai.png",
      linkedin: "https://www.linkedin.com/company/thynxai-prvate-limited/",
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 pt-24">
        <h1
          className="text-4xl md:text-5xl font-bold text-white text-center mb-8"
          data-testid="heading-team"
        >
          Our Team
        </h1>

        <ScrollReveal>
          <p className="text-gray-400 text-center max-w-3xl mx-auto mb-16 text-lg">
            Meet the extraordinary people behind Thynx <span className="text-blue-400">AI</span>. Our team combines expertise in <span className="text-blue-400">AI</span>, 
            healthcare technology, and business innovation to drive meaningful change.
          </p>
        </ScrollReveal>

        <div className="mb-16">
          <ScrollReveal direction="left">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              Extraordinary <span className="text-fuchsia-400">People</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <ScrollReveal key={member.name} delay={index * 0.1}>
                <div
                  className="group text-center"
                  data-testid={`card-team-${member.name.toLowerCase().replace(/\s+/g, "-").replace(/\./g, "")}`}
                >
                  <div className="relative overflow-hidden rounded-xl mb-6 mx-auto w-48 h-48">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-fuchsia-500 transition-colors"
                        data-testid={`link-linkedin-${member.name.toLowerCase().replace(/\s+/g, "-").replace(/\./g, "")}`}
                      >
                        <SiLinkedin className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-fuchsia-400 font-medium">{member.role}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
