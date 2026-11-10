import type { CSSProperties } from "react";

type Props = {
  /** position and size classes, e.g. "right-[-12vw] top-[-10%] w-[48vw] h-[70%]" */
  className: string;
  tail?: "right" | "left";
  tailW?: number;
  tailH?: number;
  /** 0.06–0.14: a quiet voice behind the section */
  opacity?: number;
};

/**
 * A faint speech bubble behind a white section: the page is full of quiet
 * conversation. Semi-transparent orange, one shape, no text. Decorative, so
 * hidden from assistive technology and placed below the section's content.
 * The parent section must be `relative isolate`.
 */
export function Backdrop({ className, tail = "right", tailW = 80, tailH = 70, opacity = 0.12 }: Props) {
  const vars = { "--tail-w": `${tailW}px`, "--tail-h": `${tailH}px`, opacity } as CSSProperties;
  return (
    <div
      aria-hidden="true"
      className={`drift-soft pointer-events-none absolute -z-10 bg-field ${tail === "right" ? "bubble" : "bubble-l"} ${className}`}
      style={vars}
    />
  );
}
