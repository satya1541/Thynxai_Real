import { SiX, SiInstagram, SiLinkedin } from "react-icons/si";
import { Link } from "wouter";
import companyLogo from "@assets/image_1764844531894.png";

export default function Footer() {
  const socialLinks = [
    { icon: SiX, href: "https://x.com/ThynxAi", label: "X" },
    { icon: SiLinkedin, href: "https://www.linkedin.com/company/thynxai-prvate-limited/", label: "LinkedIn" },
    { icon: SiInstagram, href: "https://www.instagram.com/thynx.ai/", label: "Instagram" },
  ];

  return (
    <footer className="relative bg-black py-6 border-t border-gray-800/50" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center" data-testid="link-footer-logo">
            <img src={companyLogo} alt="Thynx AI" className="h-8 w-auto" />
          </Link>

          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-all"
                data-testid={`link-footer-social-${social.label.toLowerCase()}`}
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-800/30 text-center md:text-left">
          <p className="text-gray-500 text-xs text-center">
            ThynxAi Pvt. Limited © {new Date().getFullYear()}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
