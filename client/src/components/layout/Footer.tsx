"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Truck,
  Shield,
  RotateCcw,
  Headphones,
  Heart,
} from "lucide-react";
import Image from "next/image";

const footerSections = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/shop" },
      { label: "Day Pads", href: "/shop?category=day" },
      { label: "Night Pads", href: "/shop?category=night" },
      { label: "Bundles", href: "/shop?category=bundle" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "Period Guide", href: "/guide" },
      { label: "First Period Kit", href: "/guide#first-period" },
      { label: "FAQs", href: "/faqs" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Track Order", href: "/track" },
      { label: "Shipping Info", href: "/shipping" },
      { label: "Returns & Exchange", href: "/returns" },
      { label: "Feedback", href: "/feedback" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
      { label: "Partnerships", href: "/partnerships" },
    ],
  },
];

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
];

const trustBadges = [
  { icon: Truck, title: "Free Shipping", desc: "On orders over ₹499" },
  { icon: Shield, title: "Safe & Secure", desc: "Dermatologically tested" },
  { icon: RotateCcw, title: "Easy Returns", desc: "30-day hassle-free" },
  { icon: Headphones, title: "24/7 Support", desc: "We're here to help" },
];

export function Footer() {
  return (
    <footer
      className="bg-kumfora-charcoal text-kumfora-cream"
      role="contentinfo"
    >
      {/* <div className="border-b border-white/10">
        <div className="container-main py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {trustBadges.map((badge) => (
              <div key={badge.title} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                  <badge.icon
                    className="w-7 h-7 text-kumfora-rose"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <p className="font-bold text-white mb-1">{badge.title}</p>
                  <p className="text-body-sm text-kumfora-rose/70">
                    {badge.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      <div className="py-16 lg:py-15 border-t border-solid border-kumfora-pink/40">
        <div className="container-main">
          <div className="flex flex-col lg:flex-row lg:justify-between gap-10 lg:gap-12 items-center">
            <div className="flex flex-col items-start">
              <Link href="/" className="mb-6 md:mb-0" aria-label="Kumfora Home">
                <Image src="/logo.png" alt="Kumfora" width={220} height={60} />
              </Link>
              <p className="text-body text-kumfora-rose/70 mb-8 max-w-xs leading-relaxed">
                Comfortable, confident period care designed for girls. Made with
                love, backed by science.
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-kumfora-rose hover:bg-kumfora-pink hover:text-white transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-16 sm:gap-10 lg:gap-12">
              {footerSections.map((section) => (
                <nav key={section.title} aria-label={section.title}>
                  <h3 className="font-bold text-white mb-6 text-lg">
                    {section.title}
                  </h3>
                  <ul className="space-y-4" role="list">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-body-sm text-kumfora-rose/70 hover:text-kumfora-pink transition-colors inline-block"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-8">
        <div className="container-main">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
            <p className="text-body-sm text-kumfora-rose/60 text-center md:text-left">
              © {new Date().getFullYear()} Kumfora. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-caption text-kumfora-rose/60">
              <span>Powered by</span>
              <Link
                href="https://www.ascenera.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-kumfora-pink transition-colors"
              >
                Ascenera
              </Link>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 text-caption text-kumfora-rose/60">
              <Link
                href="/privacy"
                className="hover:text-kumfora-pink transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-kumfora-pink transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="hover:text-kumfora-pink transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
