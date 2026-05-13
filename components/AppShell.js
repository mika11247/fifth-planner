import Link from "next/link";
import { Logo } from "@/components/Logo";

const navItems = [
  { href: "/", label: "TOP" },
  { href: "/calendar/month", label: "月" },
  { href: "/calendar/week", label: "週" },
  { href: "/calendar/day", label: "日" },
  { href: "/share", label: "共有" },
  { href: "/profile", label: "マイページ" }
];

const subLinks = [
  { href: "/guide", label: "使い方" },
  { href: "/privacy", label: "プライバシー" },
  { href: "/disclaimer", label: "免責事項" },
  { href: "/contact", label: "お問い合わせ" }
];

export function AppShell({ children }) {
  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      <div className="mx-auto flex w-full max-w-7xl gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <aside className="sticky top-4 hidden h-[calc(100vh-2rem)] w-64 shrink-0 flex-col justify-between rounded-card border border-line bg-white/76 p-4 shadow-soft backdrop-blur lg:flex">
          <div className="space-y-8">
            <Logo />
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-control px-4 py-3 text-sm font-medium text-muted transition hover:bg-brand-50 hover:text-brand-700"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="space-y-2 text-xs text-muted">
            {subLinks.map((item) => (
              <Link key={item.href} href={item.href} className="block px-2 py-1">
                {item.label}
              </Link>
            ))}
          </div>
        </aside>

        <main className="min-w-0 flex-1">{children}</main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-white/92 px-2 py-2 shadow-soft backdrop-blur lg:hidden">
        <div className="mx-auto grid max-w-lg grid-cols-5 gap-1">
          {navItems.slice(0, 5).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-card px-2 py-2 text-center text-xs font-semibold text-muted hover:bg-brand-50 hover:text-brand-700"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
