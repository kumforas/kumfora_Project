'use client';

import { useState, useCallback } from 'react';
import type { SubmissionStatus, UseFormSubmissionOptions, UseFormSubmissionReturn } from '@/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export function useFormSubmission<T>(
  path: string,
  options?: UseFormSubmissionOptions<T>
): UseFormSubmissionReturn<T> {
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [warnings, setWarnings] = useState<string[]>([]);

  const url = path.startsWith('http') ? path : `${API_BASE}${path}`;

  const submit = useCallback(async (body: unknown): Promise<boolean> => {
    setStatus('loading');
    setError(null);
    setWarnings([]);

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.error || 'Something went wrong');
      }

      if (result.warnings?.length) {
        setWarnings(result.warnings);
      }

      setStatus('success');
      options?.onSuccess?.(result.data as T);
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong';
      setStatus('error');
      setError(message);
      options?.onError?.(message);
      return false;
    }
  }, [url, options]);

  const reset = useCallback(() => {
    setStatus('idle');
    setError(null);
    setWarnings([]);
  }, []);

  return { status, error, warnings, submit, reset };
}
