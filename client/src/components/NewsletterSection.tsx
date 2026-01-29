import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ScrollReveal from "@/components/ScrollReveal";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const { toast } = useToast();

  const subscribeMutation = useMutation({
    mutationFn: async (email: string) => {
      const res = await apiRequest("POST", "/api/subscribers", { email });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to subscribe");
      }
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
      setEmail("");
      setAgreed(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Subscription Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      toast({
        title: "Agreement Required",
        description: "Please agree to the Privacy Policy to subscribe.",
        variant: "destructive",
      });
      return;
    }
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }
    subscribeMutation.mutate(email);
  };

  return (
    <section className="relative py-16 sm:py-32 lg:py-40 bg-black overflow-hidden" data-testid="section-newsletter">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span
          className="text-[4rem] sm:text-[8rem] md:text-[14rem] lg:text-[18rem] font-bold tracking-tight"
          style={{
            WebkitTextStroke: "1px rgba(255,255,255,0.15)",
            WebkitTextFillColor: "transparent",
          }}
        >
          Newsletter
        </span>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-8 mt-12 sm:mt-24">
          <div className="space-y-3 sm:space-y-6">
            <ScrollReveal>
              <Input
                type="email"
                placeholder="Enter Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent border-0 border-b border-gray-700 rounded-none py-3 sm:py-6 px-0 text-base sm:text-lg text-white placeholder:text-gray-600 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-b focus-visible:border-fuchsia-400 transition-colors text-center shadow-none outline-none"
                data-testid="input-newsletter-email"
              />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <Button
                type="submit"
                variant="ghost"
                disabled={subscribeMutation.isPending}
                className="flex items-center justify-center gap-2 sm:gap-3 text-white hover:text-fuchsia-400 hover:bg-transparent mx-auto text-sm sm:text-base"
                data-testid="button-newsletter-submit"
              >
                {subscribeMutation.isPending ? (
                  <Loader2 className="w-4 sm:w-5 h-4 sm:h-5 animate-spin" />
                ) : (
                  <Mail className="w-4 sm:w-5 h-4 sm:h-5" />
                )}
                <span>{subscribeMutation.isPending ? "Subscribing..." : "Subscribe"}</span>
              </Button>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.2}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2 sm:gap-3">
              <Checkbox
                id="privacy"
                checked={agreed}
                onCheckedChange={(checked) => setAgreed(checked as boolean)}
                className="border-gray-600 data-[state=checked]:bg-fuchsia-500 data-[state=checked]:border-fuchsia-500"
                data-testid="checkbox-newsletter-privacy"
              />
              <label htmlFor="privacy" className="text-xs sm:text-sm text-gray-500">
                I agree to the{" "}
                <a href="#" className="text-white underline hover:text-fuchsia-400 transition-colors">
                  Privacy Policy
                </a>
                .
              </label>
            </div>
          </ScrollReveal>
        </form>
      </div>
    </section>
  );
}
