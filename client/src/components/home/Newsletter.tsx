'use client';

import { useState } from 'react';
import { Mail, CheckCircle, Heart } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useFormSubmission } from '@/hooks/useFormSubmission';

export function Newsletter() {
  const { status, error: submitError, submit, reset } = useFormSubmission('/api/newsletter');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await submit({ email });
    if (ok) setEmail('');
  };

  return (
    <section className="py-12 lg:py-15 bg-kumfora-charcoal" aria-labelledby="newsletter-heading">
      <div className="container-main">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-kumfora-rose text-body-sm font-semibold mb-6">
            <Heart className="w-4 h-4" />
            Join Our Community
          </span>

          <h3 id="newsletter-heading" className="text-display-md font-heading font-bold text-white mb-4">
            Join the Kumfora <span className="text-kumfora-rose">Circle</span>
          </h3>

          <p className="text-body-lg text-kumfora-rose/70 mb-10 max-w-md mx-auto">
            Get period tips, exclusive offers, and first access to new products delivered to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" aria-label="Newsletter signup">
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-kumfora-gray" aria-hidden="true" />
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="input pl-12 bg-white/10 border-white/20 text-white placeholder:text-kumfora-gray focus:border-kumfora-rose focus:ring-kumfora-rose/20"
                required
                disabled={status === 'loading' || status === 'success'}
              />
            </div>
            <Button
              type="submit"
              className="whitespace-nowrap"
              isLoading={status === 'loading'}
              disabled={status === 'success'}
            >
              {status === 'success' ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Subscribed!
                </>
              ) : (
                'Subscribe'
              )}
            </Button>
          </form>

          {status === 'error' && (
            <p className="mt-4 text-body-sm font-medium text-kumfora-rose" role="alert">
              {submitError}
            </p>
          )}

          {status === 'success' && (
            <p className="mt-4 text-body-sm font-medium text-kumfora-sage">
              Thanks for joining the Kumfora Circle!
            </p>
          )}

          <p className="text-caption text-kumfora-gray mt-6">
            By subscribing, you agree to our{' '}
            <a href="/privacy" className="underline hover:text-white transition-colors">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
