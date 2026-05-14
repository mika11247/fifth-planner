import "./globals.css";
import { AppShell } from "@/components/AppShell";

export const metadata = {
  title: "Fifth planner",
  description: "人生を俯瞰するデジタルライフプランナー",

  icons: {
    icon: "/icon-192.png",
    apple: "/apple-touch-icon.png",
  },

  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
