import Image from "next/image";
import type { CSSProperties } from "react";
import { BubbleButton } from "@/components/BubbleButton";
import { drakeMap } from "@/lib/map";
import { place } from "@/lib/rota";

const pos = (p: { x: number; y: number }) => ({ "--x": p.x, "--y": p.y }) as CSSProperties;

/**
 * Four pictures of the walk; under a mouse pointer each one points at its place on the map.
 * `lift` brightens a dark picture before the orange is printed over it.
 */
const around = [
  {
    place: "station",
    src: "/images/world/rochdale-station-postcard.jpg",
    alt: "A black and white postcard of Rochdale railway station about 1910, with its clock tower and people waiting outside",
    title: "Rochdale station",
    text: "About 1910. Nine minutes’ walk to us today.",
    position: "40% 50%",
    lift: 1.04,
  },
  {
    place: "drake",
    src: "/images/world/drake-street-in-rochdale-geograph-org-uk.jpg",
    alt: "Drake Street, Rochdale: tram lines running down the middle, brick shops with shutters either side, two people walking",
    title: "Drake Street",
    text: "The tram runs right past the door.",
    position: "62% 60%",
    lift: 1.04,
  },
  {
    place: "townhall",
    src: "/images/world/rochdale-town-hall-and-gracie-fields-statue.jpg",
    alt: "The bronze statue of Gracie Fields singing, with Rochdale Town Hall's clock tower behind her",
    title: "The Town Hall",
    text: "With a statue of Gracie Fields, the singer.",
    position: "55% 40%",
    lift: 1.45,
  },
  {
    place: "pioneers",
    src: "/images/world/the-store-1-4743473784.jpg",
    alt: "The Rochdale Pioneers' store on Toad Lane: a brick shop with white sash windows and a green door",
    title: "Toad Lane",
    text: "Where the co-op began, in 1844.",
    position: "50% 80%",
    lift: 1.25,
  },
];

/** Find us: the street drawn from OpenStreetMap, number 74 pinned, the walk in pictures. */
export function FindUs() {
  return (
    <section id="find-us" className="findus wrap pad" aria-labelledby="find-title">
      <div className="findus-grid">
        <div>
          <h2 id="find-title" className="title">
            Find us
          </h2>
          <p className="mt-6 text-head font-medium">
            {place.street}
            <br />
            {place.town} <span className="whitespace-nowrap">{place.postcode}</span>
          </p>
          <p className="mt-6 max-w-[30ch] text-lead">On the tram line. Look for the orange sign.</p>
          <div className="mt-10">
            <BubbleButton href={place.mapsHref}>Get directions</BubbleButton>
          </div>
        </div>

        <div className="map">
          <div className="map-box">
            {/* eslint-disable-next-line @next/next/no-img-element -- a static SVG drawing, nothing to optimise */}
            <img
              src="/images/map/drake-street.svg"
              alt={`Map of central Rochdale. Drake Street, in orange, runs from the bus and tram interchange past number 74, with the tram line along it. South of number 74 the tram turns off to the railway station. About ${drakeMap.walk.interchangeMinutes} minutes' walk from the interchange and ${drakeMap.walk.stationMinutes} from the station. The Town Hall and the Pioneers Museum on Toad Lane are to the west.`}
              loading="lazy"
              decoding="async"
            />
            <span
              className="map-street"
              style={{ ...pos(drakeMap.drakeLabel), "--angle": `${drakeMap.drakeLabel.angle}deg` } as CSSProperties}
              aria-hidden="true"
            >
              Drake Street
            </span>
            <span className="map-tag" data-place="pioneers" style={pos(drakeMap.pioneers)} aria-hidden="true">
              Pioneers Museum
            </span>
            <span className="map-tag" data-place="townhall" style={pos(drakeMap.townHall)} aria-hidden="true">
              Town Hall
            </span>
            <span className="map-tag left" style={pos(drakeMap.interchange)} aria-hidden="true">
              Buses and trams
              <small>{drakeMap.walk.interchangeMinutes} min walk</small>
            </span>
            <span className="map-tag above" data-place="station" style={pos(drakeMap.station)} aria-hidden="true">
              Train station
              <small>{drakeMap.walk.stationMinutes} min walk</small>
            </span>
            <span className="map-dot" style={pos(drakeMap.pin)} aria-hidden="true" />
            <span className="map-pin bubble-l" style={pos(drakeMap.pin)} aria-hidden="true">
              Let&rsquo;s Talk
              <small>No. 74</small>
            </span>
          </div>
          <p className="map-credit">
            Map data &copy;{" "}
            <a href="https://www.openstreetmap.org/copyright" className="underline">
              OpenStreetMap contributors
            </a>
          </p>
        </div>
      </div>

      <ul className="around" aria-label="Around the corner">
        {around.map((p) => (
          <li key={p.place} data-place={p.place}>
            <figure>
              <div className="duo aspect-[4/5]" style={{ "--lift": p.lift } as CSSProperties}>
                <Image src={p.src} alt={p.alt} fill sizes="(min-width: 768px) 24vw, 46vw" style={{ objectPosition: p.position }} />
              </div>
              <figcaption>
                <b>{p.title}</b>
                {p.text}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
