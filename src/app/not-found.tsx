"use client";

import { useRouter } from "next/navigation";
import Paper from "@/components/Paper/Paper";
import Button from "@/components/Button/Button";

export default function NotFound() {
  const router = useRouter();

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <Paper sx={{ textAlign: "center", padding: "3remx" }}>
        <p>🏀 ⛹️‍♀️ ⛹️‍♀️ ⛹️‍♀️</p>
        <h2>Not Found</h2>
        <p>Could not find requested resource</p>
        <Button variant="contained" onClick={() => router.push("/")} style={{ marginTop: "1rem" }}>
          Return Home
        </Button>
      </Paper>
    </div>
  );
}
