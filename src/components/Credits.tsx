function L({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="underline">
      {children}
    </a>
  );
}

/** Credits for the found pictures and the map, on every page. Keep in step with assets/credits.json. */
export function Credits() {
  return (
    <>
      Pictures, shown recoloured:{" "}
      <L href="https://commons.wikimedia.org/wiki/File:Drake_Street_in_Rochdale_-_geograph.org.uk_-_8381751.jpg">
        &ldquo;Drake Street in Rochdale&rdquo;
      </L>{" "}
      by DS Pugh, <L href="https://creativecommons.org/licenses/by-sa/2.0">CC BY-SA 2.0</L> (this recoloured version is shared
      under the same licence);{" "}
      <L href="https://commons.wikimedia.org/wiki/File:Rochdale_station_(postcard).jpg">&ldquo;Rochdale station (postcard)&rdquo;</L>{" "}
      by B&amp;W Series, <L href="https://creativecommons.org/publicdomain/mark/1.0/">public domain</L>;{" "}
      <L href="https://commons.wikimedia.org/w/index.php?curid=152909129">&ldquo;Rochdale Town Hall and Gracie Fields statue&rdquo;</L>{" "}
      by Entropyjazz, <L href="https://creativecommons.org/publicdomain/zero/1.0/">CC0</L>;{" "}
      <L href="https://commons.wikimedia.org/w/index.php?curid=52146584">&ldquo;The Store 1&rdquo;</L> by Tim Green,{" "}
      <L href="https://creativecommons.org/licenses/by/2.0/">CC BY 2.0</L>; all via Wikimedia Commons. Map data &copy;{" "}
      <L href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</L>, ODbL.
    </>
  );
}
