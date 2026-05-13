import "./globals.css";
import { AppShell } from "@/components/AppShell";

export const metadata = {
  title: "Fifth planner",
  description: "人生を俯瞰するデジタルライフプランナー",
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-icon.svg"
  }
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
