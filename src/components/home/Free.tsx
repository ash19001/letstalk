import { IBM_Plex_Mono } from "next/font/google";
import { ReceiptStamp } from "@/components/home/ReceiptStamp";
import { DAY_NAMES, sessionById } from "@/lib/rota";

/**
 * Only the till receipt is set in this face. It is declared here and not preloaded:
 * the receipt is below the fold, so the face loads when the receipt is drawn and no
 * other page fetches it. The receipt reads var(--font-plex-mono) directly (see .receipt).
 */
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
  preload: false,
});

const SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
// the days come from the rota, so the receipt follows it if a session moves
const lunch = sessionById("community-lunch");
const english = sessionById("english-class");

/** What people can have, as it would print on a till. Every price is the same. */
const items: { name: string; sub?: string }[] = [
  { name: `${DAY_NAMES[lunch.day]} lunch` },
  { name: "Tea, coffee, biscuits" },
  { name: `Food parcel (${SHORT[lunch.day]})`, sub: "Rice, oil, flour, if you need one" },
  { name: `Warm clothes (${SHORT[lunch.day]})`, sub: "While stocks last" },
  { name: `English class (${SHORT[english.day]})` },
  { name: "Someone to talk to" },
];

/** It's all free: the till receipt on the dark counter, printing as you scroll. */
export function Free() {
  return (
    <section className={`free pad ${plexMono.variable}`} aria-labelledby="free-title">
      <div className="wrap free-grid">
        <div>
          <h2 id="free-title" className="free-title">
            It&rsquo;s all <em>free.</em>
          </h2>
          <p className="mt-8 text-lead">
            No referral. No forms.
            <br />
            Nothing to pay.
          </p>
        </div>

        <figure className="receipt-wrap" aria-label="A till receipt where everything costs £0.00">
          <div className="receipt-clip">
            <div className="receipt">
              <div className="receipt-head">
                <p className="receipt-name">Let&rsquo;s Talk</p>
                <p className="receipt-caps">74 Drake Street, Rochdale</p>
                <ReceiptStamp />
              </div>

              <div className="receipt-rule" aria-hidden="true" />
              <ul>
                {items.map((it) => (
                  <li key={it.name}>
                    <p className="receipt-row">
                      <span>{it.name}</span>
                      <span>&pound;0.00</span>
                    </p>
                    {it.sub ? <p className="receipt-sub">{it.sub}</p> : null}
                  </li>
                ))}
              </ul>
              <div className="receipt-rule" aria-hidden="true" />
              <p className="receipt-row receipt-total">
                <span>Total</span>
                <span>&pound;0.00</span>
              </p>
              <div className="receipt-rule double" aria-hidden="true" />
              <p className="receipt-row">
                <span>Referral needed</span>
                <span>No</span>
              </p>
              <p className="receipt-row">
                <span>Booking needed</span>
                <span>No</span>
              </p>
              <div className="receipt-rule" aria-hidden="true" />
              <p className="receipt-head">We speak English, Urdu and Punjabi</p>
              <p className="receipt-head receipt-caps mt-3">Thank you. Come again.</p>
              <div className="receipt-barcode" aria-hidden="true" />
              <p className="receipt-head receipt-caps" aria-hidden="true">
                No. 74
              </p>
            </div>
          </div>
          <div className="receipt-slot" aria-hidden="true" />
        </figure>
      </div>
    </section>
  );
}
