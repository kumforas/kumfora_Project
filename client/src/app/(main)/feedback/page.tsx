"use client";

import { useState } from "react";
import { Mail, Send, Star, MessageSquareHeart, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Input";
import { useFormSubmission } from "@/hooks/useFormSubmission";

export default function FeedbackPage() {
  const { status, error: submitError, warnings, submit, reset } = useFormSubmission("/api/feedback");
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Please enter a valid email";
    if (rating === 0) newErrors.rating = "Please select a rating";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const ok = await submit({ ...formData, rating });
    if (ok) {
      setFormData({ name: "", email: "", message: "" });
      setRating(0);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  if (status === "success") {
    return (
      <main className="pt-16">
        <section className="min-h-[50vh] sm:min-h-[70vh] flex items-center justify-center bg-kumfora-cream/30">
          <div className="container-narrow text-center py-8 sm:py-16">
            <div className="w-20 h-20 rounded-full bg-kumfora-blush flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-kumfora-hotPink" />
            </div>
            <h1 className="text-display-lg font-heading font-bold text-kumfora-charcoal mb-4">
              Thank You for Your Feedback!
            </h1>
            {warnings.length > 0 && (
              <div className="mb-6 p-4 rounded-xl bg-kumfora-gold/10 border border-kumfora-gold/20 max-w-md mx-auto">
                <p className="text-body-sm text-kumfora-charcoal">
                  Saved successfully, but some secondary syncs had issues:
                </p>
                <ul className="mt-2 text-caption text-kumfora-gray list-disc list-inside">
                  {warnings.map((w, i) => <li key={i}>{w}</li>)}
                </ul>
              </div>
            )}
            <p className="text-body-lg text-kumfora-gray mb-8 max-w-md mx-auto">
              Your feedback helps us improve Kumfora. We truly appreciate you taking the time to share your thoughts.
            </p>
            <Button onClick={() => { reset(); setRating(0); setFormData({ name: "", email: "", message: "" }); }}>
              Submit Another Feedback
            </Button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="pt-16">
      <section className="relative min-h-[40vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-kumfora-cream" aria-hidden="true" />
        <div className="container-main relative z-10 py-12 lg:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-kumfora-blush flex items-center justify-center mx-auto mb-6">
              <MessageSquareHeart className="w-8 h-8 text-kumfora-hotPink" />
            </div>
            <h1 className="text-display-xl font-display font-medium text-kumfora-charcoal mb-4">
              Share Your <span className="text-kumfora-hotPink">Feedback</span>
            </h1>
            <p className="text-body-lg text-kumfora-slate">
              Your opinion matters! Help us make Kumfora better for you.
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-16 lg:py-24 bg-kumfora-cream/30">
        <div className="container-narrow">
          <div className="card p-8 sm:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <Input
                  label="Name"
                  placeholder="Your name"
                  required
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  error={errors.name}
                />
                <Input
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  leftIcon={<Mail className="w-5 h-5" />}
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  error={errors.email}
                />
              </div>

              <div>
                <label className="label">
                  Rating <span className="text-kumfora-rose ml-1" aria-hidden="true">*</span>
                </label>
                <div className="flex items-center gap-1" role="radiogroup" aria-label="Rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => { setRating(star); if (errors.rating) setErrors((prev) => ({ ...prev, rating: "" })); }}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="p-1 transition-transform hover:scale-110"
                      aria-label={`${star} star${star > 1 ? "s" : ""}`}
                    >
                      <Star
                        className={`w-8 h-8 transition-colors ${
                          star <= (hoveredRating || rating)
                            ? "fill-kumfora-gold text-kumfora-gold"
                            : "text-kumfora-lightGray"
                        }`}
                      />
                    </button>
                  ))}
                  {rating > 0 && (
                    <span className="ml-2 text-body-sm text-kumfora-gray">
                      {rating === 1 && "Poor"}
                      {rating === 2 && "Fair"}
                      {rating === 3 && "Good"}
                      {rating === 4 && "Very Good"}
                      {rating === 5 && "Excellent"}
                    </span>
                  )}
                </div>
                {errors.rating && (
                  <p className="mt-1.5 text-body-sm text-kumfora-rose" role="alert">{errors.rating}</p>
                )}
              </div>

              <Textarea
                label="Message"
                placeholder="Tell us about your experience with Kumfora..."
                rows={5}
                required
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                error={errors.message}
              />

              {status === "error" && (
                <div className="p-4 rounded-xl bg-kumfora-rose/10 border border-kumfora-rose/20" role="alert">
                  <p className="text-body-sm text-kumfora-rose">{submitError}</p>
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                isLoading={status === "loading"}
                className="w-full sm:w-auto"
                leftIcon={<Send className="w-5 h-5" />}
              >
                Submit Feedback
              </Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
