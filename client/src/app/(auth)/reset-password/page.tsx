'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Eye, EyeOff, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';

export default function ResetPasswordPage() {
  const router = useRouter();
  const { updatePassword } = useAuth();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    const { error: err } = await updatePassword(password);
    setIsLoading(false);

    if (err) {
      setError(err);
    } else {
      setSuccess(true);
      setTimeout(() => router.push('/login'), 3000);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-kumfora-cream/30 px-4">
        <div className="text-center max-w-md card p-8 lg:p-12">
          <div className="w-20 h-20 rounded-full bg-kumfora-sageLight flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-kumfora-sage" />
          </div>
          <h1 className="text-display-sm font-display font-medium text-kumfora-charcoal mb-3">
            Password updated!
          </h1>
          <p className="text-body text-kumfora-slate">
            Redirecting you to login...
          </p>
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
            Set new password
          </h1>
          <p className="text-body text-kumfora-gray">
            Choose a strong password for your account
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
              label="New Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            <Input
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter password"
              required
              leftIcon={<Lock className="w-5 h-5" />}
            />
            <Button type="submit" fullWidth isLoading={isLoading} size="lg">
              Update Password
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
