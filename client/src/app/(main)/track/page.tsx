'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Package, Truck, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import type { Order } from '@/types';

const STATUS_STEPS: Record<Order['status'], number> = {
  pending: 0,
  confirmed: 1,
  shipped: 2,
  delivered: 3,
  cancelled: -1,
};

const TRACKING_STEPS = [
  { icon: CheckCircle, label: 'Order Placed' },
  { icon: Package, label: 'Confirmed' },
  { icon: Truck, label: 'Shipped' },
  { icon: CheckCircle, label: 'Delivered' },
];

export default function TrackPage() {
  const [orderId, setOrderId] = useState('');
  const [result, setResult] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/orders?orderId=${encodeURIComponent(orderId.trim())}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Order not found');
      }

      setResult(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const currentStep = result ? STATUS_STEPS[result.status] : -1;

  return (
    <main className="pt-16 min-h-screen bg-kumfora-cream/30">
      <header className="bg-white border-b border-kumfora-lightGray/50 pt-16 sm:pt-32 pb-8 sm:pb-12">
        <div className="container-main max-w-3xl">
          <nav className="flex items-center gap-2 text-body-sm text-kumfora-gray mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-kumfora-hotPink">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-kumfora-charcoal font-medium" aria-current="page">Track Order</span>
          </nav>
          <h1 className="text-display-lg font-display font-medium text-kumfora-charcoal">Track Your Order</h1>
          <p className="text-body text-kumfora-gray mt-2">Enter your order ID to see the latest status.</p>
        </div>
      </header>

      <div className="container-main py-6 sm:py-12 max-w-xl">
        <div className="card p-5 sm:p-8">
          <form onSubmit={handleTrack} className="space-y-4">
            <Input
              label="Order ID"
              placeholder="KMF-ORD-001"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              leftIcon={<Search className="w-5 h-5" />}
              required
            />
            <Button type="submit" className="w-full" isLoading={isLoading}>
              Track Order
            </Button>
          </form>

          {error && (
            <div className="mt-6 p-4 rounded-xl bg-kumfora-rose/10 border border-kumfora-rose/20" role="alert">
              <div className="flex items-center gap-2">
                <XCircle className="w-5 h-5 text-kumfora-rose shrink-0" />
                <p className="text-body-sm text-kumfora-rose">{error}</p>
              </div>
            </div>
          )}

          {result && (
            <div className="mt-8 space-y-6">
              <div className="divider" />

              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-heading-sm sm:text-heading-md font-display font-medium text-kumfora-charcoal min-w-0 truncate">
                  Order {result.order_id}
                </h2>
                <span className={`px-3 py-1 rounded-full text-body-sm font-medium ${
                  result.status === 'delivered'
                    ? 'bg-kumfora-sageLight text-kumfora-sage'
                    : result.status === 'cancelled'
                    ? 'bg-kumfora-rose/10 text-kumfora-rose'
                    : 'bg-kumfora-blush text-kumfora-terracotta'
                }`}>
                  {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
                </span>
              </div>

              <div className="space-y-4">
                {TRACKING_STEPS.map((step, i) => {
                  const isDone = currentStep >= 0 && i <= currentStep;
                  const isCurrent = i === currentStep;

                  return (
                    <div key={i} className="flex items-start gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        isDone
                          ? 'bg-kumfora-sageLight text-kumfora-sage'
                          : 'bg-kumfora-lightGray text-kumfora-gray'
                      } ${isCurrent ? 'ring-2 ring-kumfora-sage ring-offset-2' : ''}`}>
                        <step.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className={`text-body font-medium ${isDone ? 'text-kumfora-charcoal' : 'text-kumfora-gray'}`}>
                          {step.label}
                        </p>
                        {isCurrent && (
                          <p className="text-body-sm text-kumfora-sage">
                            {result.status === 'pending' && 'Your order is being processed'}
                            {result.status === 'confirmed' && 'Order confirmed and being prepared'}
                            {result.status === 'shipped' && 'On the way to you'}
                            {result.status === 'delivered' && 'Delivered successfully'}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}

                {result.status === 'cancelled' && (
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-kumfora-rose/10 text-kumfora-rose">
                      <XCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-body font-medium text-kumfora-rose">Cancelled</p>
                      <p className="text-body-sm text-kumfora-gray">This order has been cancelled</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-kumfora-lightGray/50 text-body-sm text-kumfora-gray space-y-1">
                <p>Placed on {new Date(result.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                <p>Total: ₹{result.total.toLocaleString('en-IN')}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
