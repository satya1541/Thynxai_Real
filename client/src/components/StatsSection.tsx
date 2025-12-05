import { Play, X, Loader2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import aiRobotImage from "@assets/generated_images/female_ai_robot_profile.png";
import serverImage from "@assets/generated_images/server_rack_in_storm_clouds.png";
import ScrollReveal from "@/components/ScrollReveal";
import presentationVideo from "@assets/Cinematic_ultrahigh_resolution_20251204163_1764846718495.mp4";

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
    { name: "LinkedIn", display: "LinkedIn" },
    { name: "Indeed", display: "Indeed" },
    { name: "Fiverr", display: "Fiverr" },
    { name: "Naukri", display: "Naukri" },
    { name: "Fishbowl", display: "Fishbowl" },
  ];

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-black" data-testid="section-stats">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="lg:pt-8">
            <ScrollReveal direction="left">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
                Powering Innovation with AI
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="w-16 h-px bg-gray-600 mb-8" />
              <p className="text-gray-400 leading-relaxed text-lg mb-10">
                From validating your idea to finding the right team, managing development, and launching to market - Thynxai's AI-powered platform guides you every step of the way.
              </p>
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

          <div className="relative min-h-[500px]">
            <ScrollReveal direction="right">
              <div className="absolute top-0 right-0 w-3/4 rounded-2xl overflow-hidden z-10">
                <img
                  src={serverImage}
                  alt="Digital Infrastructure"
                  className="w-full h-auto object-cover"
                />
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <div className="absolute top-1/3 left-0 z-20">
                <div className="bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-2xl p-8 text-white shadow-2xl shadow-fuchsia-500/20">
                  <p className="text-sm font-medium mb-2 opacity-90">Ideas Validated</p>
                  <p className="text-5xl md:text-6xl font-bold">
                    {Math.floor(ideasCount)}{ideasCount >= targetIdeasCount ? "+" : ""}
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3} direction="left">
              <div className="absolute bottom-0 left-8 w-1/2 rounded-2xl overflow-hidden z-0">
                <img
                  src={aiRobotImage}
                  alt="AI Robot"
                  className="w-full h-auto object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>

        <div className="mt-20 pt-16" data-testid="section-trusted-by">
          <div className="flex flex-wrap items-center justify-between gap-8">
            <div className="flex flex-wrap items-center gap-8 md:gap-16">
              {partners.map((partner, index) => (
                <ScrollReveal key={partner.name} delay={index * 0.1}>
                  <div
                    className="text-gray-600 hover:text-gray-400 transition-colors cursor-pointer"
                    data-testid={`logo-partner-${partner.name.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <span className="text-lg md:text-xl font-medium tracking-wide">{partner.display}</span>
                  </div>
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
