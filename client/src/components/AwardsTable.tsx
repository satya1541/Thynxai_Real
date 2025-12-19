import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";

interface Award {
  number: string;
  award: string;
  project: string;
  year: string;
  url: string;
}

const circleColors = [
  "#d946ef", // fuchsia
  "#8b5cf6", // violet
  "#3b82f6", // blue
  "#22c55e", // green
  "#eab308", // yellow
  "#f97316", // orange
  "#ec4899", // pink
  "#06b6d4", // cyan
];

const getRandomColor = () => {
  return circleColors[Math.floor(Math.random() * circleColors.length)];
};

interface AnimatedRowProps {
  award: Award;
  onHover: (url: string) => void;
  onLeave: () => void;
}

function AnimatedRow({ award, onHover, onLeave }: AnimatedRowProps) {
  const rowRef = useRef<HTMLTableRowElement>(null);
  const isInView = useInView(rowRef, {
    once: true,
    margin: "-20% 0px -20% 0px",
  });

  return (
    <motion.tr
      ref={rowRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="border-b border-gray-800/50 transition-colors cursor-pointer hover:bg-gray-900/30"
      data-testid={`row-award-${award.number}`}
      onMouseEnter={() => onHover(award.url)}
      onMouseLeave={onLeave}
      onClick={() => window.open(award.url, "_blank", "noopener,noreferrer")}
    >
      <td className="py-4 sm:py-8 pr-2 sm:pr-8 text-fuchsia-400 font-semibold text-sm sm:text-lg">
        {award.number}
      </td>
      <td className="py-4 sm:py-8 pr-2 sm:pr-8 text-white font-medium text-sm sm:text-lg">
        {award.award}
      </td>
      <td className="py-4 sm:py-8 pr-2 sm:pr-8 text-gray-400 text-xs sm:text-base hidden sm:table-cell">{award.project}</td>
      <td className="py-4 sm:py-8 text-right text-fuchsia-400 font-medium text-xs sm:text-base">
        {award.year}
      </td>
    </motion.tr>
  );
}

function AnimatedHeader() {
  const headerRef = useRef<HTMLTableRowElement>(null);
  const isInView = useInView(headerRef, {
    once: true,
    margin: "-20% 0px -20% 0px",
  });

  return (
    <motion.tr
      ref={headerRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="border-b border-gray-800"
    >
      <th className="text-left text-gray-500 font-medium py-4 sm:py-6 pr-2 sm:pr-8 text-xs uppercase tracking-wider">
        #
      </th>
      <th className="text-left text-gray-500 font-medium py-4 sm:py-6 pr-2 sm:pr-8 text-xs uppercase tracking-wider">
        project
      </th>
      <th className="text-left text-gray-500 font-medium py-4 sm:py-6 pr-2 sm:pr-8 text-xs uppercase tracking-wider hidden sm:table-cell">
        Project type
      </th>
      <th className="text-right text-gray-500 font-medium py-4 sm:py-6 text-xs uppercase tracking-wider">
        Year
      </th>
    </motion.tr>
  );
}

export default function AwardsTable() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredRowUrl, setHoveredRowUrl] = useState<string | null>(null);
  const [circleColor, setCircleColor] = useState(circleColors[0]);

  const awards: Award[] = [
    {
      number: "01",
      award: "Hoarding Wizard",
      project: "AdTech",
      year: "2024",
      url: "https://hoardingwizard.com",
    },
    {
      number: "02",
      award: "Elyx",
      project: "Health Care Device",
      year: "2024",
      url: "http://elyx.thynxai.cloud/",
    },
    {
      number: "03",
      award: "City Care",
      project: "On-Demand Services",
      year: "2025",
      url: "https://play.google.com/store",
    },
    {
      number: "04",
      award: "True levy",
      project: "Fintech",
      year: "2025",
      url: "https://truelevy.in/",
    },
    {
      number: "05",
      award: "NewLineLabs",
      project: "Information Technology (IT)",
      year: "2025",
      url: "https://newlinelabs.tech/",
    },
    {
      number: "06",
      award: "AMX-VERSE",
      project: "Additive Manufacturing Services",
      year: "2025",
      url: "https://amxverse.com/",
    },
  ];

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  const handleRowHover = (url: string) => {
    setHoveredRowUrl(url);
    setCircleColor(getRandomColor());
  };

  const handleRowLeave = () => {
    setHoveredRowUrl(null);
  };

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-24 lg:py-32 bg-black relative"
      style={{ cursor: hoveredRowUrl ? "none" : "auto" }}
      data-testid="section-awards"
    >
      {/* Custom cursor circle - fixed position for accurate tracking */}
      <motion.div
        className="pointer-events-none fixed z-[9999] w-16 sm:w-20 h-16 sm:h-20 rounded-full flex items-center justify-center text-white font-medium text-xs sm:text-sm hidden md:flex"
        animate={{
          opacity: hoveredRowUrl ? 1 : 0,
          scale: hoveredRowUrl ? 1 : 0.5,
          x: mousePosition.x - 40,
          y: mousePosition.y - 40,
        }}
        transition={{
          opacity: { duration: 0.15 },
          scale: { duration: 0.15 },
          x: { duration: 0, ease: "linear" },
          y: { duration: 0, ease: "linear" },
        }}
        style={{
          left: 0,
          top: 0,
          backgroundColor: circleColor,
        }}
        data-testid="cursor-view-circle"
      >
        View
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="overflow-x-auto">
          <table className="w-full text-sm sm:text-base">
            <thead>
              <AnimatedHeader />
            </thead>
            <tbody>
              {awards.map((award) => (
                <AnimatedRow
                  key={award.number}
                  award={award}
                  onHover={handleRowHover}
                  onLeave={handleRowLeave}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
