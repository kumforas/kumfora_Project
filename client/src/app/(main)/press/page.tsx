"use client";

import Link from "next/link";
import { Mail } from "lucide-react";

export default function PressPage() {
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
              Press
            </span>
          </nav>
          <h1 className="text-display-lg font-display font-medium text-kumfora-charcoal">
            Press &amp; Media
          </h1>
          <p className="text-body text-kumfora-gray mt-2">
            Kumfora in the news.
          </p>
        </div>
      </header>

      <div className="container-main py-12 max-w-3xl">
        <div className="space-y-8">
          <section>
            <h2 className="text-heading-lg font-display font-medium text-kumfora-charcoal mb-3">
              About Kumfora
            </h2>
            <p className="text-body text-kumfora-slate leading-relaxed">
              Kumfora is a premium period care brand designed specifically for
              girls. Founded in India, we are on a mission to make periods
              comfortable, confident, and stigma-free. Our products are
              dermatologically tested, eco-friendly, and designed for a
              girl&apos;s active lifestyle.
            </p>
          </section>

          <section>
            <h2 className="text-heading-lg font-display font-medium text-kumfora-charcoal mb-3">
              Brand Assets
            </h2>
            <p className="text-body text-kumfora-slate leading-relaxed">
              For press inquiries, logo requests, or brand assets, please reach
              out to our press team.
            </p>
          </section>

          <section>
            <h2 className="text-heading-lg font-display font-medium text-kumfora-charcoal mb-3">
              Contact Press Team
            </h2>
            <div className="card p-6">
              <a
                href="mailto:press@kumfora.com"
                className="flex items-center gap-3 text-body font-medium text-kumfora-hotPink hover:underline"
              >
                <Mail className="w-5 h-5" /> press@kumfora.com
              </a>
              <p className="text-body-sm text-kumfora-gray mt-2">
                We respond to press inquiries within 24 hours.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
