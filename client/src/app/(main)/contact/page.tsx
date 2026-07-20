"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Truck,
  Shield,
  RotateCcw,
  CheckCircle,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Input";
import { useFormSubmission } from "@/hooks/useFormSubmission";

export default function ContactPage() {
  const {
    status,
    error: submitError,
    warnings,
    submit,
    reset,
  } = useFormSubmission("/api/contact");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    orderNumber: "",
    topic: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Please enter a valid email";
    if (formData.phone && !/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Phone must be exactly 10 digits";
    if (!formData.topic) newErrors.topic = "Please select a topic";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const ok = await submit({
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      order_number: formData.orderNumber || undefined,
      topic: formData.topic,
      message: formData.message,
    });
    if (ok) {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        orderNumber: "",
        topic: "",
        message: "",
      });
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
          <div className="container-narrow text-center py-10 sm:py-16">
            <div className="w-20 h-20 rounded-full bg-kumfora-blush flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-kumfora-hotPink" />
            </div>
            <h1 className="text-display-lg font-heading font-bold text-kumfora-charcoal mb-4">
              Message Sent!
            </h1>
            {warnings.length > 0 && (
              <div className="mb-6 p-4 rounded-xl bg-kumfora-gold/10 border border-kumfora-gold/20 max-w-md mx-auto">
                <p className="text-body-sm text-kumfora-charcoal">
                  Saved successfully, but some secondary syncs had issues:
                </p>
                <ul className="mt-2 text-caption text-kumfora-gray list-disc list-inside">
                  {warnings.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
              </div>
            )}
            <p className="text-body-lg text-kumfora-gray mb-8 max-w-md mx-auto">
              Thank you for reaching out! Our care team will get back to you
              within 24 hours.
            </p>
            <Button onClick={() => reset()}>Send Another Message</Button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="relative min-h-[30vh] sm:min-h-[40vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-kumfora-cream" aria-hidden="true" />

        <div className="container-main relative z-10 py-12 lg:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-display-xl font-display font-medium text-kumfora-charcoal mb-4">
              We&apos;d Love to{" "}
              <span className="text-kumfora-terracotta">Hear from You</span>
            </h1>
            <p className="text-body-lg text-kumfora-slate">
              Questions about products, orders, or periods? Our care team
              responds within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-12 bg-white border-b border-kumfora-lightGray/50">
        <div className="container-main">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Mail,
                title: "Email Us",
                desc: "support@kumfora.com",
                action: "Typically replies within 24 hrs",
              },
              {
                icon: Phone,
                title: "Call Us",
                desc: "+91 7355413565",
                action: "Mon-Fri, 10 AM - 6 PM IST",
              },
              {
                icon: MapPin,
                title: "Write to Us",
                desc: "Fatehpur, UP (212655), India",
                action: "We love handwritten letters!",
              },
            ].map((item) => (
              <Link
                key={item.title}
                href={
                  item.title === "Email Us"
                    ? "mailto:support@kumfora.com"
                    : item.title === "Call Us"
                      ? "tel:+917080163349"
                      : "#"
                }
                className="card p-6 text-center hover:shadow-card-hover transition-shadow"
              >
                <div className="w-14 h-14 rounded-xl bg-kumfora-blush flex items-center justify-center mx-auto mb-4">
                  <item.icon
                    className="w-7 h-7 text-kumfora-terracotta"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-heading-md font-display font-medium text-kumfora-charcoal mb-1">
                  {item.title}
                </h3>
                <p className="text-body text-kumfora-slate mb-1">{item.desc}</p>
                <p className="text-body-sm text-kumfora-gray">{item.action}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section
        className="py-10 sm:py-16 lg:py-24 bg-kumfora-cream/30"
        aria-labelledby="contact-form"
      >
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            <div>
              <h2
                id="contact-form"
                className="text-display-lg font-display font-medium text-kumfora-charcoal mb-6"
              >
                Send Us a{" "}
                <span className="text-kumfora-terracotta">Message</span>
              </h2>
              <p className="text-body-lg text-kumfora-slate mb-8">
                Fill out the form and we&apos;ll get back to you as soon as
                possible. For order-related queries, please include your order
                number.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <Input
                    label="First Name"
                    placeholder="Priya"
                    required
                    value={formData.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    error={errors.firstName}
                    leftIcon={<User className="w-5 h-5" />}
                  />
                  <Input
                    label="Last Name"
                    placeholder="Sharma"
                    required
                    value={formData.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    error={errors.lastName}
                  />
                </div>
                <Input
                  label="Email"
                  type="email"
                  placeholder="priya@example.com"
                  required
                  leftIcon={<Mail className="w-5 h-5" />}
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  error={errors.email}
                />
                <Input
                  label="Phone"
                  type="number"
                  placeholder="9876543210"
                  leftIcon={<Phone className="w-5 h-5" />}
                  value={formData.phone}
                  onChange={(e) =>
                    handleChange(
                      "phone",
                      e.target.value.replace(/\D/g, "").slice(0, 10),
                    )
                  }
                  error={errors.phone}
                />
                <Input
                  label="Order Number (Optional)"
                  placeholder="KMF-ORD-12345"
                  value={formData.orderNumber}
                  onChange={(e) => handleChange("orderNumber", e.target.value)}
                />
                <div>
                  <select
                    className="input"
                    required
                    value={formData.topic}
                    onChange={(e) => handleChange("topic", e.target.value)}
                  >
                    <option value="">Select Topic</option>
                    <option value="order">Order Inquiry</option>
                    <option value="product">Product Question</option>
                    <option value="shipping">Shipping & Delivery</option>
                    <option value="returns">Returns & Exchange</option>
                    <option value="period">Period Advice</option>
                    <option value="wholesale">Wholesale / Partnership</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.topic && (
                    <p
                      className="mt-1.5 text-body-sm text-kumfora-rose"
                      role="alert"
                    >
                      {errors.topic}
                    </p>
                  )}
                </div>
                <Textarea
                  label="Message"
                  placeholder="Tell us how we can help..."
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  error={errors.message}
                />

                {status === "error" && (
                  <div
                    className="p-4 rounded-xl bg-kumfora-rose/10 border border-kumfora-rose/20"
                    role="alert"
                  >
                    <p className="text-body-sm text-kumfora-rose">
                      {submitError}
                    </p>
                  </div>
                )}

                {warnings.length > 0 && (
                  <div className="p-4 rounded-xl bg-kumfora-gold/10 border border-kumfora-gold/20">
                    <p className="text-body-sm text-kumfora-charcoal mb-1">
                      Message saved, but some secondary syncs had issues:
                    </p>
                    <ul className="text-caption text-kumfora-gray list-disc list-inside">
                      {warnings.map((w, i) => (
                        <li key={i}>{w}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  isLoading={status === "loading"}
                  className="w-full sm:w-auto"
                  leftIcon={<Send className="w-5 h-5" />}
                >
                  Send Message
                </Button>
              </form>
            </div>

            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24 card p-5 sm:p-8 space-y-6 sm:space-y-8">
                <div>
                  <h3 className="text-heading-md sm:text-heading-lg font-display font-medium text-kumfora-charcoal mb-4">
                    Quick Answers
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        icon: Truck,
                        q: "Where's my order?",
                        a: "Track it in your account or use the tracking link from your email.",
                      },
                      {
                        icon: RotateCcw,
                        q: "Need to return?",
                        a: "Go to My Orders → Return Items. Free pickup for sealed packs.",
                      },
                      {
                        icon: Shield,
                        q: "Product question?",
                        a: "Check our FAQs or Period Guide for detailed info.",
                      },
                    ].map((item) => (
                      <div key={item.q} className="flex gap-3">
                        <div className="w-10 h-10 rounded-lg bg-kumfora-blush flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-5 h-5 text-kumfora-terracotta" />
                        </div>
                        <div>
                          <p className="font-medium text-kumfora-charcoal">
                            {item.q}
                          </p>
                          <p className="text-body-sm text-kumfora-gray">
                            {item.a}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-kumfora-lightGray/50">
                  <h3 className="text-heading-md sm:text-heading-lg font-display font-medium text-kumfora-charcoal mb-4">
                    Business Hours
                  </h3>
                  <div className="space-y-3 text-body-sm sm:text-body text-kumfora-slate">
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5 sm:gap-0">
                      <span>Monday - Friday</span>
                      <span className="font-medium">
                        10:00 AM - 6:00 PM IST
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5 sm:gap-0">
                      <span>Saturday</span>
                      <span className="font-medium">
                        10:00 AM - 2:00 PM IST
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5 sm:gap-0">
                      <span>Sunday</span>
                      <span className="font-medium text-kumfora-gray">
                        Closed
                      </span>
                    </div>
                  </div>
                  <p className="text-body-sm text-kumfora-gray mt-4">
                    Emails received outside business hours will be answered the
                    next business day.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section
        className="py-10 sm:py-16 lg:py-24 bg-kumfora-charcoal"
        aria-labelledby="newsletter-heading"
      >
        <div className="container-main">
          <div className="max-w-md mx-auto text-center">
            <h3
              id="newsletter-heading"
              className="text-heading-lg font-display font-medium text-kumfora-white mb-2"
            >
              Join the Kumfora Circle
            </h3>
            <p className="text-body text-kumfora-rose/70 mb-6">
              Get period tips, exclusive offers, and first access to new
              products.
            </p>
            <ContactNewsletter />
            <p className="text-caption text-kumfora-rose/50 mt-3">
              By subscribing, you agree to our{" "}
              <a href="/privacy" className="underline hover:text-kumfora-white">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function ContactNewsletter() {
  const {
    status,
    error: submitError,
    submit,
  } = useFormSubmission("/api/newsletter");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await submit({ email });
    if (ok) setEmail("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3"
      aria-label="Newsletter signup"
    >
      <label htmlFor="contact-email" className="sr-only">
        Email address
      </label>
      <input
        id="contact-email"
        type="email"
        placeholder="Enter your email"
        className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-kumfora-white placeholder:text-kumfora-rose/50 focus:border-kumfora-coral focus:ring-2 focus:ring-kumfora-blush focus:outline-none"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={status === "loading" || status === "success"}
      />
      <Button
        type="submit"
        className="whitespace-nowrap"
        isLoading={status === "loading"}
        disabled={status === "success"}
      >
        {status === "success" ? "Subscribed!" : "Subscribe"}
      </Button>
      {status === "error" && (
        <p className="text-body-sm text-kumfora-rose sm:col-span-2">
          {submitError}
        </p>
      )}
    </form>
  );
}
