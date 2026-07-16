'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Phone, Eye, EyeOff, User, Mail } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';

export default function RegisterPage() {
  const router = useRouter();
  const { signUp } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
  });

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    const { error: err } = await signUp({
      email: form.email,
      password: form.password,
      firstName: form.firstName,
      lastName: form.lastName,
      phone: form.phone,
    });
    setIsLoading(false);

    if (err) {
      setError(err);
    } else {
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen flex bg-kumfora-cream/30">
      {/* Left - Branding (desktop only) */}
      <div className="hidden lg:flex lg:flex-1 bg-kumfora-blush items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-kumfora-hotPink/10 to-kumfora-terracotta/10" />
        <div className="relative text-center px-12">
          <Image src="/logo.png" alt="Kumfora" width={200} height={75} className="mx-auto mb-6" />
          <p className="text-heading-md font-display text-kumfora-charcoal/80">
            Join thousands of happy customers
          </p>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-start sm:items-center justify-center px-5 sm:px-8 py-6 sm:py-10 lg:py-12 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-5">
            <Image src="/logo.png" alt="Kumfora" width={140} height={52} className="h-auto" priority />
          </div>

          <div className="mb-5 sm:mb-8">
            <h1 className="text-display-sm font-display font-medium text-kumfora-charcoal mb-2">
              Create your account
            </h1>
            <p className="text-body text-kumfora-gray">
              Sign up for a better shopping experience
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 sm:p-4 rounded-xl bg-kumfora-rose/10 border border-kumfora-rose/20" role="alert">
              <p className="text-body-sm text-kumfora-rose">{error}</p>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-3.5 sm:space-y-4">
            <div className="grid sm:grid-cols-2 gap-3.5 sm:gap-4">
              <Input
                label="First Name"
                value={form.firstName}
                onChange={(e) => update('firstName', e.target.value)}
                placeholder="Priya"
                required
                leftIcon={<User className="w-5 h-5" />}
              />
              <Input
                label="Last Name"
                value={form.lastName}
                onChange={(e) => update('lastName', e.target.value)}
                placeholder="Sharma"
                required
              />
            </div>
            <Input
              label="Email"
              type="email"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              placeholder="you@example.com"
              required
              leftIcon={<Mail className="w-5 h-5" />}
            />
            <Input
              label="Phone"
              type="number"
              value={form.phone}
              onChange={(e) => update('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
              placeholder="9876543210"
              required
              leftIcon={<Phone className="w-5 h-5" />}
            />
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={(e) => update('password', e.target.value)}
              placeholder="Min. 6 characters"
              required
              leftIcon={<Lock className="w-5 h-5" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-kumfora-gray hover:text-kumfora-charcoal transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              }
            />
            <Button type="submit" fullWidth isLoading={isLoading} size="lg">
              Create Account
            </Button>
          </form>

          <p className="text-center text-body text-kumfora-gray mt-6 sm:mt-8 pb-safe">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-kumfora-terracotta hover:text-kumfora-hotPink transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
