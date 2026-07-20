"use client";

import { ArrowRight, Star, Shield, Leaf, Sparkles, Heart } from "lucide-react";
import Link from "next/link";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-[60vh] lg:min-h-[90vh] flex items-center overflow-hidden pt-8">
      <div className="bg-[url('https://images.unsplash.com/photo-1507835661088-ac1e84fe645f?q=80&w=1262&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center bg-no-repeat object-cover absolute inset-0 bg-kumfora-cream" />

      <div className="container-main relative z-10 py-8 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2 px-5 py-2.5 mt-10 lg:mt-0 rounded-full bg-kumfora-blush text-kumfora-hotPink text-body-sm font-semibold mb-4 lg:mb-8">
              New: Overnight Pads Now Available
            </span>

            <h1 className="text-display-xl font-heading font-bold text-kumfora-charcoal mb-6 text-balance">
              Celebrate comfort and confidence{" "}
              <span className="text-kumfora-hotPink">For Her</span>
            </h1>

            <p className="text-body-lg text-kumfora-slate mb-5 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Ultra-soft, leak-proof pads made for girls&apos; first periods and
              beyond. Dermatologically tested, eco-friendly, and designed to
              make every month comfortable and confident.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-3">
              <Link
                href="/shop"
                className="btn-primary text-lg px-8 py-3 rounded-lg"
              >
                Shop Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/guide"
                className="btn-secondary text-lg px-8 py-3 rounded-lg"
              >
                Read Our Period Guide
              </Link>
            </div>
            <Link
              href="https://wa.me/917355413565"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-lg px-8 py-3 rounded-lg"
            >
              <WhatsAppIcon className="w-5 h-5 md:w-5 md:h-5" />
              Chat on WhatsApp
            </Link>

            {/* <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 text-body-sm text-kumfora-gray">
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-kumfora-gold text-kumfora-gold" />
                  ))}
                </div>
                <span className="font-semibold text-kumfora-charcoal">4.9/5</span>
                <span>from 500+ reviews</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-kumfora-sage" />
                <span>Dermatologically tested</span>
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-kumfora-sage" />
                <span>Eco-friendly packaging</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-square max-w-lg mx-auto">
              <div className="relative z-10 aspect-square rounded-3xl overflow-hidden shadow-2xl bg-white border border-kumfora-rose/10 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 rounded-full bg-kumfora-blush flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-12 h-12 text-kumfora-hotPink" />
                  </div>
                  <p className="text-heading-md font-display font-medium text-kumfora-charcoal">Kumfora</p>
                  <p className="text-body-sm text-kumfora-gray">Day & Night Pads</p>
                </div>
              </div>

              <div className="absolute z-10 -top-6 -right-6 w-36 h-36 rounded-3xl bg-white shadow-card p-5 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-bold text-kumfora-hotPink">4.9</span>
                <span className="text-caption text-kumfora-gray font-medium">Stars</span>
                <div className="flex items-center gap-0.5 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-kumfora-gold text-kumfora-gold" />
                  ))}
                </div>
              </div>
              <div className="absolute z-10 bottom-6 -left-6 w-32 h-32 rounded-3xl bg-white shadow-card p-4 flex flex-col items-center justify-center text-center">
                <div className="w-10 h-10 rounded-full bg-kumfora-sageLight flex items-center justify-center mb-2">
                  <Leaf className="w-5 h-5 text-kumfora-sage" />
                </div>
                <span className="text-body-sm font-bold text-kumfora-charcoal">100%</span>
                <span className="text-caption text-kumfora-gray">Biodegradable</span>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
