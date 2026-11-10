import { BubbleButton } from "@/components/BubbleButton";
import { place } from "@/lib/rota";

/** What helps most: the food that goes into the parcels, coats, and people. */
const wants = ["Rice", "Cooking oil", "Flour", "Warm coats"];

/** Bring what you can: a shopping list on the dark counter. */
export function Help() {
  return (
    <section className="help pad" aria-labelledby="help-title">
      <div className="wrap help-grid">
        <div className="help-copy">
          <h2 id="help-title" className="title">
            Bring what you can
          </h2>
          <p className="mt-6 max-w-[30ch] text-lead">
            Food, warm clothes, or an hour of your time. Call first and we&rsquo;ll tell you what&rsquo;s needed.
          </p>
        </div>

        <ul className="wants" aria-label="What helps most">
          {wants.map((w) => (
            <li key={w}>
              <span className="box" aria-hidden="true" />
              {w}
            </li>
          ))}
          <li className="is-time">
            <span className="box" aria-hidden="true" />
            An hour of your time
          </li>
        </ul>

        <div className="help-action">
          <BubbleButton href={place.phoneHref} tone="orange">
            Call {place.phone}
          </BubbleButton>
        </div>
      </div>
    </section>
  );
}
