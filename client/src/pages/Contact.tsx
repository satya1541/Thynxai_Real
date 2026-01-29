import { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { User, Phone, Mail, MessageSquare, Send, PenLine, Loader2 } from "lucide-react";
import { LucideIcon } from "lucide-react";
import robotImage from "@assets/generated_images/cute_robot_outdoor_night_scene.webp";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

interface AnimatedInputProps {
  icon: LucideIcon;
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isTextarea?: boolean;
  testId: string;
}

function AnimatedInput({ 
  icon: Icon, 
  label, 
  name, 
  type = "text", 
  value, 
  onChange, 
  isTextarea = false,
  testId 
}: AnimatedInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  
  const isActive = isFocused || value.length > 0;

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const inputClasses = `
    w-full bg-transparent border-0 text-white pt-5 pb-2 pl-10 pr-4
    focus:outline-none focus:ring-0
    transition-colors duration-300 ease-out
    ${isTextarea ? 'min-h-[100px] resize-none' : 'h-12'}
  `;

  return (
    <div 
      className={`
        relative cursor-text group rounded-lg px-3 py-2 -mx-3
        transition-all duration-300 ease-out
        ${isHovered && !isFocused ? 'bg-gray-800/50' : 'bg-transparent'}
        ${isFocused ? 'bg-gray-800/70 shadow-lg shadow-cyan-500/10' : ''}
      `}
      onClick={handleContainerClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Icon 
        className={`
          absolute left-3 w-5 h-5 z-10
          transition-all duration-300 ease-out
          ${isTextarea ? 'top-8' : 'top-1/2 -translate-y-1/2'}
          ${isActive 
            ? 'text-cyan-400 scale-110 opacity-100' 
            : isHovered 
              ? 'text-cyan-300/70 scale-105 opacity-90'
              : 'text-gray-500 scale-100 opacity-70'
          }
        `}
      />
      
      <label 
        className={`
          absolute left-13 pointer-events-none
          transition-all duration-300 ease-out
          ${isActive
            ? 'top-2 text-xs text-cyan-400 font-medium'
            : `${isTextarea ? 'top-8' : 'top-1/2 -translate-y-1/2'} text-base ${isHovered ? 'text-gray-400' : 'text-gray-500'}`
          }
        `}
        style={{ left: '2.75rem' }}
      >
        {label}
      </label>

      {isTextarea ? (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={inputClasses}
          data-testid={testId}
        />
      ) : (
        <input
          ref={inputRef as React.RefObject<HTMLInputElement>}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={inputClasses}
          data-testid={testId}
        />
      )}

      <div 
        className={`
          absolute bottom-0 left-3 right-3 h-px 
          transition-all duration-300 ease-out
          ${isHovered && !isActive ? 'bg-gray-600' : 'bg-gray-700'}
        `}
      />
      
      <div 
        className={`
          absolute bottom-0 left-1/2 h-px bg-cyan-400
          transition-all duration-300 ease-out
          ${isActive ? 'w-[calc(100%-1.5rem)] -translate-x-1/2' : isHovered ? 'w-8 -translate-x-1/2 opacity-50' : 'w-0 -translate-x-1/2'}
        `}
      />
    </div>
  );
}

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const submitMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const res = await apiRequest("POST", "/api/contact", data);
      return res.json();
    },
    onSuccess: () => {
      toast({ 
        title: "Message Sent", 
        description: "Thank you for reaching out! We'll get back to you soon." 
      });
      setFormData({
        name: "",
        phone: "",
        email: "",
        subject: "",
        message: "",
      });
    },
    onError: () => {
      toast({ 
        title: "Error", 
        description: "Failed to send message. Please try again.", 
        variant: "destructive" 
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({ 
        title: "Missing Fields", 
        description: "Please fill in name, email, and message.", 
        variant: "destructive" 
      });
      return;
    }
    submitMutation.mutate(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      number: "01",
      title: "+91-904-01-98-628",
      href: "tel:+919040198628",
      type: "link" as const,
    },
    {
      number: "02",
      title: "Plot NO.: 2762, Brahmeswar Patna,",
      subtitle: "Bhubaneswar, Odisha, India, 751018",
      type: "text" as const,
    },
    {
      number: "03",
      title: "Info@thynxai.com",
      href: "mailto:Info@thynxai.com",
      type: "link" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 pt-24">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-16" data-testid="heading-contacts">
          Contacts
        </h1>

        <div className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Have a <span className="text-cyan-400">cool project?</span>
          </h2>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Get in touch!
          </h2>

          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none overflow-hidden">
              <img
                src={robotImage}
                alt="AI Robot Assistant"
                loading="lazy"
                className="w-full h-full object-cover min-h-[300px] lg:min-h-[550px]"
                data-testid="img-contact-hero"
              />
            </div>

            <div className="lg:w-1/2 flex">
              <div className="bg-gray-900 rounded-b-lg lg:rounded-r-lg lg:rounded-bl-none p-8 border border-gray-800/50 border-t-0 lg:border-t lg:border-l-0 w-full flex flex-col justify-center">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <AnimatedInput
                    icon={User}
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    testId="input-name"
                  />

                  <AnimatedInput
                    icon={Phone}
                    label="Phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    testId="input-phone"
                  />

                  <AnimatedInput
                    icon={Mail}
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    testId="input-email"
                  />

                  <AnimatedInput
                    icon={MessageSquare}
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    testId="input-subject"
                  />

                  <AnimatedInput
                    icon={PenLine}
                    label="How can we help you? Feel free to get in touch!"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    isTextarea
                    testId="input-message"
                  />

                  <div className="pt-4">
                    <Button
                      type="submit"
                      disabled={submitMutation.isPending}
                      className="bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white px-8 py-3 rounded-full font-medium flex items-center gap-2"
                      data-testid="button-submit-contact"
                    >
                      {submitMutation.isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                      {submitMutation.isPending ? "Sending..." : "Get In Touch"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {contactInfo.map((info) => (
            <div
              key={info.number}
              className={`group relative text-center py-12 ${info.type === "link" ? "cursor-pointer" : ""}`}
              data-testid={`contact-info-${info.number}`}
            >
              <span className="absolute inset-0 flex items-center justify-center text-[120px] md:text-[160px] lg:text-[200px] font-bold text-gray-700/30 select-none pointer-events-none transition-all duration-500 translate-y-4 group-hover:translate-y-0 group-hover:text-gray-600/50">
                {info.number}
              </span>
              
              <div className="relative z-10 transition-transform duration-300 group-hover:-translate-y-2">
                {info.type === "link" ? (
                  <a 
                    href={info.href}
                    className="text-white font-medium text-lg hover:text-cyan-400 transition-colors"
                    data-testid={`link-contact-${info.number}`}
                  >
                    {info.title}
                  </a>
                ) : (
                  <div>
                    <p className="text-white font-medium text-lg">
                      {info.title}
                    </p>
                    {info.subtitle && (
                      <p className="text-white font-medium text-lg">
                        {info.subtitle}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
