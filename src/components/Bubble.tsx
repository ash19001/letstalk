import type { CSSProperties, ElementType, ReactNode } from "react";

type BubbleProps = {
  /** which bottom corner carries the tail; the sign's is on the right */
  tail?: "right" | "left";
  /**
   * tail width and height in px. Leave both out to size the tail from CSS
   * (set `--tail-w` and `--tail-h` in a class), which lets it change with the screen.
   */
  tailW?: number;
  tailH?: number;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  id?: string;
  "aria-hidden"?: boolean;
};

/**
 * The one shape: a square-cornered speech bubble with a right-angled tail,
 * drawn from the sign at 74 Drake Street. Give it a background and a size.
 */
export function Bubble({
  tail = "right",
  tailW,
  tailH,
  as: Tag = "div",
  className = "",
  style,
  children,
  ...rest
}: BubbleProps) {
  const vars: Record<string, string> = {};
  if (tailW !== undefined) vars["--tail-w"] = `${tailW}px`;
  if (tailH !== undefined) vars["--tail-h"] = `${tailH}px`;
  return (
    <Tag
      className={`${tail === "right" ? "bubble" : "bubble-l"} ${className}`}
      style={{ ...vars, ...style } as CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  );
}
