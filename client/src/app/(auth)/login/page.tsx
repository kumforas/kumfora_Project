"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const { signIn } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    const { error: err } = await signIn({ email, password });
    setIsLoading(false);
    if (err) {
      setError(err);
    } else {
      router.push(redirect);
    }
  };

  return (
    <div className="min-h-screen flex bg-kumfora-cream/30">
      {/* Left - Form */}
      <div className="flex-1 flex items-center justify-center px-5 sm:px-8 py-8 sm:py-12 lg:py-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex justify-center mb-6">
            <Image src="/logo.png" alt="Kumfora" width={140} height={52} className="h-auto" priority />
          </div>

          <div className="mb-6 sm:mb-8">
            <h1 className="text-display-sm font-display font-medium text-kumfora-charcoal mb-2">
              Welcome back
            </h1>
            <p className="text-body text-kumfora-gray">
              Sign in to your Kumfora account
            </p>
          </div>

          {error && (
            <div
              className="mb-4 p-3 sm:p-4 rounded-xl bg-kumfora-rose/10 border border-kumfora-rose/20"
              role="alert"
            >
              <p className="text-body-sm text-kumfora-rose">{error}</p>
            </div>
          )}

          <form onSubmit={handleEmailLogin} className="space-y-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              leftIcon={<Mail className="w-5 h-5" />}
            />
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              leftIcon={<Lock className="w-5 h-5" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-kumfora-gray hover:text-kumfora-charcoal transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              }
            />
            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-body-sm text-kumfora-terracotta hover:text-kumfora-hotPink transition-colors"
              >
                Forgot password?
              </Link>
            </div>
            <Button type="submit" fullWidth isLoading={isLoading} size="lg">
              Sign In
            </Button>
          </form>

          {/* Register Link */}
          <p className="text-center text-body text-kumfora-gray mt-6 sm:mt-8 pb-safe">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-kumfora-terracotta hover:text-kumfora-hotPink transition-colors"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>

      {/* Right - Branding (desktop only) */}
      <div className="hidden lg:flex lg:flex-1 bg-kumfora-blush items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-kumfora-hotPink/10 to-kumfora-terracotta/10" />
        <div className="relative text-center px-12">
          <Image
            src="/logo.png"
            alt="Kumfora"
            width={200}
            height={75}
            className="mx-auto mb-6"
          />
          <p className="text-heading-md font-display text-kumfora-charcoal/80">
            Comfortable Period Care for Girls
          </p>
        </div>
      </div>
    </div>
  );
}
