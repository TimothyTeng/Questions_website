"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", label: "Home" },
  { href: "/learn", label: "Learn" },
  { href: "/practice", label: "Practice" },
  { href: "/sc1001", label: "SC1001" },
];

export function Nav() {
  const path = usePathname();
  const sc = path.startsWith("/sc1001");
  return (
    <header className="topbar">
      <div className="topbar-inner">
        {sc ? (
          <Link href="/sc1001" className="brand">
            SC1001<span>·</span>Python <small className="muted">Prep</small>
          </Link>
        ) : (
          <Link href="/" className="brand">
            LA<span>·</span>CA2 <small className="muted">Mastery</small>
          </Link>
        )}
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
