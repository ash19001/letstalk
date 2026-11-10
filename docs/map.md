# The Drake Street map

The "Find us" section draws its own map instead of embedding Google Maps: one SVG of the streets and buildings around Drake Street (`public/images/map/drake-street.svg`) with the labels and the pin laid over it in HTML (`src/components/home/FindUs.tsx`, positions in `src/lib/map.ts`).

## Where the data comes from

- Streets, buildings, the railway, the Metrolink line, the River Roch and parks: OpenStreetMap, © OpenStreetMap contributors, Open Database Licence. The credit sits under the map and in the footer.
- Number 74: the centre of the OL16 1PQ postcode (postcodes.io: 53.614725, -2.153962), snapped to the nearest point on Drake Street (about 18 metres away). OpenStreetMap has no address point for number 74 itself.
- Landmarks: Rochdale railway station, Rochdale Interchange (buses, with the Town Centre tram stop beside it), Rochdale Town Hall and the Rochdale Pioneers Museum on Toad Lane, all from OpenStreetMap.
- Walking times: the OpenStreetMap foot router at routing.openstreetmap.de, 10 November 2026. Station to number 74: 654 m, 8.7 minutes (shown as 9). Rochdale Interchange: 305 m, 4.1 minutes (4). Town Hall: 492 m, 6.6 minutes.

## Regenerating it

```
node scripts/map/fetch-data.mjs
node scripts/map/build-map.cjs public/images/map/drake-street.svg src/lib/map.ts
```

The first command downloads four JSON files into `scripts/map/` (they are not committed; they are about 1 MB). The second writes the SVG and `src/lib/map.ts`; never edit `map.ts` by hand, it is overwritten. The walking times are typed into `build-map.cjs` (the `walk` object) from the router; check them again if the pin moves.

The frame is a square about 1.1 km across, from the station in the south to Toad Lane in the north. Change `S`, `N` and `lonC` at the top of `build-map.cjs` to move it. Only the stretch of Drake Street people walk (north of the bend where the tram turns off for the station, `WALK_SOUTH`) is drawn in orange.
