import entries from "./catalog-led.json";

const assets = import.meta.glob<{ url: string }>("../assets/catalog-led/*.asset.json", { eager: true, import: "default" });

export const catalogLines = [
  { id: "veneza", title: "Linha", emphasis: "Veneza", label: "Veneza", match: /veneza/i },
  { id: "potenza", title: "Linha", emphasis: "Potenza", label: "Potenza", match: /potenza/i },
  { id: "creta", title: "Linha", emphasis: "Creta", label: "Creta", match: /creta/i },
  { id: "modulares", title: "Sistemas modulares", emphasis: "S33 / S40 / S50", label: "Sistemas modulares", match: /\b(s33|s40|s50|e46|e70|e73)\b|sistema de alta performance/i },
  { id: "balizadores", title: "Iluminação de chão &", emphasis: "balizadores", label: "Balizadores", match: /balizador|quadrato|linea|lisboa|berlim|dublin|madri|barcelona|^(mini brut|grand brut|brut)/i },
  { id: "arandelas", title: "Design em", emphasis: "arandelas", label: "Arandelas", match: /arandela|^geo\b/i },
  { id: "perfis", title: "Perfis lineares &", emphasis: "rodapés", label: "Perfis e rodapés", match: /perfil|rodap[eé]|rodateto|tabica|corner|retangular|fitas de led|barras de led|lumina back|\b(k10|k25n?|k35|k36|k39n?|k40n?|k50|p10|p50|r2|r6|r10|r12|r15|r25|r27|m10|m15|m19|m20|w20|w22|w23|w25|w30f|w96|w110|ex04|ex06|ex07|ex08|ex10|ex12|ex13|ex16|l40|s80)\b/i },
  { id: "drivers", title: "Drivers &", emphasis: "fontes técnicas", label: "Drivers e fontes", match: /driver|fonte|conector tipo hub/i },
  { id: "spots", title: "Focos, spots &", emphasis: "projetores", label: "Spots e projetores", match: /spot|projetor|focus|petra|eye|new roma|trilho/i },
  { id: "smart", title: "Controles &", emphasis: "automação smart", label: "Controles e automação", match: /smart|zigbee|wi-fi|controlador|dimmer|repetidor|skywindows|temperatura de cor/i },
  { id: "outras", title: "Outras", emphasis: "soluções em luz", label: "Outras soluções", match: /./ },
] as const;

export type Product = { id: string; name: string; category: string; brand: string; collection: string; code: string; codes: string[]; detail: string; image: string; line: string };

export function extractCodes(name: string): string[] {
  // Start at the first SLED, preserving variant suffixes and subsequent shorthand codes.
  const start = name.search(/SLED/i);
  if (start < 0) return [];
  const matches = name.slice(start).match(/\b\d{4,5}[a-z]*(?:-\d+)?(?:\s+(?:SF|SR|AF|AU|SU|PF|PU|EF|ER|SE|SP|PD|MD|TR|P|S)\b)?/gi) ?? [];
  return [...new Set(matches.map(code => `SLED ${code.replace(/\s+/g, " ").toUpperCase()}`))];
}

export const products: Product[] = entries.map(entry => {
  const line = catalogLines.find(item => item.match.test(entry.name)) ?? catalogLines[10];
  const codes = extractCodes(entry.name);
  return { id: entry.id, name: entry.name, category: line.label, brand: "Mister LED", collection: line.label, code: codes.join(" / "), codes, detail: "", line: line.id, image: assets[`../assets/catalog-led/${entry.imageSlug}.asset.json`]?.url ?? "" };
});

export const categories = catalogLines.map(line => line.label);
export const brands = ["Mister LED"];

export function productWhatsAppUrl(product: Product) {
  const message = `Olá! Tenho interesse no produto ${product.name} (${product.brand}). Poderiam informar disponibilidade, preço e prazo?`;
  return `https://wa.me/553194493666?text=${encodeURIComponent(message)}`;
}
