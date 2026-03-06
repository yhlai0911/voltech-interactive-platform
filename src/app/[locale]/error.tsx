"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-2xl w-full bg-red-50 border border-red-200 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-red-800 mb-4">Client Error Caught</h2>
        <pre className="bg-white p-4 rounded border text-sm overflow-auto whitespace-pre-wrap text-red-700 mb-4">
          {error.message}
        </pre>
        <pre className="bg-white p-4 rounded border text-xs overflow-auto whitespace-pre-wrap text-gray-500 mb-4 max-h-64">
          {error.stack}
        </pre>
        <button
          onClick={reset}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
