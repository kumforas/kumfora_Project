import { Shield, Leaf, Sparkles, Heart } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: "Dermatologically Tested",
      desc: "Safe for sensitive young skin",
    },
    { icon: Leaf, title: "Eco-Friendly", desc: "Biodegradable wrappers" },
    {
      icon: Sparkles,
      title: "Ultra-Soft Comfort",
      desc: "Cloud-like top sheet",
    },
    {
      icon: Heart,
      title: "Leak-Guard Protection",
      desc: "Confidence all day long",
    },
  ];

  return (
    <div className="container-main relative my-10 lg:my-10">
      <div className="lg:absolute lg:-top-24 mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-18">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="p-4 sm:p-6 rounded-3xl bg-white border border-kumfora-rose/10"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-kumfora-blush flex items-center justify-center mb-4 sm:mb-5">
              <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-kumfora-hotPink" />
            </div>
            <h3 className="text-heading-sm font-bold text-kumfora-charcoal mb-2">
              {feature.title}
            </h3>
            <p className="text-body-sm text-kumfora-gray leading-relaxed">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
