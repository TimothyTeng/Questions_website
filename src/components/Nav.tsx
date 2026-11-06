"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", label: "Home" },
  { href: "/learn", label: "Learn" },
  { href: "/practice", label: "Practice" },
];

export function Nav() {
  const path = usePathname();
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link href="/" className="brand">
          LA<span>·</span>CA2 <small className="muted">Mastery</small>
        </Link>
        <nav className="tabs">
          {TABS.map((t) => {
            const active = t.href === "/" ? path === "/" : path.startsWith(t.href);
            return (
              <Link key={t.href} href={t.href} className={`tab ${active ? "active" : ""}`}>
                {t.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
