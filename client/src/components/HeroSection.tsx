import { MouseEvent, useCallback, useMemo } from "react";
import { motion, Variants, useReducedMotion } from "framer-motion";
import heroVideoWebm from "@assets/hero-video-optimized.webm";
import heroVideoMp4 from "@assets/hero-video-optimized.mp4";

interface HeroSectionProps {
  onContactClick?: () => void;
}

interface CharacterRevealProps {
  text: string;
  className?: string;
  isGradient?: boolean;
  gradientClass?: string;
  startDelay?: number;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.035,
      delayChildren: 0,
    },
  },
};

const characterVariants: Variants = {
  hidden: (i: number) => ({
    opacity: 0,
    y: 30,
    rotateX: -60,
    rotateZ: i % 2 === 0 ? 2 : -2,
    scale: 0.8,
  }),
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    rotateZ: 0,
    scale: 1,
    transition: {
      opacity: {
        duration: 0.35,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
      y: {
        type: "spring",
        stiffness: 400,
        damping: 30,
        mass: 0.8,
      },
      rotateX: {
        type: "spring",
        stiffness: 350,
        damping: 25,
        mass: 0.7,
      },
      rotateZ: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        mass: 0.6,
        delay: i * 0.005,
      },
      scale: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        mass: 0.6,
      },
    },
  }),
};

function CharacterReveal({
  text,
  className = "",
  isGradient = false,
  gradientClass = "bg-gradient-to-r from-fuchsia-400 to-purple-400",
  startDelay = 0,
}: CharacterRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const characters = useMemo(() => text.split(""), [text]);

  if (shouldReduceMotion) {
    return (
      <span
        className={`inline-block ${className} ${isGradient ? `${gradientClass} bg-clip-text text-transparent` : ""}`}
      >
        {text}
      </span>
    );
  }

  return (
    <motion.span
      className={`inline-flex ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        perspective: "1000px",
      }}
      transition={{
        delayChildren: startDelay,
        staggerChildren: 0.035,
      }}
    >
      {characters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          custom={index}
          variants={characterVariants}
          className={`inline-block will-change-transform ${
            isGradient ? `${gradientClass} bg-clip-text text-transparent` : ""
          }`}
          style={{
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            display: char === " " ? "inline" : "inline-block",
            width: char === " " ? "0.3em" : "auto",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

const scrollIndicatorVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      delay: 2.0,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export default function HeroSection({ onContactClick }: HeroSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  const handleScrollClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      const target = document.getElementById("services");
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [],
  );

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
      data-testid="section-hero"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={heroVideoWebm} type="video/webm" />
        <source src={heroVideoMp4} type="video/mp4" />
      </video>

      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/60" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex flex-col items-center justify-center">
          <div className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight tracking-tight">
            <h1 className="sr-only">
              Welcome to Thynx Ai - The OS of Technology
            </h1>

            <div
              className="flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-4 md:gap-x-5"
              aria-hidden="true"
            >
              <CharacterReveal text="Welcome" startDelay={0.2} />
              <CharacterReveal text="to" startDelay={0.5} />
              <span className="inline-flex items-baseline">
                <CharacterReveal text="Thynx" startDelay={0.7} />
                <span className="inline-block w-1 sm:w-2 md:w-3" />
                <CharacterReveal
                  text="Ai"
                  isGradient
                  gradientClass="bg-gradient-to-r from-[#60a5fa] via-[#3b82f6] to-[#2563eb]"
                  startDelay={0.9}
                />
              </span>
            </div>

            <div
              className="flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-4 md:gap-x-5 mt-1 sm:mt-2 md:mt-4"
              aria-hidden="true"
            >
              <CharacterReveal text="The" startDelay={1.0} />
              <CharacterReveal text="OS" startDelay={1.2} />
            </div>

            <div className="block mt-1 sm:mt-2 md:mt-4" aria-hidden="true">
              <CharacterReveal text="of" startDelay={1.5} />
              <span className="inline-block w-2 sm:w-3 md:w-4" />
              <CharacterReveal text="Technology" startDelay={1.6} />
            </div>
          </div>
        </div>
      </div>

      {shouldReduceMotion ? (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <a
            href="#services"
            data-testid="link-scroll-down"
            onClick={handleScrollClick}
            aria-label="Scroll to services section"
          >
            <div className="w-4 h-7 rounded-full border border-white/60 flex items-start justify-center pt-1 backdrop-blur-md bg-black/40">
              <div className="w-0.5 h-1.5 bg-white/70 rounded-full" />
            </div>
          </a>
        </div>
      ) : (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          initial="hidden"
          animate="visible"
          variants={scrollIndicatorVariants}
        >
          <a
            href="#services"
            data-testid="link-scroll-down"
            className="animate-bounce"
            onClick={handleScrollClick}
            aria-label="Scroll to services section"
          >
            <div className="w-4 h-7 rounded-full border border-white/60 flex items-start justify-center pt-1 backdrop-blur-md bg-black/40">
              <div className="w-0.5 h-1.5 bg-white/70 rounded-full animate-pulse" />
            </div>
          </a>
        </motion.div>
      )}
    </section>
  );
}
