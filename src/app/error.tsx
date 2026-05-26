'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import { ShieldAlert } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-white p-6">
      <div className="bento-tile flex flex-col items-center max-w-md text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-neon-purple/10 border border-neon-purple/20 flex items-center justify-center text-neon-purple">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold font-geist">Database Connection Error</h2>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            We couldn't connect to the Supabase database. Please ensure your environment variables are configured correctly and the database is active.
          </p>
        </div>
        <button
          onClick={() => reset()}
          className="px-6 py-2.5 bg-gradient-to-r from-electric-blue to-neon-purple rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
