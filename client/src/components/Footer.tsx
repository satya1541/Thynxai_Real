import { SiX, SiInstagram, SiLinkedin } from "react-icons/si";
import { Link } from "wouter";
import logoImage from "@assets/image_1764844531894_1766139828249.png";

export default function Footer() {
  const socialLinks = [
    { icon: SiX, href: "https://x.com/ThynxAi", label: "X" },
    { icon: SiLinkedin, href: "https://www.linkedin.com/company/thynxai-prvate-limited/", label: "LinkedIn" },
    { icon: SiInstagram, href: "https://www.instagram.com/thynx.ai/", label: "Instagram" },
  ];

  return (
    <footer className="relative bg-black py-4 sm:py-6 border-t border-gray-800/50" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <Link href="/" className="flex items-center" data-testid="link-footer-logo">
            <img src={logoImage} alt="ThynxAi" className="h-8 w-auto" />
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 sm:w-10 h-8 sm:h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-all"
                data-testid={`link-footer-social-${social.label.toLowerCase()}`}
              >
                <social.icon className="w-3 sm:w-4 h-3 sm:h-4" />
              </a>
            ))}
          </div>
        </div>
        
        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-800/30 text-center">
          <p className="text-gray-500 text-xs">
            Thynx<span className="text-blue-400">Ai</span> Pvt. Limited © 2026. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
