"use client";

import { useEffect } from "react";
import Paper from "@/components/Paper/Paper";
import Button from "@/components/Button/Button";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <html>
      <body style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
        <Paper sx={{ textAlign: "center", padding: "3rem" }}>
          <p>🐝 🐝 🐝 🐝 🐝 🐝</p>
          <h2>Something went wrong!</h2>
          <Button variant="contained" onClick={() => reset()} style={{ marginTop: "1rem" }}>
            Try again
          </Button>
        </Paper>
      </body>
    </html>
  );
}
