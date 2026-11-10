"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

export type Tab = { id: string; label: string; content: ReactNode };

// A side menu (left column, under the name) that switches the section shown beside it.
export default function Tabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0].id);
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});
  const menuRef = useRef<HTMLDivElement>(null);

  // On phones the menu is a sideways-scrolling row; flag which edges have more
  // tabs beyond them so CSS can fade those edges out.
  useEffect(() => {
    const el = menuRef.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      el.toggleAttribute("data-more-left", el.scrollLeft > 1);
      el.toggleAttribute("data-more-right", el.scrollLeft < max - 1);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, []);

  // Keep the open tab fully in view in that row. Scrolls only the row, never the
  // page; does nothing on desktop, where the menu doesn't scroll.
  const scrolledOnce = useRef(false);
  useEffect(() => {
    const el = menuRef.current;
    const btn = refs.current[active];
    if (!el || !btn || el.scrollWidth <= el.clientWidth) return;
    // A deep link (/#certifications) should load already scrolled; later taps glide.
    const pad = 40; // clear of the edge fade
    const left = btn.offsetLeft - el.offsetLeft;
    const right = left + btn.offsetWidth;
    let target: number | null = null;
    if (left - pad < el.scrollLeft) target = Math.max(0, left - pad);
    else if (right + pad > el.scrollLeft + el.clientWidth) target = right + pad - el.clientWidth;
    if (target === null || Math.abs(target - el.scrollLeft) < 1) return;
    el.scrollTo({ left: target, behavior: scrolledOnce.current ? "smooth" : "instant" });
    scrolledOnce.current = true;
  }, [active]);

  // Allow deep links such as /#experience.
  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.slice(1);
      if (tabs.some((t) => t.id === id)) setActive(id);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [tabs]);

  function select(id: string) {
    setActive(id);
    window.history.replaceState(null, "", `#${id}`);
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const i = tabs.findIndex((t) => t.id === active);
    let next = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % tabs.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    if (next < 0) return;
    e.preventDefault();
    select(tabs[next].id);
    refs.current[tabs[next].id]?.focus();
  }

  return (
    <div className="sections">
      <div ref={menuRef} className="menu" role="tablist" aria-label="Sections" onKeyDown={onKeyDown}>
        {tabs.map((t) => (
          <button
            key={t.id}
            ref={(el) => {
              refs.current[t.id] = el;
            }}
            type="button"
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={active === t.id}
            aria-controls={`panel-${t.id}`}
            tabIndex={active === t.id ? 0 : -1}
            onClick={() => select(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="panels">
        {tabs.map((t) => (
          <div
            key={t.id}
            role="tabpanel"
            id={`panel-${t.id}`}
            aria-labelledby={`tab-${t.id}`}
            hidden={active !== t.id}
            className="panel"
          >
            {t.content}
          </div>
        ))}
      </div>
    </div>
  );
}
