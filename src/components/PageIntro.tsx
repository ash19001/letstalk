import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { Bubble } from "@/components/Bubble";

type Props = {
  /** two to four words, authored as one line */
  title: string;
  lead: string;
  action?: ReactNode;
  /** `lift` brightens a dark picture before the orange is printed over it (1 = as it is) */
  picture: { src: string; alt: string; position?: string; caption: string; lift?: number };
};

/** The first screen of a secondary page: the title across the row, then the lead left and one picture of Rochdale in the bubble right. */
export function PageIntro({ title, lead, action, picture }: Props) {
  return (
    <div className="enter wrap pt-[clamp(2rem,5vw,4rem)]">
      <h1 className="lines text-display intro-title font-semibold">
        <span className="line">
          <span data-line style={{ "--i": 0 } as CSSProperties}>
            {title}
          </span>
        </span>
      </h1>
      <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-x-[var(--gutter)]">
        <div className="lg:col-span-5">
          <p className="max-w-[34ch] text-lead" data-load style={{ "--d": "380ms" } as CSSProperties}>
            {lead}
          </p>
          {action ? (
            <div className="mt-8" data-load style={{ "--d": "460ms" } as CSSProperties}>
              {action}
            </div>
          ) : null}
        </div>
        <figure className="lg:col-span-6 lg:col-start-7" data-load style={{ "--d": "260ms" } as CSSProperties}>
          <Bubble
            tailW={48}
            tailH={40}
            className="duo aspect-[16/10]"
            style={{ "--lift": picture.lift ?? 1.04 } as CSSProperties}
          >
            <Image
              src={picture.src}
              alt={picture.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="drift object-cover"
              style={{ objectPosition: picture.position ?? "50% 50%" }}
              preload
            />
          </Bubble>
          <figcaption className="mt-4 text-body text-muted" data-load style={{ "--d": "520ms" } as CSSProperties}>
            {picture.caption}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
