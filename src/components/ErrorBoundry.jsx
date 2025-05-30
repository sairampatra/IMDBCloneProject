export function ErrorBoundryJagan({ error, resetErrorBoundary }) {
  return (
    <div className="z-50 min-h-screen w-full flex flex-col items-center justify-center bg-red-50 text-red-700 px-4">
      <h2 className="text-2xl font-semibold mb-4">⚠️ Something went wrong</h2>
      <p className="mb-2 italic text-sm">Error: {error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Try Again
      </button>
    </div>
  );
}
