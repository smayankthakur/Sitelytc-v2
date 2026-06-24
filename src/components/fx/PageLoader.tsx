"use client";

import { useEffect } from "react";

/** Fades out the server-rendered #page-loader once per tab session. */
export function PageLoader() {
  useEffect(() => {
    const el = document.getElementById("page-loader");
    if (!el) return;

    let seen = false;
    try {
      seen = !!sessionStorage.getItem("sl_intro");
    } catch {
      seen = false;
    }

    if (seen) {
      el.style.display = "none";
      return;
    }

    const t = window.setTimeout(() => {
      el.classList.add("is-out");
      try {
        sessionStorage.setItem("sl_intro", "1");
      } catch {
        /* ignore */
      }
      window.setTimeout(() => {
        el.style.display = "none";
      }, 650);
    }, 1000);

    return () => window.clearTimeout(t);
  }, []);

  return null;
}
