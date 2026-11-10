import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  size?: "small" | "normal";
  tone?: "ink" | "white" | "orange";
  className?: string;
};

const TONES = {
  ink: {
    text: "text-white hover:text-ink focus-visible:text-ink",
    fill: "bg-ink group-hover:bg-field group-focus-visible:bg-field",
  },
  white: {
    text: "text-ink",
    fill: "bg-white group-hover:bg-field group-focus-visible:bg-field",
  },
  orange: {
    text: "text-ink",
    fill: "bg-field group-hover:bg-white group-focus-visible:bg-white",
  },
};

/**
 * The primary action, cut to the bubble. The bubble is drawn on a layer behind
 * the label, so the link itself is never clipped and its focus ring shows.
 * Press scales it; hover and focus swap the colour.
 */
export function BubbleButton({ href, children, size = "normal", tone = "ink", className = "" }: Props) {
  const tailH = size === "small" ? 10 : 14;
  const vars = { "--tail-w": "18px", "--tail-h": `${tailH}px` } as CSSProperties;
  const t = TONES[tone];
  const sizes =
    size === "small"
      ? "px-4 pt-2.5 pb-[calc(0.625rem+var(--tail-h))] text-body"
      : "px-7 pt-4 pb-[calc(1rem+var(--tail-h))] text-lead";
  const cls = `group press relative isolate inline-flex items-center font-semibold no-underline ${t.text} ${sizes} ${className}`;
  const shape = (
    <span
      aria-hidden="true"
      className={`bubble absolute inset-0 -z-10 transition-colors duration-[180ms] ${t.fill}`}
    />
  );
  const external = href.startsWith("tel:") || href.startsWith("http") || href.startsWith("mailto:");
  if (external) {
    return (
      <a href={href} className={cls} style={vars}>
        {shape}
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} style={vars}>
      {shape}
      {children}
    </Link>
  );
}
