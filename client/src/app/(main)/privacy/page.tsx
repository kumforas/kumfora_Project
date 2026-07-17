"use client";

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

export default function PrivacyPage() {
  return (
    <main className="pt-12 min-h-screen bg-kumfora-cream/30">
      <header className="bg-white border-b border-kumfora-lightGray/50 pt-16 pb-12">
        <div className="container-main max-w-3xl">
          <nav
            className="flex items-center gap-2 text-body-sm text-kumfora-gray mb-4"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-kumfora-hotPink">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span
              className="text-kumfora-charcoal font-medium"
              aria-current="page"
            >
              Privacy Policy
            </span>
          </nav>
          <h1 className="text-display-lg font-display font-medium text-kumfora-charcoal">
            Privacy Policy
          </h1>
          <p className="text-body text-kumfora-gray mt-2">
            Last updated: July 2026
          </p>
        </div>
      </header>

      <div className="container-main py-12 max-w-3xl">
        <div className="prose space-y-8">
          <section>
            <h2 className="text-heading-lg font-display font-medium text-kumfora-charcoal mb-3">
              1. Information We Collect
            </h2>
            <p className="text-body text-kumfora-slate leading-relaxed">
              We collect information you provide directly, including your name,
              email address, phone number, shipping address, and payment
              information when you place an order or create an account.
            </p>
          </section>

          <section>
            <h2 className="text-heading-lg font-display font-medium text-kumfora-charcoal mb-3">
              2. How We Use Your Information
            </h2>
            <p className="text-body text-kumfora-slate leading-relaxed">
              We use your information to process orders, send order updates,
              provide customer support, improve our products and services, and
              send marketing communications (with your consent).
            </p>
          </section>

          <section>
            <h2 className="text-heading-lg font-display font-medium text-kumfora-charcoal mb-3">
              3. Information Sharing
            </h2>
            <p className="text-body text-kumfora-slate leading-relaxed">
              We do not sell or rent your personal information to third parties.
              We may share your information with trusted service providers who
              help us operate our business, such as payment processors and
              shipping carriers.
            </p>
          </section>

          <section>
            <h2 className="text-heading-lg font-display font-medium text-kumfora-charcoal mb-3">
              4. Data Security
            </h2>
            <p className="text-body text-kumfora-slate leading-relaxed">
              We implement appropriate security measures to protect your
              personal information. However, no method of transmission over the
              internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-heading-lg font-display font-medium text-kumfora-charcoal mb-3">
              5. Your Rights
            </h2>
            <p className="text-body text-kumfora-slate leading-relaxed">
              You have the right to access, correct, or delete your personal
              information. You can manage your account information through your
              account settings page.
            </p>
          </section>

          <section>
            <h2 className="text-heading-lg font-display font-medium text-kumfora-charcoal mb-3">
              6. Contact Us
            </h2>
            <p className="text-body text-kumfora-slate leading-relaxed">
              If you have questions about this Privacy Policy, please contact
              us:
            </p>
            <div className="mt-4 space-y-2 text-body text-kumfora-slate">
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-kumfora-hotPink" />{" "}
                care@kumfora.com
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-kumfora-hotPink" /> +91 708 016
                3349
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-kumfora-hotPink" /> Fatehpur,
                UP, India
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
