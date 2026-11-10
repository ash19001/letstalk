// Downloads the OpenStreetMap data the Drake Street map is drawn from, into this folder.
// Data © OpenStreetMap contributors, available under the Open Database Licence (ODbL).
// Usage: node scripts/map/fetch-data.mjs   then   node scripts/map/build-map.cjs public/images/map/drake-street.svg src/lib/map.ts
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const BBOX = "53.6090,-2.1660,53.6215,-2.1460";
const SERVERS = ["https://overpass-api.de/api/interpreter", "https://overpass.private.coffee/api/interpreter"];

const queries = {
  roads: `way["highway"~"^(motorway|trunk|primary|secondary|tertiary|unclassified|residential|pedestrian|service|living_street|motorway_link|trunk_link|primary_link|secondary_link|tertiary_link)$"];out geom tags;`,
  lines: `(way["railway"~"^(rail|tram)$"];way["waterway"~"^(river|canal)$"];way["leisure"~"^(park|garden)$"];);out geom tags;`,
  tram: `(way["railway"="light_rail"];way["railway"="tram"];);out geom tags;`,
  buildings: `(way["building"];);out geom;`,
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchOne(name, body) {
  const data = `[out:json][timeout:150][bbox:${BBOX}];${body}`;
  for (let attempt = 1; attempt <= 4; attempt++) {
    for (const server of SERVERS) {
      try {
        const res = await fetch(server, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded", "User-Agent": "letstalk-site-build/1.0" },
          body: new URLSearchParams({ data }),
        });
        const text = await res.text();
        if (res.ok && text.trimStart().startsWith("{")) {
          writeFileSync(join(here, `${name}.json`), text);
          console.log(`${name}: ${text.length} bytes from ${server}`);
          return;
        }
        console.log(`${name}: ${server} answered ${res.status}, retrying`);
      } catch (e) {
        console.log(`${name}: ${server} failed (${e.message}), retrying`);
      }
    }
    await sleep(15000 * attempt);
  }
  throw new Error(`could not download ${name}; Overpass servers are busy, try again later`);
}

for (const [name, body] of Object.entries(queries)) await fetchOne(name, body);
