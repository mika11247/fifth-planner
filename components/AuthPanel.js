"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/browser";

export function AuthPanel() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const supabase = createClient();

  async function signInWithEmail(event) {
    event.preventDefault();
    if (!supabase) {
      setMessage("Supabase環境変数を設定するとメールログインが使えます。");
      return;
    }

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/profile`
      }
    });

    setMessage(error ? error.message : "ログイン用リンクをメールで送りました。");
  }

  async function signInWithGoogle() {
    if (!supabase) {
      setMessage("Supabase環境変数を設定するとGoogleログインが使えます。");
      return;
    }

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/profile`
      }
    });
  }

  async function signOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
    setMessage("ログアウトしました。");
  }

  return (
    <section className="card p-5">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">ログイン</h2>
        <p className="mt-1 text-sm text-muted">メールリンクとGoogleログインの土台です。</p>
      </div>
      <form onSubmit={signInWithEmail} className="space-y-3">
        <input
          className="focus-ring w-full rounded-control border border-line bg-white px-4 py-3 text-sm"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="mail@example.com"
          required
        />
        <button className="focus-ring w-full rounded-control bg-brand-500 px-4 py-3 text-sm font-semibold text-white">
          メールでログイン
        </button>
      </form>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={signInWithGoogle}
          className="focus-ring rounded-control border border-line bg-white px-4 py-3 text-sm font-semibold text-ink"
        >
          Googleログイン
        </button>
        <button
          type="button"
          onClick={signOut}
          className="focus-ring rounded-control border border-line bg-brand-50 px-4 py-3 text-sm font-semibold text-brand-700"
        >
          ログアウト
        </button>
      </div>
      {message ? <p className="mt-3 text-sm text-muted">{message}</p> : null}
    </section>
  );
}
