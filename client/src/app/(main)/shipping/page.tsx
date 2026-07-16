'use client';

import Link from 'next/link';
import { Truck, Clock, Package } from 'lucide-react';

export default function ShippingPage() {
  return (
    <main className="pt-16 min-h-screen bg-kumfora-cream/30">
      <header className="bg-white border-b border-kumfora-lightGray/50 pt-32 pb-12">
        <div className="container-main max-w-3xl">
          <nav className="flex items-center gap-2 text-body-sm text-kumfora-gray mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-kumfora-hotPink">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-kumfora-charcoal font-medium" aria-current="page">Shipping Info</span>
          </nav>
          <h1 className="text-display-lg font-display font-medium text-kumfora-charcoal">Shipping Information</h1>
          <p className="text-body text-kumfora-gray mt-2">Everything you need to know about our shipping.</p>
        </div>
      </header>

      <div className="container-main py-12 max-w-3xl">
        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {[
            { icon: Truck, title: 'Free Shipping', desc: 'On all orders over ₹499' },
            { icon: Clock, title: 'Fast Delivery', desc: '3-7 business days' },
            { icon: Package, title: 'Secure Packaging', desc: 'Discreet and eco-friendly' },
          ].map((item) => (
            <div key={item.title} className="card p-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-kumfora-blush flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-7 h-7 text-kumfora-hotPink" />
              </div>
              <h3 className="text-heading-sm font-display font-medium text-kumfora-charcoal mb-1">{item.title}</h3>
              <p className="text-body-sm text-kumfora-gray">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-heading-lg font-display font-medium text-kumfora-charcoal mb-3">Shipping Rates</h2>
            <div className="card p-6">
              <ul className="space-y-3 text-body text-kumfora-slate">
                <li className="flex justify-between"><span>Orders under ₹499</span><span className="font-medium">₹99 flat rate</span></li>
                <li className="flex justify-between"><span>Orders ₹499 and above</span><span className="font-medium text-kumfora-sage">Free</span></li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-heading-lg font-display font-medium text-kumfora-charcoal mb-3">Delivery Times</h2>
            <div className="card p-6">
              <ul className="space-y-3 text-body text-kumfora-slate">
                <li className="flex justify-between"><span>Metro cities (Mumbai, Delhi, Bangalore, etc.)</span><span className="font-medium">3-5 business days</span></li>
                <li className="flex justify-between"><span>Other major cities</span><span className="font-medium">5-7 business days</span></li>
                <li className="flex justify-between"><span>Remote areas</span><span className="font-medium">7-10 business days</span></li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-heading-lg font-display font-medium text-kumfora-charcoal mb-3">Discreet Packaging</h2>
            <p className="text-body text-kumfora-slate leading-relaxed">
              All orders are shipped in plain, unmarked packaging. There is no indication of the contents on the outside of the package. Your privacy matters to us.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
