interface ScrollingTextProps {
  words: string[];
}

export default function ScrollingText({ words }: ScrollingTextProps) {
  return (
    <section
      className="py-12 overflow-hidden bg-black"
      data-testid="section-scrolling-text"
    >
      <div className="flex whitespace-nowrap animate-scroll-left">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center">
            {words.map((word, index) => (
              <span key={`${i}-${index}`} className="flex items-center">
                <span
                  className="text-5xl md:text-7xl lg:text-8xl font-bold mx-4 md:mx-8"
                  style={{
                    WebkitTextStroke: "2px rgba(255,255,255,0.7)",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {word}
                </span>
                <span
                  className="text-5xl md:text-7xl lg:text-8xl font-bold mx-4 md:mx-8"
                  style={{
                    WebkitTextStroke: "2px rgba(255,255,255,0.7)",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  .
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
