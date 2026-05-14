"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";

const mainNavItems = [
  { href: "/", label: "TOP" },
  { href: "/calendar/month", label: "月" },
  { href: "/calendar/week", label: "週" },
  { href: "/calendar/day", label: "日" },
  { href: "/tasks", label: "タスク" },
];

const menuItems = [
  { href: "/share", label: "共有" },
  { href: "/profile", label: "マイページ" },
  { href: "/guide", label: "使い方" },
  { href: "/contact", label: "お問い合わせ" },
  { href: "/privacy", label: "プライバシー" },
  { href: "/disclaimer", label: "免責事項" },
];

const pcNavItems = [...mainNavItems, ...menuItems];

export function AppShell({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen pb-24 lg:pb-0">
      <div className="mx-auto flex w-full max-w-7xl gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <aside className="sticky top-4 hidden h-[calc(100vh-2rem)] w-64 shrink-0 flex-col justify-between rounded-card border border-line bg-white/76 p-4 shadow-soft backdrop-blur lg:flex">
          <div className="space-y-8">
            <Logo />

            <nav className="space-y-2">
              {pcNavItems.map((item) => (
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

          <p className="px-2 text-xs text-muted">Fifth planner</p>
        </aside>

        <main className="min-w-0 flex-1">{children}</main>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black/30 lg:hidden" onClick={() => setIsMenuOpen(false)}>
          <div
            className="absolute bottom-20 right-4 w-64 rounded-card border border-line bg-white p-3 shadow-soft"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="px-3 pb-2 text-xs font-semibold text-muted">
              メニュー
            </p>

            <div className="space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block rounded-control px-4 py-3 text-sm font-semibold text-ink hover:bg-brand-50 hover:text-brand-700"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/92 px-2 py-2 shadow-soft backdrop-blur lg:hidden">
        <div className="mx-auto grid max-w-lg grid-cols-6 gap-1">
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-card px-2 py-2 text-center text-xs font-semibold text-muted hover:bg-brand-50 hover:text-brand-700"
            >
              {item.label}
            </Link>
          ))}

          <button
            type="button"
            onClick={() => setIsMenuOpen((value) => !value)}
            className="rounded-card px-2 py-2 text-center text-xs font-semibold text-muted hover:bg-brand-50 hover:text-brand-700"
          >
            ☰
          </button>
        </div>
      </nav>
    </div>
  );
}