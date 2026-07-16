'use client';

import Link from 'next/link';

export default function TermsPage() {
  return (
    <main className="pt-16 min-h-screen bg-kumfora-cream/30">
      <header className="bg-white border-b border-kumfora-lightGray/50 pt-32 pb-12">
        <div className="container-main max-w-3xl">
          <nav className="flex items-center gap-2 text-body-sm text-kumfora-gray mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-kumfora-hotPink">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-kumfora-charcoal font-medium" aria-current="page">Terms of Service</span>
          </nav>
          <h1 className="text-display-lg font-display font-medium text-kumfora-charcoal">Terms of Service</h1>
          <p className="text-body text-kumfora-gray mt-2">Last updated: January 2024</p>
        </div>
      </header>

      <div className="container-main py-12 max-w-3xl">
        <div className="space-y-8">
          <section>
            <h2 className="text-heading-lg font-display font-medium text-kumfora-charcoal mb-3">1. Acceptance of Terms</h2>
            <p className="text-body text-kumfora-slate leading-relaxed">
              By accessing and using the Kumfora website and services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-heading-lg font-display font-medium text-kumfora-charcoal mb-3">2. Products and Orders</h2>
            <p className="text-body text-kumfora-slate leading-relaxed">
              All products are subject to availability. We reserve the right to discontinue any product at any time. Prices are subject to change without notice. We strive to display accurate product information, but errors may occur.
            </p>
          </section>

          <section>
            <h2 className="text-heading-lg font-display font-medium text-kumfora-charcoal mb-3">3. Payment</h2>
            <p className="text-body text-kumfora-slate leading-relaxed">
              We accept cash on delivery and credit/debit card payments. All payments are processed securely. You agree to provide accurate payment information.
            </p>
          </section>

          <section>
            <h2 className="text-heading-lg font-display font-medium text-kumfora-charcoal mb-3">4. Shipping and Delivery</h2>
            <p className="text-body text-kumfora-slate leading-relaxed">
              We offer free shipping on orders over ₹499. Standard delivery takes 3-7 business days. Delivery times may vary based on location. See our <Link href="/shipping" className="text-kumfora-hotPink hover:underline">Shipping Policy</Link> for details.
            </p>
          </section>

          <section>
            <h2 className="text-heading-lg font-display font-medium text-kumfora-charcoal mb-3">5. Returns and Refunds</h2>
            <p className="text-body text-kumfora-slate leading-relaxed">
              We offer a 30-day hassle-free return policy. Items must be unused and in original packaging. See our <Link href="/returns" className="text-kumfora-hotPink hover:underline">Returns Policy</Link> for details.
            </p>
          </section>

          <section>
            <h2 className="text-heading-lg font-display font-medium text-kumfora-charcoal mb-3">6. Limitation of Liability</h2>
            <p className="text-body text-kumfora-slate leading-relaxed">
              Kumfora shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or services. Our liability is limited to the amount paid for the product.
            </p>
          </section>

          <section>
            <h2 className="text-heading-lg font-display font-medium text-kumfora-charcoal mb-3">7. Contact</h2>
            <p className="text-body text-kumfora-slate leading-relaxed">
              For questions about these Terms, contact us at <a href="mailto:care@kumfora.com" className="text-kumfora-hotPink hover:underline">care@kumfora.com</a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
