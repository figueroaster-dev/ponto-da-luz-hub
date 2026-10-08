import { describe, expect, it } from "vitest";
import { extractCodes, products, productWhatsAppUrl } from "@/data/catalog";

describe("Imported LED catalog", () => {
  it("preserves all entries except the exact duplicate", () => {
    expect(products).toHaveLength(242);
    expect(new Set(products.map(product => product.id)).size).toBe(242);
    expect(products.filter(product => !product.image)).toHaveLength(3);
  });
  it("preserves names containing data delimiters and distinct versions", () => {
    expect(products.find(product => product.name === "Perfil SLED 9122 SF | 9122 SR")?.image).toBeTruthy();
    expect(products.filter(product => product.name.includes("Veneza Plus SLED 9186"))).toHaveLength(2);
  });
  it("extracts shorthand codes without inventing codes", () => {
    expect(extractCodes("Potenza Wall Washer SLED 1240 | 1242")).toEqual(["SLED 1240", "SLED 1242"]);
    expect(extractCodes("Perfil SLED 9122 SF | 9122 SR")).toEqual(["SLED 9122 SF", "SLED 9122 SR"]);
    expect(extractCodes("SMART ZIGBEE")).toEqual([]);
  });
  it("includes the complete variant name in the WhatsApp message", () => {
    const product = products.find(item => item.name.includes("9186 | Cluster Cristal"));
    expect(product).toBeDefined();
    if (!product) return;
    const url = new URL(productWhatsAppUrl(product));
    expect(url.pathname).toBe("/553194493666");
    expect(url.searchParams.get("text")).toContain(product.name);
  });
});