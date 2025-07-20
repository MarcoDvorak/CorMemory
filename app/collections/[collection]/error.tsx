'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh]">
      <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
      <p className="text-gray-600 mb-4">{error.message}</p>
      <button
        className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-900"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
} 