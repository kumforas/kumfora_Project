'use client';

import Link from 'next/link';
import { Mail, Heart } from 'lucide-react';

export default function CareersPage() {
  return (
    <main className="pt-16 min-h-screen bg-kumfora-cream/30">
      <header className="bg-white border-b border-kumfora-lightGray/50 pt-32 pb-12">
        <div className="container-main max-w-3xl">
          <nav className="flex items-center gap-2 text-body-sm text-kumfora-gray mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-kumfora-hotPink">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-kumfora-charcoal font-medium" aria-current="page">Careers</span>
          </nav>
          <h1 className="text-display-lg font-display font-medium text-kumfora-charcoal">Careers at Kumfora</h1>
          <p className="text-body text-kumfora-gray mt-2">Join us in making period care comfortable and accessible for every girl.</p>
        </div>
      </header>

      <div className="container-main py-12 max-w-3xl">
        <div className="space-y-8">
          <section>
            <h2 className="text-heading-lg font-display font-medium text-kumfora-charcoal mb-3">Why Kumfora?</h2>
            <p className="text-body text-kumfora-slate leading-relaxed">
              We are on a mission to break the stigma around menstruation and provide premium period care products to girls across India. Working at Kumfora means being part of a purpose-driven team that is making a real difference.
            </p>
          </section>

          <section>
            <h2 className="text-heading-lg font-display font-medium text-kumfora-charcoal mb-3">Our Values</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: 'Empathy First', desc: 'We design everything with our users in mind.' },
                { title: 'Open & Honest', desc: 'Transparency in everything we do.' },
                { title: 'Bold Ideas', desc: 'We challenge the status quo and innovate.' },
                { title: 'Impact Driven', desc: 'Every decision is measured by its impact.' },
              ].map((value) => (
                <div key={value.title} className="card p-5">
                  <h3 className="text-heading-sm font-display font-medium text-kumfora-charcoal mb-1">{value.title}</h3>
                  <p className="text-body-sm text-kumfora-gray">{value.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-heading-lg font-display font-medium text-kumfora-charcoal mb-3">Open Positions</h2>
            <div className="card p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-kumfora-blush flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-kumfora-hotPink" />
              </div>
              <h3 className="text-heading-md font-display font-medium text-kumfora-charcoal mb-2">No open positions right now</h3>
              <p className="text-body text-kumfora-gray mb-4">
                We are always looking for passionate people. Send us your resume and we will keep you in mind for future openings.
              </p>
              <a href="mailto:careers@kumfora.com" className="inline-flex items-center gap-2 text-body font-medium text-kumfora-hotPink hover:underline">
                <Mail className="w-4 h-4" /> careers@kumfora.com
              </a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
