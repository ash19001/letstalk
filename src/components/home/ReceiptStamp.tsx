"use client";

import { useEffect, useState } from "react";
import { OPEN_DAYS } from "@/lib/rota";

const stamp = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  weekday: "short",
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

const SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const openDays = `Open ${OPEN_DAYS.map((d) => SHORT[d]).join(" ")}`;

/** The receipt is printed now: today's date and time in Rochdale. Before script runs it shows the days we are open. */
export function ReceiptStamp() {
  const [text, setText] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setText(stamp.format(new Date()).replace(",", ""));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return <p className="receipt-caps">{text ?? openDays}</p>;
}
