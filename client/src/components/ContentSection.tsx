import { useRef, useEffect } from "react";
import ideaLabVideo from "@assets/generated_videos/ai_neural_network_consultation_visualization.mp4";
import studioVideo from "@assets/generated_videos/project_management_team_collaboration_workflow.mp4";
import repoVideo from "@assets/generated_videos/git_repository_code_flow_visualization.mp4";
import marketVideo from "@assets/generated_videos/digital_marketplace_products_and_transactions_flow.mp4";
import ScrollReveal from "@/components/ScrollReveal";

function LoopingVideo({ src, className }: { src: string; className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      video.currentTime = 0;
      video.play().catch(() => {});
    };

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        video.play().catch(() => {});
      }
    };

    video.addEventListener("ended", handleEnded);
    document.addEventListener("visibilitychange", handleVisibility);

    const playVideo = () => {
      video.play().catch(() => {});
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            playVideo();
          }
        });
      },
      { threshold: 0.1 },
    );

    observer.observe(video);

    return () => {
      video.removeEventListener("ended", handleEnded);
      document.removeEventListener("visibilitychange", handleVisibility);
      observer.disconnect();
    };
  }, []);

  return (
    <video ref={videoRef} autoPlay muted loop playsInline className={className}>
      <source src={src} type="video/mp4" />
    </video>
  );
}

export default function ContentSection() {
  return (
    <section className="py-16 lg:py-24 bg-black" data-testid="section-content">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div
          id="idea-lab"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start scroll-mt-24"
        >
          <ScrollReveal direction="left">
            <div className="rounded-2xl overflow-hidden h-80 lg:h-96">
              <LoopingVideo
                src={ideaLabVideo}
                className="w-full h-full object-cover"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.1}>
            <div className="lg:pt-16">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                <span className="bg-gradient-to-r from-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
                  Idea Lab
                </span>{" "}
                - Your Personal <span className="text-blue-400">AI</span>{" "}
                Consultant
              </h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                Have an innovative idea? Discuss it with our most advanced{" "}
                <span className="text-blue-400">AI</span>
                consultant. Idea Lab guides you through your concepts, analyzing
                requirements, limitations and advantages. Receive a detailed
                project report with estimated costs and team requirements to
                bring your vision to life.
              </p>
            </div>
          </ScrollReveal>
        </div>

        <div
          id="thynx-studio"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mt-16 scroll-mt-24"
        >
          <ScrollReveal direction="left" delay={0.1}>
            <div className="lg:pt-16">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                <span className="bg-gradient-to-r from-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
                  Thynx Studio
                </span>{" "}
                - Your Personal <span className="text-blue-400">AI</span>{" "}
                Technology Officer
              </h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                Find the right talent for your project across Thynx Studio.
                Upload your Idea Lab report to match with skilled professionals.
                Manage your entire project with built-in bug tracking, issue
                management, agile workflows and transparent employee payment
                systems.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="rounded-2xl overflow-hidden h-80 lg:h-96">
              <LoopingVideo
                src={studioVideo}
                className="w-full h-full object-cover"
              />
            </div>
          </ScrollReveal>
        </div>

        <div
          id="thynx-repo"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mt-16 scroll-mt-24"
        >
          <ScrollReveal direction="left">
            <div className="rounded-2xl overflow-hidden h-80 lg:h-96">
              <LoopingVideo
                src={repoVideo}
                className="w-full h-full object-cover"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.1}>
            <div className="lg:pt-16">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                <span className="bg-gradient-to-r from-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
                  Thynx Repo
                </span>{" "}
                - Your Personal <span className="text-blue-400">AI</span>{" "}
                Repository
              </h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                Our in-house developed repository platform brings you everything
                you love about GitHub and GitLab. Host your code, collaborate
                with your team, and leverage powerful Git version control
                features - all within the Thynx ecosystem for seamless project
                integration.
              </p>
            </div>
          </ScrollReveal>
        </div>

        <div
          id="free-market"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mt-16 scroll-mt-24"
        >
          <ScrollReveal direction="left" delay={0.1}>
            <div className="lg:pt-16">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                <span className="bg-gradient-to-r from-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
                  Thynx Free Market
                </span>{" "}
                - Zero Commission Marketplace
              </h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                List and sell your software, apps, websites, or source code with
                live previews - completely commission-free. Every payment goes
                directly to you, the creator. Empowering innovators to monetize
                their work while buyers connect directly with product providers.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="rounded-2xl overflow-hidden h-80 lg:h-96">
              <LoopingVideo
                src={marketVideo}
                className="w-full h-full object-cover"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
