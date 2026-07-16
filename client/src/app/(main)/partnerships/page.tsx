'use client';

import Link from 'next/link';
import { Mail, Handshake } from 'lucide-react';

export default function PartnershipsPage() {
  return (
    <main className="pt-16 min-h-screen bg-kumfora-cream/30">
      <header className="bg-white border-b border-kumfora-lightGray/50 pt-32 pb-12">
        <div className="container-main max-w-3xl">
          <nav className="flex items-center gap-2 text-body-sm text-kumfora-gray mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-kumfora-hotPink">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-kumfora-charcoal font-medium" aria-current="page">Partnerships</span>
          </nav>
          <h1 className="text-display-lg font-display font-medium text-kumfora-charcoal">Partnerships</h1>
          <p className="text-body text-kumfora-gray mt-2">Let&apos;s work together to make period care accessible.</p>
        </div>
      </header>

      <div className="container-main py-12 max-w-3xl">
        <div className="space-y-8">
          <section>
            <h2 className="text-heading-lg font-display font-medium text-kumfora-charcoal mb-3">Partner With Us</h2>
            <p className="text-body text-kumfora-slate leading-relaxed">
              We are always looking for organizations, schools, NGOs, and businesses that share our vision of making period care accessible and stigma-free for every girl in India.
            </p>
          </section>

          <section>
            <h2 className="text-heading-lg font-display font-medium text-kumfora-charcoal mb-3">Partnership Opportunities</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: 'School Programs', desc: 'Sponsor period care kits for girls in schools.' },
                { title: 'NGO Collaborations', desc: 'Partner with us for distribution and awareness.' },
                { title: 'Retail Partners', desc: 'Stock Kumfora products in your stores.' },
                { title: 'Corporate Gifting', desc: 'Bulk orders for employee wellness programs.' },
              ].map((item) => (
                <div key={item.title} className="card p-5">
                  <h3 className="text-heading-sm font-display font-medium text-kumfora-charcoal mb-1">{item.title}</h3>
                  <p className="text-body-sm text-kumfora-gray">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-heading-lg font-display font-medium text-kumfora-charcoal mb-3">Get in Touch</h2>
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-kumfora-blush flex items-center justify-center">
                  <Handshake className="w-6 h-6 text-kumfora-hotPink" />
                </div>
                <div>
                  <p className="font-medium text-kumfora-charcoal">Partnerships Team</p>
                  <p className="text-body-sm text-kumfora-gray">We would love to hear from you</p>
                </div>
              </div>
              <a href="mailto:partnerships@kumfora.com" className="inline-flex items-center gap-2 text-body font-medium text-kumfora-hotPink hover:underline">
                <Mail className="w-4 h-4" /> partnerships@kumfora.com
              </a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
