// Keep media references outside route modules so lazy chunks import stable exports.
import heroAsset from "@/assets/hero-lighting.png.asset.json";

export const heroImage = heroAsset.url;
export const residentialImage = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&auto=format&fit=crop";
export const commercialImage = "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop";