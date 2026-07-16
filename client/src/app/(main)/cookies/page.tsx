'use client';

import Link from 'next/link';

export default function CookiesPage() {
  return (
    <main className="pt-16 min-h-screen bg-kumfora-cream/30">
      <header className="bg-white border-b border-kumfora-lightGray/50 pt-32 pb-12">
        <div className="container-main max-w-3xl">
          <nav className="flex items-center gap-2 text-body-sm text-kumfora-gray mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-kumfora-hotPink">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-kumfora-charcoal font-medium" aria-current="page">Cookie Policy</span>
          </nav>
          <h1 className="text-display-lg font-display font-medium text-kumfora-charcoal">Cookie Policy</h1>
          <p className="text-body text-kumfora-gray mt-2">Last updated: January 2024</p>
        </div>
      </header>

      <div className="container-main py-12 max-w-3xl">
        <div className="space-y-8">
          <section>
            <h2 className="text-heading-lg font-display font-medium text-kumfora-charcoal mb-3">What Are Cookies</h2>
            <p className="text-body text-kumfora-slate leading-relaxed">
              Cookies are small text files stored on your device when you visit our website. They help us provide you with a better experience.
            </p>
          </section>

          <section>
            <h2 className="text-heading-lg font-display font-medium text-kumfora-charcoal mb-3">How We Use Cookies</h2>
            <ul className="list-disc list-inside space-y-2 text-body text-kumfora-slate leading-relaxed">
              <li><strong>Essential cookies:</strong> Required for the website to function (e.g., shopping cart, checkout).</li>
              <li><strong>Analytics cookies:</strong> Help us understand how visitors use our site.</li>
              <li><strong>Preference cookies:</strong> Remember your settings and preferences.</li>
              <li><strong>Marketing cookies:</strong> Used to deliver relevant advertisements.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-heading-lg font-display font-medium text-kumfora-charcoal mb-3">Managing Cookies</h2>
            <p className="text-body text-kumfora-slate leading-relaxed">
              You can control cookies through your browser settings. Disabling certain cookies may affect website functionality.
            </p>
          </section>

          <section>
            <h2 className="text-heading-lg font-display font-medium text-kumfora-charcoal mb-3">Contact Us</h2>
            <p className="text-body text-kumfora-slate leading-relaxed">
              For questions about our Cookie Policy, contact us at <a href="mailto:care@kumfora.com" className="text-kumfora-hotPink hover:underline">care@kumfora.com</a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
