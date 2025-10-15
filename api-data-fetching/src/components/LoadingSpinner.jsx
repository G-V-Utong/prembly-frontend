import React from 'react';

export default function LoadingSpinner({ label = 'Loading…' }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <span className="inline-block w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mb-4" role="status" aria-label={label}></span>
      <span className="text-sky-600 text-sm font-medium" aria-live="polite">{label}</span>
    </div>
  );
}
