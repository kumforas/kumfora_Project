'use client';

import Link from 'next/link';
import { ChevronDown, Search, Mail, Truck, Shield, RotateCcw, Heart, Sparkles, BookOpen } from 'lucide-react';

const faqCategories = [
  { id: 'products', label: 'Products', icon: Sparkles },
  { id: 'orders', label: 'Orders & Shipping', icon: Truck },
  { id: 'returns', label: 'Returns & Exchange', icon: RotateCcw },
  { id: 'period-care', label: 'Period Care', icon: Heart },
  { id: 'account', label: 'Account', icon: BookOpen },
];

const faqs = {
  products: [
    { q: 'Are Kumfora pads suitable for sensitive skin?', a: 'Yes! Our pads are dermatologically tested and free from harsh chemicals, fragrances, chlorine bleaching, and dyes. The ultra-soft top sheet is specifically designed for sensitive young skin.' },
    { q: 'What\'s the difference between Day and Night pads?', a: 'Day pads (240mm) are ultra-thin for daily activities and light-to-regular flow. Night pads (320mm) are longer with extra absorbency and leak-guard barriers for heavy flow and overnight protection.' },
    { q: 'How long can I wear each pad?', a: 'For optimal hygiene, change every 4-6 hours during the day. Night pads provide up to 8-10 hours of protection for sleep. Never wear a pad for more than 8 hours during the day.' },
    { q: 'Are the wrappers really biodegradable?', a: 'Yes! Each pad comes in a plant-based biodegradable wrapper that breaks down naturally in composting conditions. It\'s our commitment to reducing plastic waste.' },
    { q: 'What absorbency should I choose for my daughter\'s first period?', a: 'Start with Day pads (Regular absorbency). They\'re slim, comfortable, and perfect for light-to-regular flow. You can always add Night pads later if needed for heavier days.' },
    { q: 'Are Kumfora pads tested on animals?', a: 'Absolutely not. We are cruelty-free certified. Our products are tested with real girls and pediatric dermatologists — never on animals.' },
  ],
  orders: [
    { q: 'How long does shipping take?', a: 'Standard delivery: 3-5 business days. Express: 1-2 business days. Free shipping on orders over ₹499. You\'ll receive tracking info via email/SMS once shipped.' },
    { q: 'Can I track my order?', a: 'Yes! Once shipped, you\'ll receive a tracking link via email and SMS. You can also track from your account dashboard under "My Orders."' },
    { q: 'Do you ship internationally?', a: 'Currently we ship within India only. We\'re working on international shipping — sign up for our newsletter to be the first to know when we expand!' },
    { q: 'What payment methods do you accept?', a: 'We accept Credit/Debit cards (Visa, Mastercard, RuPay), UPI, Net Banking, Wallets (Paytm, PhonePe), and Cash on Delivery (COD).' },
    { q: 'Is COD available everywhere?', a: 'COD is available in most major cities and towns. Availability is shown at checkout based on your pincode. There\'s no extra fee for COD.' },
    { q: 'Can I modify or cancel my order?', a: 'You can cancel within 1 hour of placing the order from your account. For modifications, contact us immediately — we\'ll do our best if it hasn\'t shipped yet.' },
  ],
  returns: [
    { q: 'What is your return policy?', a: 'We offer 30-day hassle-free returns on unopened, sealed packs. Opened packs cannot be returned for hygiene reasons, but we\'ll replace defective products.' },
    { q: 'How do I initiate a return?', a: 'Go to "My Orders" in your account, select the order, and click "Return Items." Choose a reason, and we\'ll arrange a free pickup. Refund processes in 5-7 business days.' },
    { q: 'Who pays for return shipping?', a: 'Returns are free for defective/damaged items or wrong items sent. For change-of-mind returns on sealed packs, a ₹99 return fee is deducted from the refund.' },
    { q: 'Can I exchange for a different product?', a: 'Yes! For sealed packs, you can exchange for a different Kumfora product. The price difference will be refunded or charged accordingly.' },
    { q: 'What if I receive a damaged product?', a: 'We\'re so sorry! Contact us within 48 hours with a photo. We\'ll send a replacement immediately — no need to return the damaged item.' },
  ],
  'period-care': [
    { q: 'How do I know when my period is coming?', a: 'Common signs: breast tenderness, mood changes, cramps, acne, fatigue, and vaginal discharge. Tracking your cycle in an app helps predict it after a few months.' },
    { q: 'Is it normal to have irregular periods at first?', a: 'Yes! In the first 2-3 years, cycles can be irregular (21-45 days). This is normal as your body adjusts. They usually become more regular over time.' },
    { q: 'How much blood is normal?', a: 'Average is 2-3 tablespoons (30-50ml) per cycle. It looks like more because it\'s mixed with uterine lining and fluids. Changing a pad every 4-6 hours is typical.' },
    { q: 'Can I swim during my period?', a: 'Pads aren\'t suitable for swimming (they absorb water). For swimming, consider period swimwear or discuss tampons/menstrual cups with a parent/doctor when ready.' },
    { q: 'What helps with period cramps?', a: 'Heat pad on lower abdomen, gentle yoga/stretching, warm bath, staying hydrated, ibuprofen (with parent approval), and magnesium-rich foods (bananas, dark chocolate) can help.' },
  ],
  account: [
    { q: 'How do I create an account?', a: 'Click "Account" in the header, then "Create Account." Enter your name, email, phone, and create a password. Verify your email via the link we send you.' },
    { q: 'I forgot my password. What do I do?', a: 'Click "Forgot Password" on the login page. Enter your email, and we\'ll send a reset link. The link expires in 1 hour for security.' },
    { q: 'Can I save multiple addresses?', a: 'Yes! Go to "Addresses" in your account to save home, work, or relative\'s addresses. Set one as default for faster checkout.' },
    { q: 'How do I view my order history?', a: 'All past orders are in "My Orders" in your account. You can view details, track shipments, download invoices, and reorder with one click.' },
    { q: 'Is my payment info secure?', a: 'Absolutely. We use Razorpay (PCI DSS Level 1 certified) for all payments. We never store your full card details — only the last 4 digits for reference.' },
  ],
};

export default function FAQsPage() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(`faq-${id}`);
    if (el) {
      const headerOffset = 100;
      const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="relative min-h-[30vh] sm:min-h-[40vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-kumfora-cream" aria-hidden="true" />

        <div className="container-main relative z-10 py-12 lg:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-display-xl font-display font-medium text-kumfora-charcoal mb-4">
              Frequently Asked <span className="text-kumfora-terracotta">Questions</span>
            </h1>
            <p className="text-body-lg text-kumfora-slate">
              Quick answers to common questions. Can&apos;t find what you&apos;re looking for?
            </p>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="py-8 bg-white border-b border-kumfora-lightGray/50">
        <div className="container-main">
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-kumfora-gray" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search FAQs... (e.g., shipping, returns, absorbency)"
              className="input pl-12"
              aria-label="Search FAQs"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white border-b border-kumfora-lightGray/50">
        <div className="container-main">
          <nav className="flex flex-wrap justify-center gap-2" aria-label="FAQ categories">
            {faqCategories.map((cat) => (
              <button
                key={cat.id}
                className="btn-ghost px-4 py-2"
                aria-controls={`faq-${cat.id}`}
                onClick={() => scrollToSection(cat.id)}
              >
                <cat.icon className="w-4 h-4" />
                {cat.label}
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-12 lg:py-16 bg-kumfora-cream/30" aria-labelledby="faq-content">
        <div className="container-main">
          <div className="max-w-3xl mx-auto space-y-8">
            {faqCategories.map((category) => (
              <section key={category.id} id={`faq-${category.id}`} aria-labelledby={`faq-${category.id}-heading`}>
                <h2 id={`faq-${category.id}-heading`} className="text-heading-lg font-display font-medium text-kumfora-charcoal mb-6 flex items-center gap-2">
                  <category.icon className="w-6 h-6 text-kumfora-terracotta" />
                  {category.label}
                </h2>
                <div className="space-y-3">
                  {faqs[category.id as keyof typeof faqs].map((faq, index) => (
                    <details key={index} className="card group">
                      <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                        <span className="text-body font-medium text-kumfora-charcoal pr-4">{faq.q}</span>
                        <ChevronDown className="w-5 h-5 text-kumfora-gray transition-transform group-open:rotate-180" />
                      </summary>
                      <div className="px-5 pb-5">
                        <p className="text-body text-kumfora-slate leading-relaxed">{faq.a}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Still need help */}
          <div className="mt-8 sm:mt-16 text-center p-6 sm:p-8 card">
            <h3 className="text-heading-lg font-display font-medium text-kumfora-charcoal mb-3">Still Have Questions?</h3>
            <p className="text-body text-kumfora-slate mb-6">Our care team is here to help — no question is too small.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact" className="btn-primary">Contact Us</Link>
              <Link href="mailto:care@kumfora.com" className="btn-secondary">Email Support</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
