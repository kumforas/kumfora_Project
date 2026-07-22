import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Leaf,
  Heart,
  Shield,
  Sparkles,
  Users,
  Award,
  User,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Learn about Kumfora's mission to provide comfortable, confident period care for girls. Made with love, backed by science.",
};

const values = [
  {
    icon: Heart,
    title: "Girl-First Design",
    desc: "Every product is designed with real girls' feedback and needs at the center.",
  },
  {
    icon: Shield,
    title: "Safety First",
    desc: "Dermatologically tested, free from harsh chemicals, fragrances, and chlorine.",
  },
  {
    icon: Leaf,
    title: "Planet Conscious",
    desc: "Biodegradable pads, sustainable sourcing, and minimal packaging waste.",
  },
  {
    icon: Sparkles,
    title: "Honest Quality",
    desc: "No false claims. Premium materials that deliver on every promise.",
  },
];

const milestones = [
  {
    year: "2025",
    title: "The Idea",
    desc: "As a woman, I realized how difficult it was to find sanitary pads that were truly comfortable, skin-friendly, and affordable. That inspired me to create Kumfora.",
  },
  {
    year: "Early 2026",
    title: "Product Development",
    desc: "Worked closely with trusted manufacturing partners to develop high-quality cotton-based sanitary pads with excellent absorbency, soft comfort, and rash-free protection.",
  },
  {
    year: "July 2026",
    title: "Kumfora Launches",
    desc: "Kumfora officially launched with a mission to provide women with comfortable, reliable, and affordable menstrual care across India.",
  },
];

const team = [
  {
    name: "Meera Patel",
    role: "Founder & CEO",
    desc: "Mom of two, former P&G brand manager",
  },
  {
    name: "Dr. Anjali Rao",
    role: "Medical Advisor",
    desc: "Pediatric dermatologist, AIIMS Delhi",
  },
  {
    name: "Rohit Sharma",
    role: "Product Lead",
    desc: "Ex-Unilever, 10+ years in hygiene",
  },
  {
    name: "Sneha Gupta",
    role: "Community Manager",
    desc: "Period educator & youth mentor",
  },
];

export default function AboutPage() {
  return (
    <main className="pt-12">
      {/* Hero */}
      <section className="relative min-h-[40vh] sm:min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-kumfora-cream" aria-hidden="true" />

        <div className="container-main relative z-10 py-16 lg:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-kumfora-blush/50 text-kumfora-terracotta text-body-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-kumfora-terracotta" />
              Our Story
            </span>
            <h1 className="text-display-xl font-display font-medium text-kumfora-charcoal mb-6 text-balance">
              Made with <span className="text-kumfora-terracotta">Love</span>,
              Backed by Science
            </h1>
            <p className="text-body-lg text-kumfora-slate mb-8 max-w-2xl mx-auto">
              Kumfora was born from a simple observation: most period products
              are designed for adult women, not growing girls. We&apos;re
              changing that — one comfortable period at a time.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/shop" className="btn-primary">
                Shop Our Pads
              </Link>
              <Link href="/guide" className="btn-secondary">
                Read Period Guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section
        className="py-12 lg:py-16 bg-red-100/50"
        aria-labelledby="mission-heading"
      >
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
              <h2
                id="mission-heading"
                className="text-display-lg font-display font-medium text-kumfora-charcoal mb-6"
              >
                Our <span className="text-kumfora-terracotta">Mission</span>
              </h2>
              <p className="text-body-lg text-kumfora-slate mb-6">
                We believe every woman deserves confidence, comfort, and peace
                of mind during her period. We are committed to delivering
                quality feminine hygiene products that women can trust every
                day.
              </p>
              {/* <p className="text-body text-kumfora-gray mb-6">
                We&apos;re building the period brand we wished existed when we
                were young — one that celebrates this milestone instead of
                hiding it. Products that make girls feel capable, not
                self-conscious.
              </p> */}
              <p className="text-body text-kumfora-gray">
                From the absorbency core to the biodegradable pads, every
                decision is made with her comfort and future in mind.
              </p>
            </div>
            <div className="relative aspect-[4/3]">
              <div className="absolute inset-0 bg-kumfora-blush rounded-3xl" />
              <div className="relative z-10 h-full rounded-3xl overflow-hidden bg-white flex items-center justify-center">
                <div className="text-center p-8 max-w-md">
                  <div className="w-24 h-24 rounded-full bg-kumfora-blush flex items-center justify-center mx-auto mb-6">
                    <Heart className="w-12 h-12 text-kumfora-terracotta" />
                  </div>
                  <h3 className="text-display-md font-display font-medium text-kumfora-charcoal mb-3">
                    Designed for Her
                  </h3>
                  <p className="text-body text-kumfora-slate">
                    Every curve, every layer, every detail — thoughtfully
                    crafted for young girls&apos; comfort.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section
        className="py-12 lg:py-16 bg-kumfora-cream/30"
        aria-labelledby="values-heading"
      >
        <div className="container-main">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-16">
            <h2
              id="values-heading"
              className="text-display-lg font-display font-medium text-kumfora-charcoal mb-4"
            >
              Our <span className="text-kumfora-terracotta">Values</span>
            </h2>
            <p className="text-body-lg text-kumfora-slate">
              The principles that guide every product, every decision, every
              interaction.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <article
                key={value.title}
                className="card p-6 text-center hover:shadow-card-hover transition-shadow"
              >
                <div className="w-14 h-14 rounded-xl bg-kumfora-blush flex items-center justify-center mx-auto mb-4">
                  <value.icon
                    className="w-7 h-7 text-kumfora-terracotta"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-heading-md font-display font-medium text-kumfora-charcoal mb-2">
                  {value.title}
                </h3>
                <p className="text-body text-kumfora-gray">{value.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section
        className="py-12 lg:py-16 bg-white"
        aria-labelledby="journey-heading"
      >
        <div className="container-main">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-16">
            <h2
              id="journey-heading"
              className="text-display-lg font-display font-medium text-kumfora-charcoal mb-4"
            >
              Our <span className="text-kumfora-terracotta">Journey</span>
            </h2>
            <p className="text-body-lg text-kumfora-slate">
              From a dream to empowering women with comfort and confidence.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <ol className="relative space-y-8" role="list">
              <div
                className="absolute left-8 sm:left-10 top-0 bottom-0 w-1 bg-kumfora-lightGray"
                aria-hidden="true"
              />
              {milestones.map((milestone) => (
                <li
                  key={milestone.year}
                  className="relative flex gap-4 sm:gap-6"
                >
                  <div className="flex-shrink-0 w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-white border-4 border-kumfora-terracotta flex items-center justify-center z-10 relative">
                    <span className="text-sm sm:text-md font-bold text-kumfora-terracotta leading-tight text-center px-1  whitespace-wrap">
                      {milestone.year}
                    </span>
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="text-heading-md font-display font-medium text-kumfora-charcoal">
                      {milestone.title}
                    </h3>
                    <p className="text-body text-kumfora-slate mt-1">
                      {milestone.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Team */}
      {/* <section
        className="py-12 lg:py-16 bg-kumfora-cream/30"
        aria-labelledby="team-heading"
      >
        <div className="container-main">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-16">
            <h2
              id="team-heading"
              className="text-display-lg font-display font-medium text-kumfora-charcoal mb-4"
            >
              Meet the <span className="text-kumfora-terracotta">Team</span>
            </h2>
            <p className="text-body-lg text-kumfora-slate">
              Real people who care deeply about making periods comfortable.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <article key={member.name} className="card p-6 text-center">
                <div className="w-24 h-24 rounded-full bg-kumfora-blush flex items-center justify-center mx-auto mb-4">
                  <User className="w-12 h-12 text-kumfora-terracotta" />
                </div>
                <h3 className="text-heading-md font-display font-medium text-kumfora-charcoal">
                  {member.name}
                </h3>
                <p className="text-body-sm text-kumfora-terracotta font-medium">
                  {member.role}
                </p>
                <p className="text-body-sm text-kumfora-gray mt-1">
                  {member.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section> */}

      {/* Trust */}
      <section
        className="py-16 lg:py-24 bg-kumfora-charcoal"
        aria-labelledby="trust-heading"
      >
        <div className="container-main">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-16">
            <h2
              id="trust-heading"
              className="text-display-lg font-display font-medium text-kumfora-white mb-4"
            >
              Trusted by <span className="text-kumfora-coral">Families</span>{" "}
              Across India
            </h2>
            <p className="text-body-lg text-kumfora-rose/70">
              Join 5000+ parents who&apos;ve made the switch to comfort.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Award, stat: "4.9/5", label: "Average Rating" },
              { icon: Users, stat: "5000+", label: "Happy Families" },
              { icon: Shield, stat: "100%", label: "Dermatologically Tested" },
            ].map((item) => (
              <div key={item.label} className="text-center p-6">
                <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon
                    className="w-7 h-7 text-kumfora-coral"
                    aria-hidden="true"
                  />
                </div>
                <p className="text-display-md font-display font-bold text-kumfora-white">
                  {item.stat}
                </p>
                <p className="text-body text-kumfora-rose/70 mt-1">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-16 lg:py-24 bg-white"
        aria-labelledby="cta-heading"
      >
        <div className="container-main">
          <div className="max-w-2xl mx-auto text-center card p-6 sm:p-8 lg:p-12">
            <h2
              id="cta-heading"
              className="text-display-sm sm:text-display-md font-display font-medium text-kumfora-charcoal mb-4"
            >
              Ready to Experience the Difference?
            </h2>
            <p className="text-body sm:text-body-lg text-kumfora-slate mb-6 sm:mb-8">
              Join thousands of girls who&apos;ve discovered comfortable,
              confident period care.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/shop"
                className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
              >
                Shop Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="btn-secondary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
              >
                Have Questions?
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
