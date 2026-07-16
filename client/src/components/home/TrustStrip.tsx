import { Truck, Shield, RotateCcw, Headphones, Leaf, Sparkles } from 'lucide-react';

const trustItems = [
  { icon: Truck, title: 'Free Shipping', desc: 'On orders over ₹499' },
  { icon: Shield, title: 'Safe & Tested', desc: 'Dermatologically approved' },
  { icon: RotateCcw, title: 'Easy Returns', desc: '30-day hassle-free' },
  { icon: Headphones, title: '24/7 Support', desc: 'We\'re here to help' },
  { icon: Leaf, title: 'Eco-Friendly', desc: 'Biodegradable wrappers' },
  { icon: Sparkles, title: 'Ultra-Soft', desc: 'Cloud-like comfort' },
];

export function TrustStrip() {
  return (
    <section className="py-16 lg:mt-40 bg-kumfora-charcoal" aria-label="Our promises">
      <div className="container-main">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-10">
          {trustItems.map((item) => (
            <div key={item.title} className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center">
                <item.icon className="w-8 h-8 text-kumfora-rose" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-body font-bold text-white mb-1">{item.title}</h3>
                <p className="text-body-sm text-kumfora-rose/70">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
