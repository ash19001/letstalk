// Draws the Drake Street map from OpenStreetMap data (ODbL, © OpenStreetMap contributors).
// Writes an SVG of the streets and buildings, and a TS module of overlay positions (percent of the map box).
// Usage: node build-map.cjs <outSvg> <outTs>
const fs = require("fs");
const path = require("path");
const [outSvg, outTs] = process.argv.slice(2);
const here = __dirname;
const read = (f) => JSON.parse(fs.readFileSync(path.join(here, f), "utf8"));
const roads = read("roads.json").elements;
const lines = read("lines.json").elements;
const tram = read("tram.json").elements;
const buildings = read("buildings.json").elements;

// The frame: a square about 1.1 km across, from the station to Toad Lane
const S = 53.61005, N = 53.61995;
const lat0 = (S + N) / 2;
const k = Math.cos((lat0 * Math.PI) / 180);
const lonSpan = ((N - S) / k);
const lonC = -2.15612;
const W = lonC - lonSpan / 2, E = lonC + lonSpan / 2;
const VB = 1000;
const scale = VB / ((E - W) * k);
const H = Math.round((N - S) * scale);
const px = (lon) => (lon - W) * k * scale;
const py = (lat) => (N - lat) * scale;
const metres = (a, b) => {
  const dy = (a.lat - b.lat) * 111320;
  const dx = (a.lon - b.lon) * 111320 * k;
  return Math.hypot(dx, dy);
};

// Ramer–Douglas–Peucker on projected points
function simplify(pts, tol) {
  if (pts.length < 3) return pts;
  const sq = (p, a, b) => {
    const dx = b[0] - a[0], dy = b[1] - a[1];
    const l = dx * dx + dy * dy;
    let t = l ? ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / l : 0;
    t = Math.max(0, Math.min(1, t));
    const x = a[0] + t * dx - p[0], y = a[1] + t * dy - p[1];
    return x * x + y * y;
  };
  let max = 0, idx = 0;
  for (let i = 1; i < pts.length - 1; i++) {
    const d = sq(pts[i], pts[0], pts[pts.length - 1]);
    if (d > max) { max = d; idx = i; }
  }
  if (max > tol * tol) {
    const a = simplify(pts.slice(0, idx + 1), tol);
    const b = simplify(pts.slice(idx), tol);
    return a.slice(0, -1).concat(b);
  }
  return [pts[0], pts[pts.length - 1]];
}
const f = (n) => (Math.round(n * 10) / 10).toString();
function d(geom, close = false, tol = 0.6) {
  let pts = geom.map((g) => [px(g.lon), py(g.lat)]);
  pts = simplify(pts, tol);
  if (pts.length < 2) return "";
  return "M" + pts.map((p) => f(p[0]) + " " + f(p[1])).join("L") + (close ? "Z" : "");
}
const inFrame = (geom) => geom.some((g) => g.lat > S - 0.002 && g.lat < N + 0.002 && g.lon > W - 0.003 && g.lon < E + 0.003);

// Roads by class (width in viewBox units, about a metre each)
const widths = {
  trunk: 18, primary: 16, secondary: 14, tertiary: 12, primary_link: 10, secondary_link: 9, tertiary_link: 8, trunk_link: 10,
  unclassified: 9, residential: 8, living_street: 7, pedestrian: 9, service: 4.5,
};
const roadGroups = {};
let drake = [];
for (const r of roads) {
  const t = r.tags || {};
  if (!r.geometry || !inFrame(r.geometry)) continue;
  if (t.tunnel && t.tunnel !== "no") continue;
  const w = widths[t.highway];
  if (!w) continue;
  if (t.name === "Drake Street") drake.push(r.geometry);
  (roadGroups[w] ||= []).push(d(r.geometry));
}
const buildingPath = buildings
  .filter((b) => b.geometry && inFrame(b.geometry))
  .map((b) => d(b.geometry, true, 0.5))
  .join("");
const parkPath = lines
  .filter((e) => e.type === "way" && e.tags && (e.tags.leisure === "park" || e.tags.leisure === "garden") && e.geometry && inFrame(e.geometry))
  .map((e) => d(e.geometry, true))
  .join("");
const riverPath = lines
  .filter((e) => e.type === "way" && e.tags && e.tags.waterway === "river" && e.geometry && inFrame(e.geometry) && !(e.tags.tunnel && e.tags.tunnel !== "no"))
  .map((e) => d(e.geometry))
  .join("");
const railPath = lines
  .filter((e) => e.type === "way" && e.tags && e.tags.railway === "rail" && e.geometry && inFrame(e.geometry) && !(e.tags.service))
  .map((e) => d(e.geometry))
  .join("");
const tramWays = tram.filter((e) => e.geometry && inFrame(e.geometry));
const tramPath = tramWays.map((e) => d(e.geometry)).join("");
// Highlight only the stretch people walk: from the town centre down to the bend where the
// tram turns off for the station. West of the bend Drake Street stays an ordinary street.
const WALK_SOUTH = 53.6127;
const walked = [];
for (const g of drake) {
  let run = [];
  for (const p of g) {
    if (p.lat >= WALK_SOUTH) run.push(p);
    else {
      if (run.length > 1) walked.push(run);
      run = [];
    }
  }
  if (run.length > 1) walked.push(run);
}
const drakePath = walked.map((g) => d(g)).join("");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VB} ${H}" width="${VB}" height="${H}">
<rect width="${VB}" height="${H}" fill="#f1eee9"/>
<path d="${parkPath}" fill="#e7e2d9"/>
<path d="${buildingPath}" fill="#e0d9d0"/>
<path d="${riverPath}" fill="none" stroke="#d3ccc3" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
${Object.entries(roadGroups)
  .sort((a, b) => Number(a[0]) - Number(b[0]))
  .map(([w, ds]) => `<path d="${ds.join("")}" fill="none" stroke="#ffffff" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`)
  .join("\n")}
<path d="${railPath}" fill="none" stroke="#8d857c" stroke-width="5" stroke-linecap="butt"/>
<path d="${railPath}" fill="none" stroke="#f1eee9" stroke-width="2.4" stroke-dasharray="9 9"/>
<path d="${drakePath}" fill="none" stroke="#f2602f" stroke-width="17" stroke-linecap="round" stroke-linejoin="round"/>
<path d="${tramPath}" fill="none" stroke="#161412" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="1 0"/>
</svg>`;
fs.writeFileSync(outSvg, svg);

// Overlay points, as percentages of the map box
const pct = (lat, lon) => ({ x: +((px(lon) / VB) * 100).toFixed(2), y: +((py(lat) / H) * 100).toFixed(2) });
const pts = {
  centre: { lat: 53.614725, lon: -2.153962 }, // OL16 1PQ postcode centre, on Drake Street by the tram line
  station: { lat: 53.61057, lon: -2.15284 },
  stationStop: { lat: 53.61101, lon: -2.15445 },
  townCentreStop: { lat: 53.6173, lon: -2.15545 },
  interchange: { lat: 53.6169, lon: -2.15488 },
  townHall: { lat: 53.61576, lon: -2.15889 },
  pioneers: { lat: 53.61863, lon: -2.159406 },
};

// Snap the centre to the nearest point on Drake Street
let best = null;
for (const g of drake) for (const p of g) {
  const m = metres(p, pts.centre);
  if (!best || m < best.m) best = { m, p };
}
pts.pin = { lat: best.p.lat, lon: best.p.lon };

// Walking distance: station to the station tram stop, then along the Metrolink line (which runs down Drake Street) to the pin
function chainFrom(startPt, endPt) {
  // flatten tram ways into segments and walk the graph greedily by nearest connection
  const segs = tramWays.map((w) => w.geometry);
  const nodes = [];
  const key = (p) => p.lat.toFixed(6) + "," + p.lon.toFixed(6);
  const adj = new Map();
  for (const s of segs) for (let i = 0; i < s.length - 1; i++) {
    const a = s[i], b = s[i + 1];
    const ka = key(a), kb = key(b);
    if (!adj.has(ka)) { adj.set(ka, []); nodes.push(a); }
    if (!adj.has(kb)) { adj.set(kb, []); nodes.push(b); }
    const m = metres(a, b);
    adj.get(ka).push([kb, m]);
    adj.get(kb).push([ka, m]);
  }
  const nearest = (q) => nodes.reduce((acc, n) => (metres(n, q) < metres(acc, q) ? n : acc), nodes[0]);
  const s0 = key(nearest(startPt)), t0 = key(nearest(endPt));
  const dist = new Map([[s0, 0]]);
  const done = new Set();
  while (true) {
    let u = null, du = Infinity;
    for (const [n, dn] of dist) if (!done.has(n) && dn < du) { u = n; du = dn; }
    if (u === null || u === t0) break;
    done.add(u);
    for (const [v, w] of adj.get(u) || []) if (!dist.has(v) || dist.get(v) > du + w) dist.set(v, du + w);
  }
  return { along: dist.get(t0), from: metres(startPt, nearest(startPt)), to: metres(endPt, nearest(endPt)) };
}
const fromStation = chainFrom(pts.stationStop, pts.pin);
const stationToStop = metres(pts.station, pts.stationStop);
const fromTown = chainFrom(pts.townCentreStop, pts.pin);
const walk = (m) => Math.max(1, Math.round(m / 80));
const report = {
  frameKm: { w: ((E - W) * k * 111.32).toFixed(2), h: ((N - S) * 111.32).toFixed(2) },
  pinSnapMetres: best.m.toFixed(1),
  stationMetres: Math.round(stationToStop + fromStation.along + fromStation.to),
  townCentreMetres: Math.round(fromTown.along + fromTown.to),
};
report.stationMinutes = walk(report.stationMetres);
report.townCentreMinutes = walk(report.townCentreMetres);

// Drake Street label: on the walked stretch between the bus station and number 74, along the street
let seg = null;
for (const g of walked) for (let i = 0; i < g.length - 1; i++) {
  const mid = { lat: (g[i].lat + g[i + 1].lat) / 2, lon: (g[i].lon + g[i + 1].lon) / 2 };
  const m = metres(mid, { lat: 53.61585, lon: -2.15475 });
  if (!seg || m < seg.m) seg = { m, a: g[i], b: g[i + 1], mid };
}
const ang = (Math.atan2(py(seg.b.lat) - py(seg.a.lat), px(seg.b.lon) - px(seg.a.lon)) * 180) / Math.PI;
const labelAngle = ang > 90 ? ang - 180 : ang < -90 ? ang + 180 : ang;

const out = {
  aspect: `${VB} / ${H}`,
  pin: pct(pts.pin.lat, pts.pin.lon),
  station: pct(pts.station.lat, pts.station.lon),
  interchange: pct(pts.interchange.lat, pts.interchange.lon),
  townHall: pct(pts.townHall.lat, pts.townHall.lon),
  pioneers: pct(pts.pioneers.lat, pts.pioneers.lon),
  drakeLabel: { ...pct(seg.mid.lat, seg.mid.lon), angle: +labelAngle.toFixed(1) },
  // Walking times from the OpenStreetMap foot router (routing.openstreetmap.de), 10 Nov 2026:
  // station 654 m (8.7 min), Rochdale Interchange 305 m (4.1 min). Edit them here, not in map.ts.
  walk: { stationMinutes: 9, interchangeMinutes: 4 },
};
const ts = `/**
 * Positions on the Drake Street map (percent of the map box), drawn from OpenStreetMap
 * data (© OpenStreetMap contributors, ODbL). Number 74 sits at the OL16 1PQ postcode
 * centre, snapped to Drake Street. Walking times come from the OpenStreetMap foot router.
 * Generated by scripts/map/build-map.cjs; see docs/map.md. Do not edit by hand.
 */
export const drakeMap = ${JSON.stringify(out, null, 2)} as const;
`;
fs.writeFileSync(outTs, ts);
console.log(JSON.stringify({ report, out }, null, 2));
console.log("svg bytes", fs.statSync(outSvg).size, "viewBox", VB, H);
