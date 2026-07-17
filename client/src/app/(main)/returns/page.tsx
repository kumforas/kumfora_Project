"use client";

import Link from "next/link";
import { RotateCcw, CheckCircle, Clock } from "lucide-react";

export default function ReturnsPage() {
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
              Returns & Exchange
            </span>
          </nav>
          <h1 className="text-display-lg font-display font-medium text-kumfora-charcoal">
            Returns &amp; Exchange Policy
          </h1>
          <p className="text-body text-kumfora-gray mt-2">
            We want you to be happy with your purchase.
          </p>
        </div>
      </header>

      <div className="container-main py-12 max-w-3xl">
        <div className="space-y-8">
          <section>
            <h2 className="text-heading-lg font-display font-medium text-kumfora-charcoal mb-3">
              30-Day Return Policy
            </h2>
            <p className="text-body text-kumfora-slate leading-relaxed">
              We offer a hassle-free 30-day return policy. If you are not
              satisfied with your purchase, you can return it within 30 days of
              delivery for a full refund or exchange.
            </p>
          </section>

          <section>
            <h2 className="text-heading-lg font-display font-medium text-kumfora-charcoal mb-3">
              How to Return
            </h2>
            <div className="space-y-4">
              {[
                {
                  icon: CheckCircle,
                  title: "Contact us",
                  desc: "Email care@kumfora.com or call +91 800 123 4567 with your order ID.",
                },
                {
                  icon: Clock,
                  title: "Pack the item",
                  desc: "Place the unused product in its original packaging.",
                },
                {
                  icon: RotateCcw,
                  title: "Ship it back",
                  desc: "We will arrange a free pickup from your address.",
                },
                {
                  icon: CheckCircle,
                  title: "Get your refund",
                  desc: "Refund is processed within 5-7 business days of receiving the return.",
                },
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-kumfora-blush flex items-center justify-center shrink-0">
                    <step.icon className="w-4 h-4 text-kumfora-hotPink" />
                  </div>
                  <div>
                    <p className="text-body font-medium text-kumfora-charcoal">
                      {step.title}
                    </p>
                    <p className="text-body-sm text-kumfora-gray">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-heading-lg font-display font-medium text-kumfora-charcoal mb-3">
              Eligibility
            </h2>
            <ul className="list-disc list-inside space-y-2 text-body text-kumfora-slate leading-relaxed">
              <li>Items must be unused and in original packaging</li>
              <li>Return request must be made within 30 days of delivery</li>
              <li>
                Opened or used hygiene products cannot be returned for safety
                reasons
              </li>
              <li>Free return pickup available for all eligible returns</li>
            </ul>
          </section>

          <section>
            <h2 className="text-heading-lg font-display font-medium text-kumfora-charcoal mb-3">
              Exchanges
            </h2>
            <p className="text-body text-kumfora-slate leading-relaxed">
              Need a different product? We are happy to exchange your item for
              another product of equal or lesser value. Contact us to arrange an
              exchange.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
