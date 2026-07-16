'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CreditCard, Truck, Shield, RotateCcw, Check, ChevronRight, Mail, MapPin, Phone, User, Lock } from 'lucide-react';
import Image from 'next/image';
import { useCartStore } from '@/lib/store';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { formatPrice, cn } from '@/lib/utils';
import { SHIPPING_FREE_THRESHOLD, SHIPPING_FLAT_RATE, CHECKOUT_STEPS } from '@/constants';

const steps = CHECKOUT_STEPS.map((s) => {
  const icons = { shipping: Truck, payment: CreditCard, review: Shield } as const;
  return { ...s, icon: icons[s.id as keyof typeof icons] };
});

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, clearCart } = useCartStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    paymentMethod: 'cod',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    cardName: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const subtotal = getSubtotal();
  const shipping = subtotal >= SHIPPING_FREE_THRESHOLD ? 0 : SHIPPING_FLAT_RATE;
  const total = subtotal + shipping;

  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart');
    }
  }, [items.length, router]);

  if (items.length === 0) {
    return null;
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 0) {
      if (!formData.email) newErrors.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.phone) newErrors.phone = 'Phone is required';
      else if (!/^[6-9]\d{9}$/.test(formData.phone)) newErrors.phone = 'Invalid Indian phone number';
      if (!formData.address) newErrors.address = 'Address is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.state) newErrors.state = 'State is required';
      if (!formData.pincode) newErrors.pincode = 'Pincode is required';
      else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Invalid pincode';
    }

    if (step === 1 && formData.paymentMethod === 'card') {
      if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
      else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) newErrors.cardNumber = 'Invalid card number';
      if (!formData.cardExpiry) newErrors.cardExpiry = 'Expiry date is required';
      else if (!/^\d{2}\/\d{2}$/.test(formData.cardExpiry)) newErrors.cardExpiry = 'Invalid format (MM/YY)';
      if (!formData.cardCvv) newErrors.cardCvv = 'CVV is required';
      else if (!/^\d{3}$/.test(formData.cardCvv)) newErrors.cardCvv = 'Invalid CVV';
      if (!formData.cardName) newErrors.cardName = 'Name on card is required';
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Failed to place order');
      }

      setOrderId(result.data.order_id);
      clearCart();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setSubmitError(message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <main className="pt-16 min-h-screen bg-kumfora-cream/30">
      {orderId ? (
        <OrderSuccess orderId={orderId} onContinue={() => router.push('/')} />
      ) : (
        <div className="container-main py-8 lg:py-12">
          {/* Progress Indicator */}
          <nav className="mb-8" aria-label="Checkout progress">
            <div className="relative">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-kumfora-lightGray -translate-y-1/2" />
              <div
                className="absolute top-1/2 left-0 h-1 bg-kumfora-terracotta -translate-y-1/2 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
              <ol className="flex justify-between relative z-10" role="list">
                {steps.map((step, index) => (
                  <li key={step.id} className="flex flex-col items-center">
                    <div
                      className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center text-body-sm font-medium transition-all',
                        index < currentStep
                          ? 'bg-kumfora-terracotta text-white'
                          : index === currentStep
                          ? 'bg-kumfora-terracotta text-white ring-4 ring-kumfora-blush'
                          : 'bg-kumfora-lightGray text-kumfora-gray'
                      )}
                      aria-current={index === currentStep ? 'step' : undefined}
                    >
                      {index < currentStep ? <Check className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
                    </div>
                    <span className={cn('text-caption font-medium mt-2', index <= currentStep ? 'text-kumfora-charcoal' : 'text-kumfora-gray')}>
                      {step.label}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <div className="card p-6 lg:p-8">
                <header className="mb-8">
                  <h2 className="text-heading-lg font-display font-medium text-kumfora-charcoal">
                    {steps[currentStep].label} Information
                  </h2>
                  <p className="text-body text-kumfora-gray mt-1">
                    {currentStep === 0 && 'Where should we send your order?'}
                    {currentStep === 1 && 'How would you like to pay?'}
                    {currentStep === 2 && 'Please review your order before placing it.'}
                  </p>
                </header>

                {currentStep === 0 && (
                  <ShippingForm formData={formData} errors={errors} onChange={handleInputChange} />
                )}

                {currentStep === 1 && (
                  <PaymentForm formData={formData} errors={errors} onChange={handleInputChange} />
                )}

                {currentStep === 2 && (
                  <ReviewForm formData={formData} items={items} subtotal={subtotal} shipping={shipping} total={total} />
                )}

                {/* Navigation */}
                {submitError && (
                  <div className="mt-6 p-4 rounded-xl bg-kumfora-rose/10 border border-kumfora-rose/20" role="alert">
                    <p className="text-body-sm text-kumfora-rose">{submitError}</p>
                  </div>
                )}
                <div className="flex justify-between mt-8 pt-6 border-t border-kumfora-lightGray/50">
                  {currentStep > 0 && (
                    <Button type="button" variant="secondary" onClick={() => setCurrentStep(currentStep - 1)}>
                      <ChevronRight className="w-4 h-4 rotate-180" /> Back
                    </Button>
                  )}
                  {currentStep < 2 ? (
                    <Button type="submit" disabled={isProcessing}>
                      Continue <ChevronRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button type="submit" size="lg" disabled={isProcessing} leftIcon={<Lock className="w-5 h-5" />}>
                      {isProcessing ? 'Placing Order...' : `Place Order — ${formatPrice(total)}`}
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <aside className="sticky top-24 card p-6 space-y-6">
                <h3 className="text-heading-md font-display font-medium text-kumfora-charcoal">Order Summary</h3>

                <ul className="space-y-4 max-h-60 overflow-y-auto pr-2" role="list">
                  {items.map((item) => (
                    <li key={item.product.id} className="flex gap-3">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-kumfora-blush flex-shrink-0 relative">
                        <Image src={item.product.thumbnail} alt="" fill className="object-cover" sizes="64px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-body-sm font-medium text-kumfora-charcoal truncate">{item.product.name}</p>
                        <p className="text-body-sm text-kumfora-gray">Qty: {item.quantity} × {formatPrice(item.product.price)}</p>
                      </div>
                      <p className="text-body font-medium text-kumfora-charcoal whitespace-nowrap">{formatPrice(item.product.price * item.quantity)}</p>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-kumfora-lightGray/50 pt-4 space-y-3">
                  <div className="flex justify-between text-body text-kumfora-slate">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-body text-kumfora-slate">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? 'text-kumfora-sage font-medium' : ''}>
                      {shipping === 0 ? 'Free' : formatPrice(shipping)}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-caption text-kumfora-terracotta text-center">
                      Add {formatPrice(SHIPPING_FREE_THRESHOLD - subtotal)} for free shipping
                    </p>
                  )}
                  <div className="divider" />
                  <div className="flex justify-between text-heading-md font-semibold text-kumfora-charcoal">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 text-caption text-kumfora-sage pt-4 border-t border-kumfora-lightGray/50">
                  <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5" /> Secure checkout</span>
                  <span className="flex items-center gap-1"><Truck className="w-3.5 h-3.5" /> Free shipping over ₹499</span>
                  <span className="flex items-center gap-1"><RotateCcw className="w-3.5 h-3.5" /> 30-day returns</span>
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
    <div className="space-y-6">
      <h3 className="text-heading-sm font-medium text-kumfora-charcoal">Contact Information</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => onChange('email', e.target.value)}
          error={errors.email}
          placeholder="you@example.com"
          required
          leftIcon={<Mail className="w-5 h-5" />}
        />
        <Input
          label="Phone"
          type="number"
          value={formData.phone}
          onChange={(e) => onChange('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
          error={errors.phone}
          placeholder="9876543210"
          required
          leftIcon={<Phone className="w-5 h-5" />}
        />
      </div>

      <h3 className="text-heading-sm font-medium text-kumfora-charcoal">Shipping Address</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        <Input
          label="First Name"
          value={formData.firstName}
          onChange={(e) => onChange('firstName', e.target.value)}
          error={errors.firstName}
          required
          leftIcon={<User className="w-5 h-5" />}
        />
        <Input
          label="Last Name"
          value={formData.lastName}
          onChange={(e) => onChange('lastName', e.target.value)}
          error={errors.lastName}
          required
        />
      </div>
      <Input
        label="Address"
        value={formData.address}
        onChange={(e) => onChange('address', e.target.value)}
        error={errors.address}
        placeholder="House/Flat, Building, Street, Area"
        required
        leftIcon={<MapPin className="w-5 h-5" />}
      />
      <div className="grid sm:grid-cols-3 gap-4">
        <Input
          label="City"
          value={formData.city}
          onChange={(e) => onChange('city', e.target.value)}
          error={errors.city}
          required
        />
        <Select
          label="State"
          value={formData.state}
          onChange={(e) => onChange('state', e.target.value)}
          error={errors.state}
          placeholder="Select state"
          required
          options={[
            { value: '', label: 'Select State', disabled: true },
            { value: 'MH', label: 'Maharashtra' },
            { value: 'DL', label: 'Delhi' },
            { value: 'KA', label: 'Karnataka' },
            { value: 'TN', label: 'Tamil Nadu' },
            { value: 'GJ', label: 'Gujarat' },
            { value: 'UP', label: 'Uttar Pradesh' },
            { value: 'WB', label: 'West Bengal' },
            { value: 'RJ', label: 'Rajasthan' },
            { value: 'OTHER', label: 'Other' },
          ]}
        />
        <Input
          label="Pincode"
          type="number"
          value={formData.pincode}
          onChange={(e) => onChange('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))}
          error={errors.pincode}
          placeholder="400001"
          required
        />
      </div>
    </div>
  );
}

function PaymentForm({
  formData,
  errors,
  onChange,
}: {
  formData: any;
  errors: Record<string, string>;
  onChange: (field: string, value: string) => void;
}) {
  return (
    <div className="space-y-6">
      <h3 className="text-heading-sm font-medium text-kumfora-charcoal">Payment Method</h3>

      <div className="space-y-3" role="radiogroup" aria-label="Payment method">
        <label className={cn(
          'relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all',
          formData.paymentMethod === 'cod'
            ? 'border-kumfora-terracotta bg-kumfora-blush/30'
            : 'border-kumfora-lightGray hover:border-kumfora-rose'
        )}>
          <input
            type="radio"
            name="paymentMethod"
            value="cod"
            checked={formData.paymentMethod === 'cod'}
            onChange={(e) => onChange('paymentMethod', e.target.value)}
            className="sr-only"
          />
          <div className="absolute inset-0 rounded-xl bg-kumfora-terracotta/5 opacity-0" aria-hidden="true" />
          <div className="relative flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-kumfora-blush flex items-center justify-center">
              <span className="text-body-sm font-bold text-kumfora-terracotta">COD</span>
            </div>
            <div>
              <p className="font-medium text-kumfora-charcoal">Cash on Delivery</p>
              <p className="text-body-sm text-kumfora-gray">Pay when you receive your order</p>
            </div>
          </div>
          <div className={cn(
            'absolute right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all',
            formData.paymentMethod === 'cod'
              ? 'border-kumfora-terracotta bg-kumfora-terracotta'
              : 'border-kumfora-lightGray'
          )}>
            {formData.paymentMethod === 'cod' && <Check className="w-4 h-4 text-white" />}
          </div>
        </label>

        <label className={cn(
          'relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all',
          formData.paymentMethod === 'card'
            ? 'border-kumfora-terracotta bg-kumfora-blush/30'
            : 'border-kumfora-lightGray hover:border-kumfora-rose'
        )}>
          <input
            type="radio"
            name="paymentMethod"
            value="card"
            checked={formData.paymentMethod === 'card'}
            onChange={(e) => onChange('paymentMethod', e.target.value)}
            className="sr-only"
          />
          <div className="relative flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-kumfora-blush flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-kumfora-terracotta" />
            </div>
            <div>
              <p className="font-medium text-kumfora-charcoal">Credit / Debit Card</p>
              <p className="text-body-sm text-kumfora-gray">Secure payment via Razorpay</p>
            </div>
          </div>
          <div className={cn(
            'absolute right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all',
            formData.paymentMethod === 'card'
              ? 'border-kumfora-terracotta bg-kumfora-terracotta'
              : 'border-kumfora-lightGray'
          )}>
            {formData.paymentMethod === 'card' && <Check className="w-4 h-4 text-white" />}
          </div>
        </label>
      </div>

      {formData.paymentMethod === 'card' && (
        <div className="space-y-4 pt-4 border-t border-kumfora-lightGray/50">
          <h4 className="text-heading-sm font-medium text-kumfora-charcoal">Card Details</h4>
          <Input
            label="Card Number"
            value={formData.cardNumber}
            onChange={(e) => onChange('cardNumber', e.target.value.replace(/\D/g, '').slice(0, 16))}
            error={errors.cardNumber}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            leftIcon={<CreditCard className="w-5 h-5" />}
          />
          <div className="grid sm:grid-cols-3 gap-4">
            <Input
              label="Expiry (MM/YY)"
              value={formData.cardExpiry}
              onChange={(e) => onChange('cardExpiry', e.target.value.replace(/\D/g, '').slice(0, 4).replace(/(\d{2})(\d{2})/, '$1/$2'))}
              error={errors.cardExpiry}
              placeholder="12/25"
              maxLength={5}
            />
            <Input
              label="CVV"
              type="password"
              value={formData.cardCvv}
              onChange={(e) => onChange('cardCvv', e.target.value.replace(/\D/g, '').slice(0, 3))}
              error={errors.cardCvv}
              placeholder="123"
              maxLength={3}
            />
            <Input
              label="Name on Card"
              value={formData.cardName}
              onChange={(e) => onChange('cardName', e.target.value)}
              error={errors.cardName}
              placeholder="Jane Doe"
            />
          </div>
        </div>
      )}
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
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <h4 className="text-heading-sm font-medium text-kumfora-charcoal mb-3">Shipping Address</h4>
          <address className="text-body text-kumfora-slate not-italic space-y-1">
            <p>{formData.firstName} {formData.lastName}</p>
            <p>{formData.address}</p>
            <p>{formData.city}, {formData.state} {formData.pincode}</p>
            <p>India</p>
            <p>Phone: {formData.phone}</p>
            <p>Email: {formData.email}</p>
          </address>
        </div>
        <div>
          <h4 className="text-heading-sm font-medium text-kumfora-charcoal mb-3">Payment Method</h4>
          <p className="text-body text-kumfora-slate">
            {formData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Credit / Debit Card'}
          </p>
          {formData.paymentMethod === 'card' && (
            <p className="text-body-sm text-kumfora-gray mt-1">Ending in {formData.cardNumber.slice(-4)}</p>
          )}
        </div>
      </div>

      <h4 className="text-heading-sm font-medium text-kumfora-charcoal">Order Items</h4>
      <ul className="space-y-3" role="list">
        {items.map((item) => (
          <li key={item.product.id} className="flex justify-between text-body text-kumfora-slate">
            <span>{item.product.name} × {item.quantity}</span>
            <span>{formatPrice(item.product.price * item.quantity)}</span>
          </li>
        ))}
      </ul>

      <div className="border-t border-kumfora-lightGray/50 pt-4 space-y-2">
        <div className="flex justify-between text-body text-kumfora-slate">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-body text-kumfora-slate">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
        </div>
        <div className="flex justify-between text-heading-md font-semibold text-kumfora-charcoal">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );
}

function OrderSuccess({ orderId, onContinue }: { orderId: string; onContinue: () => void }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md card p-8 lg:p-12">
        <div className="w-20 h-20 rounded-full bg-kumfora-sageLight flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-kumfora-sage" />
        </div>
        <h1 className="text-display-md font-display font-medium text-kumfora-charcoal mb-3">Order Placed!</h1>
        <p className="text-body-lg text-kumfora-slate mb-2">Thank you for your order.</p>
        <p className="text-body text-kumfora-gray mb-6">Your order ID is <strong className="text-kumfora-charcoal">{orderId}</strong></p>
        <p className="text-body-sm text-kumfora-gray mb-8">A confirmation email has been sent to your email address.</p>
        <Button onClick={onContinue} size="lg" className="w-full sm:w-auto">
          Continue Shopping
        </Button>
      </div>
    </div>
  );
}
