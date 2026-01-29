import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Lock, Mail, Phone, User, MessageSquare, Calendar, Trash2, Eye, ArrowLeft, KeyRound, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ContactSubmission, Subscriber } from "@shared/schema";
import { format } from "date-fns";

function PinInput({ 
  value, 
  onChange, 
  disabled 
}: { 
  value: string; 
  onChange: (val: string) => void; 
  disabled?: boolean;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 4);
    onChange(val);
  };

  return (
    <div className="flex gap-2 justify-center">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="w-12 h-14 border-2 border-gray-700 rounded-lg flex items-center justify-center bg-gray-900 text-2xl font-bold text-white"
        >
          {value[i] ? "•" : ""}
        </div>
      ))}
      <Input
        type="text"
        inputMode="numeric"
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className="absolute opacity-0 w-0 h-0"
        autoFocus
        data-testid="input-admin-pin"
      />
    </div>
  );
}

function PinSetup({ onSuccess }: { onSuccess: (token?: string) => void }) {
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [step, setStep] = useState<"enter" | "confirm">("enter");
  const { toast } = useToast();
  const hasSubmitted = useRef(false);

  const setMutation = useMutation({
    mutationFn: async (pin: string) => {
      const res = await apiRequest("POST", "/api/admin/set-pin", { pin });
      return res.json();
    },
    onSuccess: (data: { success: boolean; csrfToken?: string }) => {
      toast({ title: "PIN Set", description: "Your admin PIN has been set successfully." });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/pin-status"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/auth-status"] });
      onSuccess(data.csrfToken);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to set PIN.", variant: "destructive" });
      hasSubmitted.current = false;
    },
  });

  useEffect(() => {
    if (step === "enter" && pin.length === 4) {
      setStep("confirm");
    }
  }, [pin, step]);

  useEffect(() => {
    if (step === "confirm" && confirmPin.length === 4 && !hasSubmitted.current) {
      if (pin === confirmPin) {
        hasSubmitted.current = true;
        setMutation.mutate(pin);
      } else {
        toast({ title: "PIN Mismatch", description: "PINs do not match. Please try again.", variant: "destructive" });
        setPin("");
        setConfirmPin("");
        setStep("enter");
      }
    }
  }, [confirmPin, step, pin]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-900 border-gray-800">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-fuchsia-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl text-white" data-testid="text-pin-title">
            {step === "enter" ? "Set Admin PIN" : "Confirm PIN"}
          </CardTitle>
          <CardDescription className="text-gray-400">
            {step === "enter" 
              ? "Create a 4-digit PIN to secure the admin panel" 
              : "Enter the PIN again to confirm"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div 
            className="cursor-pointer" 
            onClick={() => document.querySelector<HTMLInputElement>('[data-testid="input-admin-pin"]')?.focus()}
          >
            <PinInput 
              value={step === "enter" ? pin : confirmPin} 
              onChange={step === "enter" ? setPin : setConfirmPin}
              disabled={setMutation.isPending}
            />
          </div>
          <p className="text-center text-gray-500 text-sm mt-4">
            Tap to enter your PIN
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function PinLogin({ onSuccess }: { onSuccess: (token?: string) => void }) {
  const [pin, setPin] = useState("");
  const { toast } = useToast();
  const hasSubmitted = useRef(false);

  const verifyMutation = useMutation({
    mutationFn: async (pin: string) => {
      const res = await apiRequest("POST", "/api/admin/verify-pin", { pin });
      return res.json();
    },
    onSuccess: (data: { valid: boolean; csrfToken?: string }) => {
      if (data.valid) {
        queryClient.invalidateQueries({ queryKey: ["/api/admin/auth-status"] });
        onSuccess(data.csrfToken);
      } else {
        toast({ title: "Invalid PIN", description: "The PIN you entered is incorrect.", variant: "destructive" });
        setPin("");
        hasSubmitted.current = false;
      }
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to verify PIN.", variant: "destructive" });
      hasSubmitted.current = false;
    },
  });

  useEffect(() => {
    if (pin.length === 4 && !hasSubmitted.current) {
      hasSubmitted.current = true;
      verifyMutation.mutate(pin);
    }
  }, [pin]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-900 border-gray-800">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-fuchsia-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl text-white" data-testid="text-pin-login-title">
            Admin Access
          </CardTitle>
          <CardDescription className="text-gray-400">
            Enter your 4-digit PIN to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div 
            className="cursor-pointer" 
            onClick={() => document.querySelector<HTMLInputElement>('[data-testid="input-admin-pin"]')?.focus()}
          >
            <PinInput 
              value={pin} 
              onChange={setPin}
              disabled={verifyMutation.isPending}
            />
          </div>
          <p className="text-center text-gray-500 text-sm mt-4">
            Tap to enter your PIN
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function SubmissionCard({ submission, onMarkRead, onDelete }: { 
  submission: ContactSubmission; 
  onMarkRead: () => void;
  onDelete: () => void;
}) {
  return (
    <Card 
      className={`bg-gray-900 border-gray-800 ${!submission.read ? 'border-l-4 border-l-fuchsia-500' : ''}`}
      data-testid={`card-submission-${submission.id}`}
    >
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <h3 className="text-lg font-semibold text-white" data-testid={`text-name-${submission.id}`}>
                  {submission.name}
                </h3>
                {!submission.read && (
                  <Badge variant="secondary" className="bg-fuchsia-500/20 text-fuchsia-400">
                    New
                  </Badge>
                )}
              </div>
              {submission.subject && (
                <p className="text-gray-400 font-medium mb-2" data-testid={`text-subject-${submission.id}`}>
                  {submission.subject}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              {!submission.read && (
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={onMarkRead}
                  className="text-gray-400 hover:text-white"
                  data-testid={`button-mark-read-${submission.id}`}
                >
                  <Eye className="w-4 h-4" />
                </Button>
              )}
              <Button
                size="icon"
                variant="ghost"
                onClick={onDelete}
                className="text-gray-400 hover:text-red-400"
                data-testid={`button-delete-${submission.id}`}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <p className="text-gray-300 whitespace-pre-wrap" data-testid={`text-message-${submission.id}`}>
            {submission.message}
          </p>

          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <span data-testid={`text-email-${submission.id}`}>{submission.email}</span>
            </div>
            {submission.phone && (
              <div className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                <span data-testid={`text-phone-${submission.id}`}>{submission.phone}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span data-testid={`text-date-${submission.id}`}>
                {submission.submittedAt ? format(new Date(submission.submittedAt), "MMM d, yyyy 'at' h:mm a") : "Unknown"}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function SubscriberCard({ subscriber, onDelete }: { 
  subscriber: Subscriber; 
  onDelete: () => void;
}) {
  return (
    <Card 
      className="bg-gray-900 border-gray-800"
      data-testid={`card-subscriber-${subscriber.id}`}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-fuchsia-500/20 rounded-full flex items-center justify-center">
              <Mail className="w-5 h-5 text-fuchsia-400" />
            </div>
            <div>
              <p className="text-white font-medium" data-testid={`text-subscriber-email-${subscriber.id}`}>
                {subscriber.email}
              </p>
              <p className="text-sm text-gray-500" data-testid={`text-subscriber-date-${subscriber.id}`}>
                Subscribed {subscriber.subscribedAt ? format(new Date(subscriber.subscribedAt), "MMM d, yyyy 'at' h:mm a") : "Unknown"}
              </p>
            </div>
          </div>
          <Button
            size="icon"
            variant="ghost"
            onClick={onDelete}
            className="text-gray-400 hover:text-red-400"
            data-testid={`button-delete-subscriber-${subscriber.id}`}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function AdminDashboard({ csrfToken, onResetPin }: { csrfToken: string; onResetPin: () => void }) {
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const handleBackToHome = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const { data: submissions = [], isLoading: submissionsLoading } = useQuery<ContactSubmission[]>({
    queryKey: ["/api/admin/contact-submissions"],
  });

  const { data: subscribersList = [], isLoading: subscribersLoading } = useQuery<Subscriber[]>({
    queryKey: ["/api/admin/subscribers"],
  });

  const resetPinMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/admin/reset-pin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to reset PIN");
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "PIN Reset", description: "You can now set a new PIN." });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/pin-status"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/auth-status"] });
      onResetPin();
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to reset PIN.", variant: "destructive" });
    },
  });

  const markReadMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/admin/contact-submissions/${id}/read`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to mark as read");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/contact-submissions"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/admin/contact-submissions/${id}`, {
        method: "DELETE",
        headers: {
          "X-CSRF-Token": csrfToken,
        },
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete");
    },
    onSuccess: () => {
      toast({ title: "Deleted", description: "Contact submission has been deleted." });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/contact-submissions"] });
    },
  });

  const deleteSubscriberMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/admin/subscribers/${id}`, {
        method: "DELETE",
        headers: {
          "X-CSRF-Token": csrfToken,
        },
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete subscriber");
    },
    onSuccess: () => {
      toast({ title: "Deleted", description: "Subscriber has been removed." });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/subscribers"] });
    },
  });

  const unreadCount = submissions.filter(s => !s.read).length;

  return (
    <div className="min-h-screen bg-black">
      <header className="border-b border-gray-800 p-4 sticky top-0 bg-black/95 backdrop-blur z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBackToHome}
              data-testid="button-back-home"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-white" data-testid="text-admin-title">
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-400">
                Manage submissions and subscribers
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => resetPinMutation.mutate()}
            disabled={resetPinMutation.isPending}
            data-testid="button-reset-pin"
          >
            <KeyRound className="w-4 h-4 mr-2" />
            Reset PIN
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        <Tabs defaultValue="contacts" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-900 mb-6">
            <TabsTrigger value="contacts" className="data-[state=active]:bg-fuchsia-500" data-testid="tab-contacts">
              <MessageSquare className="w-4 h-4 mr-2" />
              Contacts ({submissions.length})
            </TabsTrigger>
            <TabsTrigger value="subscribers" className="data-[state=active]:bg-fuchsia-500" data-testid="tab-subscribers">
              <Users className="w-4 h-4 mr-2" />
              Subscribers ({subscribersList.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="contacts">
            {submissionsLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin w-8 h-8 border-2 border-fuchsia-500 border-t-transparent rounded-full" />
              </div>
            ) : submissions.length === 0 ? (
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-12 text-center">
                  <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">No Submissions Yet</h3>
                  <p className="text-gray-400">
                    Contact form submissions will appear here when users fill out the form.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-gray-400 mb-2">{unreadCount} unread</p>
                {submissions.map((submission) => (
                  <SubmissionCard
                    key={submission.id}
                    submission={submission}
                    onMarkRead={() => markReadMutation.mutate(submission.id)}
                    onDelete={() => deleteMutation.mutate(submission.id)}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="subscribers">
            {subscribersLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin w-8 h-8 border-2 border-fuchsia-500 border-t-transparent rounded-full" />
              </div>
            ) : subscribersList.length === 0 ? (
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-12 text-center">
                  <Users className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">No Subscribers Yet</h3>
                  <p className="text-gray-400">
                    Newsletter subscribers will appear here when users subscribe.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {subscribersList.map((subscriber) => (
                  <SubscriberCard
                    key={subscriber.id}
                    subscriber={subscriber}
                    onDelete={() => deleteSubscriberMutation.mutate(subscriber.id)}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [csrfToken, setCsrfToken] = useState<string>("");

  const { data: pinStatus, isLoading: pinLoading } = useQuery<{ isSet: boolean }>({
    queryKey: ["/api/admin/pin-status"],
  });

  const { data: authStatus, isLoading: authLoading } = useQuery<{ authenticated: boolean; csrfToken?: string }>({
    queryKey: ["/api/admin/auth-status"],
  });

  useEffect(() => {
    if (authStatus?.csrfToken) {
      setCsrfToken(authStatus.csrfToken);
    }
  }, [authStatus]);

  const isLoading = pinLoading || authLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-fuchsia-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!pinStatus?.isSet) {
    return <PinSetup onSuccess={(token) => {
      setCsrfToken(token || "");
      setAuthenticated(true);
    }} />;
  }

  if (!authenticated && !authStatus?.authenticated) {
    return <PinLogin onSuccess={(token) => {
      setCsrfToken(token || "");
      setAuthenticated(true);
    }} />;
  }

  const handleResetPin = () => {
    setAuthenticated(false);
    setCsrfToken("");
  };

  return <AdminDashboard csrfToken={csrfToken || authStatus?.csrfToken || ""} onResetPin={handleResetPin} />;
}
