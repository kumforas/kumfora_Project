"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Truck,
  Shield,
  RotateCcw,
  Check,
  ChevronRight,
  Mail,
  MapPin,
  Phone,
  User,
  MessageCircle,
} from "lucide-react";
import Image from "next/image";
import { useCartStore } from "@/lib/store";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { formatPrice, cn } from "@/lib/utils";
import {
  SHIPPING_FREE_THRESHOLD,
  SHIPPING_FLAT_RATE,
  CHECKOUT_STEPS,
} from "@/constants";
import { useAuth } from "@/contexts/AuthContext";
import { generateWhatsAppUrl } from "@/lib/whatsapp";

const steps = CHECKOUT_STEPS.map((s) => {
  const icons = {
    shipping: Truck,
    payment: MessageCircle,
    review: Shield,
  } as const;
  return { ...s, icon: icons[s.id as keyof typeof icons] };
});

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, clearCart } = useCartStore();
  const { user, loading: authLoading } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    paymentMethod: "cod",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const subtotal = getSubtotal();
  const shipping = subtotal >= SHIPPING_FREE_THRESHOLD ? 0 : SHIPPING_FLAT_RATE;
  const total = subtotal + shipping;

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?redirect=/checkout");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart");
    }
  }, [items.length, router]);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        email: user.email || prev.email,
        firstName: user.user_metadata?.first_name || prev.firstName,
        lastName: user.user_metadata?.last_name || prev.lastName,
        phone: user.user_metadata?.phone || prev.phone,
      }));
    }
  }, [user]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-kumfora-cream/30">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-kumfora-terracotta border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-body text-kumfora-gray">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || items.length === 0) {
    return null;
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 0) {
      if (!formData.email) newErrors.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        newErrors.email = "Invalid email";
      if (!formData.firstName) newErrors.firstName = "First name is required";
      if (!formData.lastName) newErrors.lastName = "Last name is required";
      if (!formData.phone) newErrors.phone = "Phone is required";
      else if (!/^[6-9]\d{9}$/.test(formData.phone))
        newErrors.phone = "Invalid Indian phone number";
      if (!formData.address) newErrors.address = "Address is required";
      if (!formData.city) newErrors.city = "City is required";
      if (!formData.state) newErrors.state = "State is required";
      if (!formData.pincode) newErrors.pincode = "Pincode is required";
      else if (!/^\d{6}$/.test(formData.pincode))
        newErrors.pincode = "Invalid pincode";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
      return;
    }

    setIsProcessing(true);
    setSubmitError(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/orders`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            phone: formData.phone,
            first_name: formData.firstName,
            last_name: formData.lastName,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
            payment_method: formData.paymentMethod,
            items: items,
            subtotal,
            shipping,
            total,
          }),
        },
      );

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.error || "Failed to place order");
      }

      const newOrderId = result.data.order_id;

      // Open WhatsApp with order details
      const whatsappUrl = generateWhatsAppUrl({
        orderId: newOrderId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        paymentMethod: formData.paymentMethod,
        items,
        subtotal,
        shipping,
        total,
      });
      window.open(whatsappUrl, "_blank");

      setOrderId(newOrderId);
      clearCart();
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      setSubmitError(message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <main className="pt-16 min-h-screen bg-kumfora-cream/30 overflow-hidden">
      {orderId ? (
        <OrderSuccess orderId={orderId} onContinue={() => router.push("/")} />
      ) : (
        <div className="container-main py-5 sm:py-8 lg:py-12">
          {/* Progress Indicator */}
          <nav className="mb-5 sm:mb-8" aria-label="Checkout progress">
            <div className="relative">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-kumfora-lightGray -translate-y-1/2" />
              <div
                className="absolute top-1/2 left-0 h-1 bg-kumfora-terracotta -translate-y-1/2 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
              <ol className="flex justify-between relative z-10" role="list">
                {steps.map((step, index) => (
                  <li
                    key={step.id}
                    className="flex flex-col items-center min-w-0"
                  >
                    <div
                      className={cn(
                        "w-7 h-7 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-[10px] sm:text-body-sm font-medium transition-all",
                        index < currentStep
                          ? "bg-kumfora-terracotta text-white"
                          : index === currentStep
                            ? "bg-kumfora-terracotta text-white ring-1 sm:ring-4 ring-kumfora-blush"
                            : "bg-kumfora-lightGray text-kumfora-gray",
                      )}
                      aria-current={index === currentStep ? "step" : undefined}
                    >
                      {index < currentStep ? (
                        <Check className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                      ) : (
                        <step.icon className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                      )}
                    </div>
                    <span
                      className={cn(
                        "text-[9px] sm:text-caption font-medium mt-1 sm:mt-2 truncate max-w-[50px] sm:max-w-none text-center",
                        index <= currentStep
                          ? "text-kumfora-charcoal"
                          : "text-kumfora-gray",
                      )}
                    >
                      {step.label}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <form
            onSubmit={handleSubmit}
            className="grid lg:grid-cols-3 gap-5 lg:gap-12 min-w-0"
          >
            {/* Form Section */}
            <div className="lg:col-span-2 min-w-0">
              <div className="card p-4 sm:p-6 lg:p-8 overflow-hidden">
                <header className="mb-5 sm:mb-8">
                  <h2 className="text-heading-sm sm:text-heading-lg font-display font-medium text-kumfora-charcoal">
                    {steps[currentStep].label} Information
                  </h2>
                  <p className="text-body-sm sm:text-body text-kumfora-gray mt-1">
                    {currentStep === 0 && "Where should we send your order?"}
                    {currentStep === 1 && "Confirm your payment method"}
                    {currentStep === 2 &&
                      "Please review your order before placing it."}
                  </p>
                </header>

                {currentStep === 0 && (
                  <ShippingForm
                    formData={formData}
                    errors={errors}
                    onChange={handleInputChange}
                  />
                )}

                {currentStep === 1 && <PaymentForm />}

                {currentStep === 2 && (
                  <ReviewForm
                    formData={formData}
                    items={items}
                    subtotal={subtotal}
                    shipping={shipping}
                    total={total}
                  />
                )}

                {/* Navigation */}
                {submitError && (
                  <div
                    className="mt-4 sm:mt-6 p-3 sm:p-4 rounded-xl bg-kumfora-rose/10 border border-kumfora-rose/20"
                    role="alert"
                  >
                    <p className="text-xs sm:text-body-sm text-kumfora-rose">
                      {submitError}
                    </p>
                  </div>
                )}
                <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-kumfora-lightGray/50">
                  {currentStep > 0 && (
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className="w-full sm:w-auto justify-center"
                    >
                      <ChevronRight className="w-4 h-4 rotate-180" /> Back
                    </Button>
                  )}
                  {currentStep < 2 ? (
                    <Button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full sm:w-auto justify-center"
                    >
                      Continue <ChevronRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isProcessing}
                      leftIcon={<MessageCircle className="w-5 h-5" />}
                      className="w-full sm:w-auto justify-center"
                    >
                      <span className="truncate">
                        {isProcessing
                          ? "Placing Order..."
                          : `Place Order — ${formatPrice(total)}`}
                      </span>
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1 min-w-0">
              <aside className="lg:sticky lg:top-24 card p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-hidden">
                <h3 className="text-heading-sm sm:text-heading-md font-display font-medium text-kumfora-charcoal">
                  Order Summary
                </h3>

                <ul
                  className="space-y-3 sm:space-y-4 max-h-48 sm:max-h-60 overflow-y-auto pr-2"
                  role="list"
                >
                  {items.map((item) => (
                    <li key={item.product.id} className="flex gap-2.5 sm:gap-3">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden bg-kumfora-blush flex-shrink-0 relative">
                        <Image
                          src={item.product.thumbnail}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-body-sm font-medium text-kumfora-charcoal truncate">
                          {item.product.name}
                        </p>
                        <p className="text-xs sm:text-body-sm text-kumfora-gray">
                          Qty: {item.quantity} ×{" "}
                          {formatPrice(item.product.price)}
                        </p>
                      </div>
                      <p className="text-body-sm sm:text-body font-medium text-kumfora-charcoal whitespace-nowrap">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-kumfora-lightGray/50 pt-3 sm:pt-4 space-y-2 sm:space-y-3">
                  <div className="flex justify-between text-body-sm sm:text-body text-kumfora-slate">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-body-sm sm:text-body text-kumfora-slate">
                    <span>Shipping</span>
                    <span
                      className={
                        shipping === 0 ? "text-kumfora-sage font-medium" : ""
                      }
                    >
                      {shipping === 0 ? "Free" : formatPrice(shipping)}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-[11px] sm:text-caption text-kumfora-terracotta text-center">
                      Add {formatPrice(SHIPPING_FREE_THRESHOLD - subtotal)} for
                      free shipping
                    </p>
                  )}
                  <div className="divider" />
                  <div className="flex justify-between text-heading-sm sm:text-heading-md font-semibold text-kumfora-charcoal">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-caption text-kumfora-sage pt-3 sm:pt-4 border-t border-kumfora-lightGray/50">
                  <span className="flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5" /> Secure checkout
                  </span>
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5" /> Free shipping over ₹499
                  </span>
                  <span className="flex items-center gap-1">
                    <RotateCcw className="w-3.5 h-3.5" /> 30-day returns
                  </span>
                </div>
              </aside>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}

function ShippingForm({
  formData,
  errors,
  onChange,
}: {
  formData: any;
  errors: Record<string, string>;
  onChange: (field: string, value: string) => void;
}) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <h3 className="text-body-sm sm:text-heading-sm font-semibold text-kumfora-charcoal uppercase tracking-wide">
        Contact Information
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => onChange("email", e.target.value)}
          error={errors.email}
          placeholder="you@example.com"
          required
          leftIcon={<Mail className="w-5 h-5" />}
        />
        <Input
          label="Phone"
          type="number"
          value={formData.phone}
          onChange={(e) =>
            onChange("phone", e.target.value.replace(/\D/g, "").slice(0, 10))
          }
          error={errors.phone}
          placeholder="9876543210"
          required
          leftIcon={<Phone className="w-5 h-5" />}
        />
      </div>

      <h3 className="text-body-sm sm:text-heading-sm font-semibold text-kumfora-charcoal uppercase tracking-wide">
        Shipping Address
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <Input
          label="First Name"
          value={formData.firstName}
          onChange={(e) => onChange("firstName", e.target.value)}
          error={errors.firstName}
          required
          leftIcon={<User className="w-5 h-5" />}
        />
        <Input
          label="Last Name"
          value={formData.lastName}
          onChange={(e) => onChange("lastName", e.target.value)}
          error={errors.lastName}
          required
        />
      </div>
      <Input
        label="Address"
        value={formData.address}
        onChange={(e) => onChange("address", e.target.value)}
        error={errors.address}
        placeholder="House/Flat, Building, Street, Area"
        required
        leftIcon={<MapPin className="w-5 h-5" />}
      />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <Input
          label="City"
          value={formData.city}
          onChange={(e) => onChange("city", e.target.value)}
          error={errors.city}
          required
        />
        <Select
          label="State"
          value={formData.state}
          onChange={(e) => onChange("state", e.target.value)}
          error={errors.state}
          required
          options={[
            { value: "", label: "Select State", disabled: true },
            { value: "MH", label: "Maharashtra" },
            { value: "DL", label: "Delhi" },
            { value: "KA", label: "Karnataka" },
            { value: "TN", label: "Tamil Nadu" },
            { value: "GJ", label: "Gujarat" },
            { value: "UP", label: "Uttar Pradesh" },
            { value: "WB", label: "West Bengal" },
            { value: "RJ", label: "Rajasthan" },
            { value: "OTHER", label: "Other" },
          ]}
        />
        <Input
          label="Pincode"
          type="number"
          value={formData.pincode}
          onChange={(e) =>
            onChange("pincode", e.target.value.replace(/\D/g, "").slice(0, 6))
          }
          error={errors.pincode}
          placeholder="400001"
          required
        />
      </div>
    </div>
  );
}

function PaymentForm() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <h3 className="text-body-sm sm:text-heading-sm font-semibold text-kumfora-charcoal uppercase tracking-wide">
        Payment Method
      </h3>

      <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border-2 border-kumfora-terracotta bg-kumfora-blush/30">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-kumfora-blush flex items-center justify-center shrink-0">
          <span className="text-xs sm:text-body-sm font-bold text-kumfora-terracotta">
            COD
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-body-sm sm:font-medium text-kumfora-charcoal">
            Cash on Delivery
          </p>
          <p className="text-xs sm:text-body-sm text-kumfora-gray">
            Pay when you receive your order
          </p>
        </div>
        <div className="w-6 h-6 rounded-full border-2 border-kumfora-terracotta bg-kumfora-terracotta flex items-center justify-center shrink-0">
          <Check className="w-4 h-4 text-white" />
        </div>
      </div>

      <div className="p-3 sm:p-4 rounded-xl bg-kumfora-sageLight/50 border border-kumfora-sage/20">
        <p className="text-xs sm:text-body-sm text-kumfora-sage">
          After placing your order, we&apos;ll connect with you on WhatsApp to
          confirm and process your payment.
        </p>
      </div>
    </div>
  );
}

function ReviewForm({
  formData,
  items,
  subtotal,
  shipping,
  total,
}: {
  formData: any;
  items: any[];
  subtotal: number;
  shipping: number;
  total: number;
}) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <h4 className="text-body-sm sm:text-heading-sm font-semibold text-kumfora-charcoal mb-2 sm:mb-3 uppercase tracking-wide">
            Shipping Address
          </h4>
          <address className="text-body-sm sm:text-body text-kumfora-slate not-italic space-y-1">
            <p>
              {formData.firstName} {formData.lastName}
            </p>
            <p>{formData.address}</p>
            <p>
              {formData.city}, {formData.state} {formData.pincode}
            </p>
            <p>India</p>
            <p>Phone: {formData.phone}</p>
            <p>Email: {formData.email}</p>
          </address>
        </div>
        <div>
          <h4 className="text-body-sm sm:text-heading-sm font-semibold text-kumfora-charcoal mb-2 sm:mb-3 uppercase tracking-wide">
            Payment Method
          </h4>
          <p className="text-body-sm sm:text-body text-kumfora-slate">
            Cash on Delivery
          </p>
        </div>
      </div>

      <h4 className="text-body-sm sm:text-heading-sm font-semibold text-kumfora-charcoal uppercase tracking-wide">
        Order Items
      </h4>
      <ul className="space-y-2 sm:space-y-3" role="list">
        {items.map((item) => (
          <li
            key={item.product.id}
            className="flex justify-between text-body-sm sm:text-body text-kumfora-slate gap-2"
          >
            <span className="truncate">
              {item.product.name} × {item.quantity}
            </span>
            <span>{formatPrice(item.product.price * item.quantity)}</span>
          </li>
        ))}
      </ul>

      <div className="border-t border-kumfora-lightGray/50 pt-3 sm:pt-4 space-y-1.5 sm:space-y-2">
        <div className="flex justify-between text-body-sm sm:text-body text-kumfora-slate">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-body-sm sm:text-body text-kumfora-slate">
          <span>Shipping</span>
          <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
        </div>
        <div className="flex justify-between text-heading-sm sm:text-heading-md font-semibold text-kumfora-charcoal">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );
}

function OrderSuccess({
  orderId,
  onContinue,
}: {
  orderId: string;
  onContinue: () => void;
}) {
  return (
    <div className="min-h-[45vh] sm:min-h-[60vh] flex items-center justify-center px-4 py-8">
      <div className="text-center max-w-md card p-5 sm:p-8 lg:p-12">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-kumfora-sageLight flex items-center justify-center mx-auto mb-4 sm:mb-6">
          <Check className="w-8 h-8 sm:w-10 sm:h-10 text-kumfora-sage" />
        </div>
        <h1 className="text-display-sm sm:text-display-md font-display font-medium text-kumfora-charcoal mb-2 sm:mb-3">
          Order Placed!
        </h1>
        <p className="text-body sm:text-body-lg text-kumfora-slate mb-2">
          Thank you for your order.
        </p>
        <p className="text-body-sm sm:text-body text-kumfora-gray mb-2">
          Your order ID is{" "}
          <strong className="text-kumfora-charcoal">{orderId}</strong>
        </p>
        <p className="text-xs sm:text-body-sm text-kumfora-gray mb-5 sm:mb-6">
          We&apos;ve opened WhatsApp to confirm your order. If it didn&apos;t
          open, you can message us manually.
        </p>
        <div className="space-y-3">
          <Button onClick={onContinue} size="lg" className="w-full sm:w-auto">
            Continue Shopping
          </Button>
        </div>
      </div>
    </div>
  );
}
