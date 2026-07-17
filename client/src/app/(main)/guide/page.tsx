import { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  Star,
  Shield,
  Sparkles,
  Truck,
  RotateCcw,
  Heart,
  Calendar,
  Droplets,
  Moon,
  Sun,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Period Guide for Girls",
  description:
    "Complete period guide for girls - first period tips, cycle tracking, product guide, and expert advice. Kumfora's comprehensive resource for period confidence.",
};

const guideSections = [
  {
    id: "first-period",
    title: "Your First Period",
    icon: Sparkles,
    color: "kumfora-terracotta",
    content: [
      {
        title: "What to Expect",
        desc: "Your first period (menarche) usually arrives between ages 10-15. It's a sign your body is growing up — completely normal and nothing to fear!",
      },
      {
        title: "Signs It's Coming",
        desc: "Breast development, growth spurts, vaginal discharge (clear/white), mood changes, and cramps can signal your first period is near.",
      },
      {
        title: "Preparing Your Kit",
        desc: "Keep a period kit in your school bag: 2-3 pads, clean underwear, wet wipes, a small disposal bag, and a spare pair of pants.",
      },
      {
        title: "Talk to Someone",
        desc: "Share with a trusted adult — mom, aunt, older sister, or school counselor. They've been through it and want to help!",
      },
    ],
  },
  {
    id: "understanding-cycle",
    title: "Understanding Your Cycle",
    icon: Calendar,
    color: "kumfora-coral",
    content: [
      {
        title: "Cycle Basics",
        desc: "A menstrual cycle averages 28 days (21-35 is normal). Day 1 is the first day of bleeding. Ovulation typically occurs around day 14.",
      },
      {
        title: "Tracking Your Period",
        desc: "Use a calendar or app to track: start date, flow heaviness, symptoms, and mood. Patterns emerge after 3-6 months.",
      },
      {
        title: "Irregular Periods",
        desc: "In the first 2 years, irregular cycles are normal. Stress, exercise, weight changes, and illness can affect timing.",
      },
      {
        title: "When to See a Doctor",
        desc: "Cycles shorter than 21 days or longer than 45 days, very heavy bleeding (soaking pad hourly), or severe pain warrant a check-up.",
      },
    ],
  },
  {
    id: "product-guide",
    title: "Choosing the Right Product",
    icon: Shield,
    color: "kumfora-sage",
    content: [
      {
        title: "Day Pads (Regular)",
        desc: "Perfect for school, sports, and daily activities. Ultra-thin, breathable, 240mm length. Change every 4-6 hours.",
      },
      {
        title: "Night Pads (Overnight)",
        desc: "Extra-long 320mm with leak-guard barriers. For heavy flow days and sleep. Up to 8-10 hours protection.",
      },
      {
        title: "Panty Liners",
        desc: "Thin protection for light spotting, discharge, or backup with tampons/cups. Not for full period flow.",
      },
      {
        title: "How to Choose",
        desc: "Match absorbency to your flow: Light → Day pads. Regular → Day pads. Heavy → Night pads. Overnight → Night pads.",
      },
    ],
  },
  {
    id: "period-care",
    title: "Period Self-Care",
    icon: Heart,
    color: "kumfora-rose",
    content: [
      {
        title: "Managing Cramps",
        desc: "Heat pad on lower abdomen, gentle stretching, warm bath, staying hydrated, and OTC pain relief (with parent approval) can help.",
      },
      {
        title: "Hygiene Essentials",
        desc: "Change pads every 4-6 hours. Wash with water only (no soap inside). Wear breathable cotton underwear. Pat dry, don't rub.",
      },
      {
        title: "Staying Active",
        desc: "Exercise releases endorphins that reduce cramps. Swimming, yoga, walking, and light sports are great during your period.",
      },
      {
        title: "Mood & Energy",
        desc: "Hormones affect mood. Prioritize sleep, eat iron-rich foods (spinach, lentils), and be kind to yourself on low-energy days.",
      },
    ],
  },
  {
    id: "myths-facts",
    title: "Period Myths vs Facts",
    icon: BookOpen,
    color: "kumfora-mauve",
    content: [
      {
        title: "Myth: You can't exercise during your period",
        desc: "Fact: Exercise helps reduce cramps and boosts mood. Listen to your body and modify intensity if needed.",
      },
      {
        title: "Myth: Period blood is dirty",
        desc: "Fact: Menstrual blood is the same blood from your body — just mixed with uterine lining. It's natural and clean.",
      },
      {
        title: "Myth: You lose a lot of blood",
        desc: "Fact: Average blood loss is only 2-3 tablespoons (30-50ml) per cycle. It looks like more because of fluid mix.",
      },
      {
        title: "Myth: Pads cause rashes",
        desc: "Fact: Quality pads with breathable topsheets (like Kumfora!) prevent rashes. Change regularly and keep the area dry.",
      },
    ],
  },
];

export default function GuidePage() {
  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="relative min-h-[35vh] sm:min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-kumfora-cream" aria-hidden="true" />

        <div className="container-main relative z-10 py-16 lg:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-kumfora-blush/50 text-kumfora-terracotta text-body-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              Period Guide
            </span>
            <h1 className="text-display-xl font-display font-medium text-kumfora-charcoal mb-6 text-balance">
              Everything You Need to Know About{" "}
              <span className="text-kumfora-terracotta">Periods</span>
            </h1>
            <p className="text-body-lg text-kumfora-slate mb-8 max-w-2xl mx-auto">
              From first period jitters to cycle tracking mastery — your
              complete, judgment-free resource for period confidence at every
              age.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/shop" className="btn-primary">
                Find Your Perfect Pad
              </Link>
              <Link href="/faqs" className="btn-secondary">
                Browse FAQs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section
        className="py-12 bg-white border-y border-kumfora-lightGray/50"
        aria-label="Quick facts"
      >
        <div className="container-main">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: Sun, stat: "28 Days", label: "Average Cycle" },
              { icon: Moon, stat: "3-7 Days", label: "Period Length" },
              { icon: Droplets, stat: "30-50ml", label: "Blood Loss" },
              { icon: Zap, stat: "10-15 yrs", label: "First Period Age" },
            ].map((item) => (
              <div key={item.label} className="text-center p-4">
                <div className="w-12 h-12 rounded-xl bg-kumfora-blush flex items-center justify-center mx-auto mb-3">
                  <item.icon
                    className="w-6 h-6 text-kumfora-terracotta"
                    aria-hidden="true"
                  />
                </div>
                <p className="text-display-sm font-display font-bold text-kumfora-charcoal">
                  {item.stat}
                </p>
                <p className="text-body-sm text-kumfora-gray">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guide Sections */}
      <section
        className="py-16 lg:py-24 bg-kumfora-cream/30"
        aria-labelledby="guide-heading"
      >
        <div className="container-main">
          <div className="grid lg:grid-cols-4 gap-6 lg:gap-12">
            {/* Sidebar Navigation */}
            <aside className="lg:col-span-1">
              <nav className="sticky top-24" aria-label="Guide sections">
                <h3 className="text-heading-sm font-medium text-kumfora-charcoal mb-4">
                  Guide Contents
                </h3>
                <ul className="space-y-1" role="list">
                  {guideSections.map((section) => (
                    <li key={section.id}>
                      <Link
                        href={`#${section.id}`}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-body text-kumfora-slate hover:bg-kumfora-blush hover:text-kumfora-terracotta transition-colors"
                      >
                        <section.icon
                          className="w-5 h-5"
                          style={{ color: `var(--color-${section.color})` }}
                          aria-hidden="true"
                        />
                        {section.title}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 p-4 rounded-xl bg-white border border-kumfora-lightGray/50">
                  <p className="text-body-sm text-kumfora-slate mb-3">
                    Need personalized help?
                  </p>
                  <Link
                    href="/contact"
                    className="btn-secondary w-full justify-center text-sm"
                  >
                    Contact Our Team
                  </Link>
                </div>
              </nav>
            </aside>

            {/* Content */}
            <div className="lg:col-span-3 space-y-8 sm:space-y-12">
              {guideSections.map((section) => (
                <article
                  key={section.id}
                  id={section.id}
                  className="card p-6 lg:p-8"
                >
                  <header className="mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-kumfora-blush/50 flex items-center justify-center">
                        <section.icon
                          className="w-5 h-5"
                          style={{ color: `var(--color-${section.color})` }}
                          aria-hidden="true"
                        />
                      </div>
                      <h2 className="text-display-sm font-display font-medium text-kumfora-charcoal">
                        {section.title}
                      </h2>
                    </div>
                    <div className="h-1 w-16 bg-kumfora-terracotta rounded-full" />
                  </header>
                  <div className="space-y-6">
                    {section.content.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <h3 className="text-heading-md font-display font-medium text-kumfora-charcoal">
                          {item.title}
                        </h3>
                        <p className="text-body text-kumfora-slate leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section
        className="py-16 lg:py-24 bg-white"
        aria-labelledby="resources-heading"
      >
        <div className="container-main">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2
              id="resources-heading"
              className="text-display-lg font-display font-medium text-kumfora-charcoal mb-4"
            >
              Helpful <span className="text-kumfora-terracotta">Resources</span>
            </h2>
            <p className="text-body-lg text-kumfora-slate">
              More ways to support your period journey.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: BookOpen,
                title: "FAQs",
                desc: "Answers to 50+ common period questions",
                href: "/faqs",
              },
              {
                icon: Truck,
                title: "Product Comparison",
                desc: "Find your perfect pad match",
                href: "/shop",
              },
              {
                icon: Heart,
                title: "Period Tracker",
                desc: "Printable cycle calendar",
                href: "/guide#tracking",
              },
            ].map((resource) => (
              <Link
                key={resource.title}
                href={resource.href}
                className="card p-6 group hover:shadow-card-hover transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-kumfora-blush flex items-center justify-center mb-4 group-hover:bg-kumfora-terracotta group-hover:text-white transition-colors">
                  <resource.icon
                    className="w-6 h-6 text-kumfora-terracotta group-hover:text-white"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-heading-md font-display font-medium text-kumfora-charcoal group-hover:text-kumfora-terracotta transition-colors mb-2">
                  {resource.title}
                </h3>
                <p className="text-body text-kumfora-gray">{resource.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-16 lg:py-24 bg-kumfora-charcoal"
        aria-labelledby="guide-cta"
      >
        <div className="container-main">
          <div className="max-w-2xl mx-auto text-center card p-6 sm:p-8 lg:p-12">
            <h2
              id="guide-cta"
              className="text-display-sm sm:text-display-md font-display font-medium text-kumfora-hotPink mb-4"
            >
              Ready to Feel Confident Every Month?
            </h2>
            <p className="text-body sm:text-body-lg text-black/50 mb-6 sm:mb-8">
              Shop pads designed for girls — ultra-soft, leak-proof, and
              eco-friendly.
            </p>
            <Link
              href="/shop"
              className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 inline-flex"
            >
              Find My Perfect Pad
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
