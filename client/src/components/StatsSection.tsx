import { Play, X, Loader2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { SiLinkedin, SiIndeed, SiFiverr } from "react-icons/si";
import aiRobotImage from "@assets/generated_images/female_ai_robot_profile.png";
import serverImage from "@assets/generated_images/server_rack_in_storm_clouds.png";
import ScrollReveal from "@/components/ScrollReveal";
import presentationVideo from "@assets/generated_videos/professional_ai_tech_corporate_presentation_video.mp4";

export default function StatsSection() {
  const [count, setCount] = useState(0);
  const [ideasCount, setIdeasCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const preloadVideoRef = useRef<HTMLVideoElement>(null);
  const targetCount = 4835;
  const targetIdeasCount = 999;

  // Preload video when section becomes visible
  useEffect(() => {
    if (isVisible && preloadVideoRef.current && !isVideoLoaded) {
      preloadVideoRef.current.load();
    }
  }, [isVisible, isVideoLoaded]);

  const handleVideoClick = () => {
    setIsVideoOpen(true);
    if (!isVideoLoaded) {
      setIsVideoLoading(true);
    }
  };

  const handleVideoCanPlay = () => {
    setIsVideoLoaded(true);
    setIsVideoLoading(false);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleCloseVideo = () => {
    setIsVideoOpen(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (isVisible && count < targetCount) {
      const duration = 2000;
      const steps = 60;
      const increment = targetCount / steps;
      const stepDuration = duration / steps;

      const timer = setInterval(() => {
        setCount((prev) => {
          const next = prev + increment;
          if (next >= targetCount) {
            clearInterval(timer);
            return targetCount;
          }
          return next;
        });
      }, stepDuration);

      return () => clearInterval(timer);
    }
  }, [isVisible, count]);

  useEffect(() => {
    if (isVisible && ideasCount < targetIdeasCount) {
      const duration = 2000;
      const steps = 50;
      const increment = targetIdeasCount / steps;
      const stepDuration = duration / steps;

      const timer = setInterval(() => {
        setIdeasCount((prev) => {
          const next = prev + increment;
          if (next >= targetIdeasCount) {
            clearInterval(timer);
            return targetIdeasCount;
          }
          return next;
        });
      }, stepDuration);

      return () => clearInterval(timer);
    }
  }, [isVisible, ideasCount]);

  const partners = [
    { name: "LinkedIn", display: "LinkedIn", icon: SiLinkedin, url: "https://www.linkedin.com" },
    { name: "Indeed", display: "Indeed", icon: SiIndeed, url: "https://www.indeed.com" },
    { name: "Fiverr", display: "Fiverr", icon: SiFiverr, url: "https://www.fiverr.com" },
    { name: "Naukri", display: "Naukri", icon: null, url: "https://www.naukri.com" },
    { name: "Fishbowl", display: "Fishbowl", icon: null, url: "https://www.fishbowlapp.com" },
  ];

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-black" data-testid="section-stats">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12 lg:gap-20 items-start">
          <div className="lg:pt-8">
            <ScrollReveal direction="left">
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-8 leading-tight">
                Powering Innovation with <span className="text-blue-400">AI</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="w-16 h-px bg-gray-600 mb-4 sm:mb-8" />
              <p className="text-gray-400 leading-relaxed text-sm sm:text-lg mb-6 sm:mb-10">From validating your idea to finding the right team, managing development and launching to market - Thynxai's <span className="text-blue-400">AI</span>-powered platform guides you every step of the way.</p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <button
                className="flex items-center gap-4 text-white hover:text-fuchsia-400 transition-colors group"
                onClick={handleVideoClick}
                data-testid="button-video-presentation"
              >
                <div className="w-14 h-14 rounded-full border-2 border-current flex items-center justify-center group-hover:bg-fuchsia-500 group-hover:border-fuchsia-500 transition-all">
                  <Play className="w-5 h-5 fill-current ml-1" />
                </div>
                <span className="font-medium text-lg">Video Presentation</span>
              </button>
            </ScrollReveal>
          </div>

          <div className="relative min-h-[400px] sm:min-h-[500px]">
            <ScrollReveal direction="right">
              <div className="absolute top-0 right-0 w-full sm:w-3/4 rounded-2xl overflow-hidden z-10">
                <img
                  src={serverImage}
                  alt="Digital Infrastructure"
                  className="w-full h-auto object-cover"
                />
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <div className="absolute top-1/3 left-0 z-20">
                <div className="bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-xl sm:rounded-2xl p-4 sm:p-8 text-white shadow-2xl shadow-fuchsia-500/20">
                  <p className="text-xs sm:text-sm font-medium mb-1 sm:mb-2 opacity-90">Ideas Validated</p>
                  <p className="text-3xl sm:text-5xl md:text-6xl font-bold">
                    {Math.floor(ideasCount)}{ideasCount >= targetIdeasCount ? "+" : ""}
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3} direction="left">
              <div className="absolute bottom-0 left-2 sm:left-8 w-1/2 sm:w-1/2 rounded-lg sm:rounded-2xl overflow-hidden z-0">
                <img
                  src={aiRobotImage}
                  alt="AI Robot"
                  className="w-full h-auto object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>

        <div className="mt-10 sm:mt-20 pt-8 sm:pt-16" data-testid="section-trusted-by">
          <div className="flex flex-wrap items-center justify-between gap-4 sm:gap-8">
            <div className="flex flex-wrap items-center gap-4 sm:gap-8 md:gap-16">
              {partners.map((partner, index) => (
                <ScrollReveal key={partner.name} delay={index * 0.1}>
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 text-gray-500 hover:text-gray-300 transition-colors cursor-pointer"
                    data-testid={`logo-partner-${partner.name.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {partner.icon ? (
                      <partner.icon className="w-8 h-8 md:w-10 md:h-10" />
                    ) : (
                      <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
                        <span className="text-2xl md:text-3xl font-bold">{partner.name.charAt(0)}</span>
                      </div>
                    )}
                    <span className="text-sm md:text-base font-medium tracking-wide">{partner.display}</span>
                  </a>
                </ScrollReveal>
              ))}
            </div>
            <ScrollReveal direction="right">
              <div className="flex items-center gap-4">
                <div className="w-12 h-px bg-white" />
                <span className="text-white font-medium text-lg">Integrated with</span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
      {/* Hidden preload video */}
      <video
        ref={preloadVideoRef}
        preload="auto"
        className="hidden"
        onCanPlayThrough={() => setIsVideoLoaded(true)}
      >
        <source src={presentationVideo} type="video/mp4" />
      </video>
      {isVideoOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={handleCloseVideo}
          data-testid="modal-video-overlay"
        >
          <div 
            className="relative w-full max-w-4xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-12 right-0 text-white hover:text-fuchsia-400 transition-colors"
              onClick={handleCloseVideo}
              data-testid="button-close-video"
            >
              <X className="w-8 h-8" />
            </button>
            
            {isVideoLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg z-10">
                <Loader2 className="w-12 h-12 text-fuchsia-500 animate-spin" />
              </div>
            )}
            
            <video
              ref={videoRef}
              preload="auto"
              controls
              onCanPlay={handleVideoCanPlay}
              className="w-full rounded-lg shadow-2xl"
              data-testid="video-presentation"
            >
              <source src={presentationVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </section>
  );
}
