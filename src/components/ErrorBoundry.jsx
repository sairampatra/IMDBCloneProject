export function ErrorBoundryJagan({ error, resetErrorBoundary }) {
    return (
      <div className="z-50">
        <p>Something went wrong:</p>
        <span className="text-white">{error.message}</span>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    );
  }