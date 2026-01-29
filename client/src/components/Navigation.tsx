import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { SiX, SiInstagram, SiLinkedin } from "react-icons/si";
import { Link, useLocation } from "wouter";
import logoImage from "@assets/image_1764844531894_1766139828249.png";

interface NavigationProps {
  onContactClick?: () => void;
}

export default function Navigation({ onContactClick }: NavigationProps) {
  const [location, setLocation] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const [currentHash, setCurrentHash] = useState("");
  const navContainerRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});
  
  const getActiveLink = () => {
    if (location === "/contacts") return "Contacts";
    if (location === "/team") return "Teams";
    if (location === "/" && currentHash === "blog") return "Blog";
    if (location === "/" && currentHash === "services") return "Services";
    if (location === "/") return "Home";
    return "Home";
  };
  
  const activeLink = getActiveLink();

  const handleHashNavigation = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const hash = href.split("#")[1];
    
    if (location !== "/") {
      setLocation("/");
      setTimeout(() => {
        window.location.hash = hash;
        window.scrollTo(0, 0);
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 50);
      }, 100);
    } else {
      window.location.hash = hash;
      window.scrollTo(0, 0);
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 50);
    }
  }, [location, setLocation]);

  const handleHomeClick = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    window.location.hash = "";
    setCurrentHash("");
    setLocation("/");
  }, [setLocation]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      setCurrentHash(hash);
    };
    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    const updateUnderline = () => {
      const activeElement = linkRefs.current[activeLink];
      const container = navContainerRef.current;
      if (activeElement && container) {
        const containerRect = container.getBoundingClientRect();
        const activeRect = activeElement.getBoundingClientRect();
        setUnderlineStyle({
          left: activeRect.left - containerRect.left,
          width: activeRect.width,
        });
      }
    };
    updateUnderline();
    window.addEventListener("resize", updateUnderline);
    return () => window.removeEventListener("resize", updateUnderline);
  }, [activeLink]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Teams", href: "/team" },
    { label: "Blog", href: "/#blog" },
    { label: "Services", href: "/#services" },
    { label: "Contacts", href: "/contacts" },
  ];

  const socialLinks = [
    { icon: SiX, href: "https://x.com/ThynxAi", label: "X" },
    { icon: SiLinkedin, href: "https://www.linkedin.com/company/thynxai-prvate-limited/", label: "LinkedIn" },
    { icon: SiInstagram, href: "https://www.instagram.com/thynx.ai/", label: "Instagram" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/95 backdrop-blur-md" : "bg-transparent"
      }`}
      data-testid="navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-24">
          {/* Desktop Logo */}
          <Link href="/" className="hidden md:flex items-center" data-testid="link-logo">
            <img src={logoImage} alt="ThynxAi" className="h-8 w-auto" />
          </Link>

          {/* Mobile Centered Logo */}
          <Link href="/" className="md:hidden absolute left-1/2 -translate-x-1/2 flex items-center" data-testid="link-logo-mobile">
            <img src={logoImage} alt="ThynxAi" className="h-8 w-auto" />
          </Link>

          <div className="hidden md:flex items-center gap-10 relative" ref={navContainerRef}>
            {navLinks.map((link) => (
              link.href.startsWith("/") && !link.href.includes("#") ? (
                link.label === "Home" ? (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleHomeClick(e)}
                    ref={(el) => { linkRefs.current[link.label] = el; }}
                    className={`relative text-base font-medium tracking-wide transition-colors ${
                      activeLink === link.label ? "text-white" : "text-white/90 hover:text-white"
                    }`}
                    data-testid={`link-nav-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    ref={(el: HTMLAnchorElement | null) => { linkRefs.current[link.label] = el; }}
                    className={`relative text-base font-medium tracking-wide transition-colors ${
                      activeLink === link.label ? "text-white" : "text-white/90 hover:text-white"
                    }`}
                    data-testid={`link-nav-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                  </Link>
                )
              ) : (
                <a
                  key={link.label}
                  ref={(el) => { linkRefs.current[link.label] = el; }}
                  href={link.href}
                  onClick={(e) => handleHashNavigation(e, link.href)}
                  className={`relative text-base font-medium tracking-wide transition-colors ${
                    activeLink === link.label ? "text-white" : "text-white/90 hover:text-white"
                  }`}
                  data-testid={`link-nav-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </a>
              )
            ))}
            <span
              className="absolute -bottom-1 h-0.5 bg-white transition-all duration-300 ease-in-out"
              style={{
                left: underlineStyle.left,
                width: underlineStyle.width,
              }}
            />
          </div>

          <div className="hidden md:flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-all"
                data-testid={`link-social-${social.label.toLowerCase()}`}
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-white/10">
          <div className="px-6 py-6 space-y-4">
            {navLinks.map((link) => (
              link.href.startsWith("/") && !link.href.includes("#") ? (
                link.label === "Home" ? (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      handleHomeClick(e);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`block transition-colors text-lg font-medium ${
                      activeLink === link.label ? "text-white" : "text-white/80 hover:text-white"
                    }`}
                    data-testid={`link-mobile-nav-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`block transition-colors text-lg font-medium ${
                      activeLink === link.label ? "text-white" : "text-white/80 hover:text-white"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    data-testid={`link-mobile-nav-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                  </Link>
                )
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className={`block transition-colors text-lg font-medium ${
                    activeLink === link.label ? "text-white" : "text-white/80 hover:text-white"
                  }`}
                  onClick={(e) => {
                    setIsMobileMenuOpen(false);
                    handleHashNavigation(e, link.href);
                  }}
                  data-testid={`link-mobile-nav-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </a>
              )
            ))}
            <div className="flex items-center gap-3 pt-4 border-t border-white/10">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-all"
                  data-testid={`link-mobile-social-${social.label.toLowerCase()}`}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
