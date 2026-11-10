"use client";

import { useEffect, useState } from "react";
import { nowInRochdale, sayWhatsOn, whatsOn, type WhatsOn as WhatsOnValue } from "@/lib/rota";

/**
 * The bubble speaks. Server and first paint: the week in short (no script needed).
 * Once hydrated: what's on now, or next, from the clock in Rochdale.
 * The one reserved colour move: when a session is on right now, the line turns white.
 */
export function WhatsOn({
  fallback,
  leadClassName,
  detailClassName,
  nowClassName = "",
}: {
  fallback: React.ReactNode;
  leadClassName?: string;
  detailClassName?: string;
  nowClassName?: string;
}) {
  const [state, setState] = useState<WhatsOnValue | null>(null);

  useEffect(() => {
    const tick = () => setState(whatsOn(nowInRochdale()));
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  if (!state) return <>{fallback}</>;

  const said = sayWhatsOn(state);
  const open = state.kind === "now";
  return (
    <p aria-live="polite">
      <span className={`${leadClassName ?? ""} ${open ? nowClassName : ""}`}>{said.lead}</span>
      <span className={detailClassName}>{said.detail}</span>
    </p>
  );
}
