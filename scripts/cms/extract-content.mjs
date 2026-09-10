/**
 * One-off: pull the real Capital Tours content out of the TS source files and
 * dump it as JSON, so the WordPress seed uses the actual programmes rather
 * than a hand-retyped copy that would already be drifting.
 *
 * The files import images and types, which cannot resolve outside Vite, so the
 * import lines are stripped and every image identifier becomes its filename.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import path from "node:path";

const SRC = "C:/Users/Administrateur/Desktop/sites/CapitalTours/src/lib";
const OUT = path.dirname(new URL(import.meta.url).pathname.slice(1));

function loadable(file) {
  const raw = readFileSync(path.join(SRC, file), "utf8");
  const stubs = [];
  const body = raw
    .split("\n")
    .filter((line) => {
      const m = line.match(/^import\s+(?:type\s+)?(\w+)\s+from\s+"([^"]+)"/);
      if (m) {
        // image import -> keep the identifier, give it the file name as value
        stubs.push(`const ${m[1]} = ${JSON.stringify("/" + path.basename(m[2]))};`);
        return false;
      }
      return !line.startsWith("import ");
    })
    // drop TS-only constructs the stripper would choke on outside a project
    .join("\n")
    .replace(/^export type [\s\S]*?^};$/gm, "")
    .replace(/^export type .*$/gm, "")
    .replace(/\bsatisfies\s+[\w<>\[\]{}.\s|]+/g, "");
  return stubs.join("\n") + "\n" + body;
}

const combined =
  loadable("tours.ts").replace(/\bIMG\b(?=\s*=)/, "IMG") +
  "\n" +
  loadable("pilgrimage.ts").replace(/^import.*$/gm, "");

const tmp = path.join(OUT, "_content.mts");
writeFileSync(tmp, combined, "utf8");

const mod = await import(pathToFileURL(tmp).href);
const out = {
  tours: mod.featuredTours,
  destinations: mod.destinationsMaroc,
  pilgrimage: mod.pilgrimagePrograms,
};
writeFileSync(path.join(OUT, "content.json"), JSON.stringify(out, null, 2), "utf8");
console.log(
  `tours=${out.tours.length} destinations=${out.destinations.length} pilgrimage=${out.pilgrimage.length}`,
);
