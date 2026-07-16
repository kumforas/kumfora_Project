import Link from 'next/link';
import { Leaf, Heart, Sparkles, ArrowRight } from 'lucide-react';

export function AboutPreview() {
  return (
    <section className="py-20 lg:py-15 border-t-2 border-solid border-kumfora-blush" aria-labelledby="about-heading">
      <div className="container-main">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-kumfora-blush text-kumfora-hotPink text-body-sm font-semibold mb-6">
              <Heart className="w-4 h-4" />
              Our Story
            </span>

            <h2 id="about-heading" className="text-display-lg font-heading font-bold text-kumfora-charcoal mb-6">
              Made with <span className="text-kumfora-hotPink">Love</span>, Backed by Science
            </h2>

            <p className="text-body-lg text-kumfora-slate mb-6 leading-relaxed">
              Kumfora was born from a simple belief: every girl deserves period care that&apos;s as thoughtful as she is.
              No harsh chemicals, no uncomfortable bulk — just pure, reliable comfort.
            </p>

            <p className="text-body text-kumfora-gray mb-10 leading-relaxed">
              Our pads are designed in consultation with pediatric dermatologists and tested by real girls.
              From the ultra-soft top sheet to the leak-guard barriers, every detail is crafted for confidence.
            </p>

            <div className="flex flex-wrap gap-6 mb-10">
              <div className="flex items-center gap-3 text-body-sm text-kumfora-slate">
                <div className="w-10 h-10 rounded-xl bg-kumfora-sageLight flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-kumfora-sage" />
                </div>
                <span className="font-semibold">Plant-based materials</span>
              </div>
              <div className="flex items-center gap-3 text-body-sm text-kumfora-slate">
                <div className="w-10 h-10 rounded-xl bg-kumfora-blush flex items-center justify-center">
                  <Heart className="w-5 h-5 text-kumfora-hotPink" />
                </div>
                <span className="font-semibold">Designed for girls</span>
              </div>
              <div className="flex items-center gap-3 text-body-sm text-kumfora-slate">
                <div className="w-10 h-10 rounded-xl bg-kumfora-lavender/50 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-kumfora-hotPink" />
                </div>
                <span className="font-semibold">Science-backed</span>
              </div>
            </div>

            <Link href="/about" className="btn-secondary">
              Read Our Full Story
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3]">
              <div className="relative z-10 h-full rounded-3xl overflow-hidden bg-kumfora-blush border border-kumfora-rose/10 shadow-card">
                <div className="h-full flex items-center justify-center p-8">
                  <div className="text-center max-w-md">
                    <div className="w-28 h-28 rounded-3xl bg-white flex items-center justify-center mx-auto mb-8 shadow-card">
                      <Sparkles className="w-14 h-14 text-kumfora-hotPink" />
                    </div>
                    <h3 className="text-2xl font-bold text-kumfora-charcoal mb-4">Designed for Her</h3>
                    <p className="text-body text-kumfora-slate leading-relaxed">
                      Every curve, every layer, every detail — thoughtfully crafted for young girls&apos; comfort and confidence.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
