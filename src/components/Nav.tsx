"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", label: "Home" },
  { href: "/sc1004", label: "Linear Algebra" },
  { href: "/sc1001", label: "SC1001" },
];

/** Each course's own pages, shown after the course tabs while inside that course. */
const SUBTABS: Record<string, { href: string; label: string }[]> = {
  "/sc1004": [
    { href: "/sc1004/learn", label: "Learn" },
    { href: "/sc1004/practice", label: "Practice" },
    { href: "/sc1004/mock", label: "Mock final" },
  ],
  "/sc1001": [
    { href: "/sc1001/practice", label: "Practice" },
    { href: "/sc1001/code", label: "Coding" },
    { href: "/sc1001/mock", label: "Mock test" },
  ],
};

export function Nav() {
  const path = usePathname();
  const course = Object.keys(SUBTABS).find((c) => path.startsWith(c));
  const isActive = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));
  return (
    <header className="topbar">
      <div className="topbar-inner">
        {course === "/sc1001" ? (
          <Link href="/sc1001" className="brand">
            SC1001<span>·</span>Python <small className="muted">Prep</small>
          </Link>
        ) : course === "/sc1004" ? (
          <Link href="/sc1004" className="brand">
            SC1004<span>·</span>Linear Algebra <small className="muted">Prep</small>
          </Link>
        ) : (
          <Link href="/" className="brand">
            NTU<span>·</span>Prep
          </Link>
        )}
        <nav className="tabs">
          {TABS.map((t) => (
            <Link key={t.href} href={t.href} className={`tab ${isActive(t.href) ? "active" : ""}`}>
              {t.label}
            </Link>
          ))}
          {course && <span className="tab-sep" aria-hidden />}
          {course &&
            SUBTABS[course].map((t) => (
              <Link key={t.href} href={t.href} className={`tab sub ${isActive(t.href) ? "active" : ""}`}>
                {t.label}
              </Link>
            ))}
        </nav>
      </div>
    </header>
  );
}
