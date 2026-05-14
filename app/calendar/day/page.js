import { Suspense } from "react";
import DayPageClient from "./DayPageClient";

export default function DayPage() {
  return (
    <Suspense fallback={null}>
      <DayPageClient />
    </Suspense>
  );
}