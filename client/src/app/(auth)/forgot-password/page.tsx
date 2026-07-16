'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    const { error: err } = await resetPassword(email);
    setIsLoading(false);
    if (err) {
      setError(err);
    } else {
      setSent(true);
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-kumfora-cream/30 px-4">
        <div className="text-center max-w-md card p-8 lg:p-12">
          <div className="w-20 h-20 rounded-full bg-kumfora-sageLight flex items-center justify-center mx-auto mb-6">
            <Mail className="w-10 h-10 text-kumfora-sage" />
          </div>
          <h1 className="text-display-sm font-display font-medium text-kumfora-charcoal mb-3">
            Check your email
          </h1>
          <p className="text-body text-kumfora-slate mb-6">
            We sent a password reset link to <strong>{email}</strong>. Please check your inbox.
          </p>
          <Link href="/login">
            <Button fullWidth size="lg" variant="secondary">
              Back to Login
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-kumfora-cream/30 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Image src="/logo.png" alt="Kumfora" width={160} height={60} className="mx-auto mb-6" />
          <h1 className="text-display-sm font-display font-medium text-kumfora-charcoal mb-2">
            Forgot your password?
          </h1>
          <p className="text-body text-kumfora-gray">
            Enter your email and we&apos;ll send you a reset link
          </p>
        </div>

        {error && (
          <div className="mb-4 p-4 rounded-xl bg-kumfora-rose/10 border border-kumfora-rose/20" role="alert">
            <p className="text-body-sm text-kumfora-rose">{error}</p>
          </div>
        )}

        <div className="card p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              leftIcon={<Mail className="w-5 h-5" />}
            />
            <Button type="submit" fullWidth isLoading={isLoading} size="lg">
              Send Reset Link
            </Button>
          </form>

          <Link
            href="/login"
            className="flex items-center justify-center gap-2 mt-6 text-body-sm text-kumfora-terracotta hover:text-kumfora-hotPink transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
