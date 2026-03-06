"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body style={{ fontFamily: "monospace", padding: "2rem" }}>
        <h1 style={{ color: "red" }}>Global Error</h1>
        <pre style={{ whiteSpace: "pre-wrap", background: "#fff0f0", padding: "1rem", borderRadius: "8px" }}>
          {error.message}
        </pre>
        <pre style={{ whiteSpace: "pre-wrap", fontSize: "12px", color: "#666", maxHeight: "400px", overflow: "auto" }}>
          {error.stack}
        </pre>
        <button onClick={reset} style={{ padding: "8px 16px", marginTop: "1rem", cursor: "pointer" }}>
          Retry
        </button>
      </body>
    </html>
  );
}
