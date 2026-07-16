'use client';

import { ArrowRight, Star, Shield, Leaf, Sparkles, Heart } from 'lucide-react';
import Link from 'next/link';

export function Hero() {

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-8">
      <div className="bg-[url('https://images.unsplash.com/photo-1507835661088-ac1e84fe645f?q=80&w=1262&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center bg-no-repeat object-cover absolute inset-0 bg-kumfora-cream" />

      <div className="container-main relative z-10 py-12 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-kumfora-blush text-kumfora-hotPink text-body-sm font-semibold mb-8">
              New: Overnight Pads Now Available
            </span>

            <h1 className="text-display-xl font-heading font-bold text-kumfora-charcoal mb-6 text-balance">
              Celebrate comfort and confidence{' '}
              <span className="text-kumfora-hotPink">For Her</span>
            </h1>

            <p className="text-body-lg text-kumfora-slate mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Ultra-soft, leak-proof pads made for girls&apos; first periods and beyond.
              Dermatologically tested, eco-friendly, and designed to make every month
              comfortable and confident.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12">
              <Link href="/shop" className="btn-primary text-lg px-10 py-4">
                Shop Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/guide" className="btn-secondary text-lg px-10 py-4">
                Read Our Period Guide
              </Link>
            </div>

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
