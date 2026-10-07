const assets = import.meta.glob<{ url: string }>("../assets/catalog/*.asset.json", { eager: true, import: "default" });
const img = (slug: string) => assets[`../assets/catalog/${slug}.asset.json`]?.url ?? "";

export const categories = ["Pendentes", "Arandelas", "Plafons", "Área externa", "Sistema Magnético"] as const;
export type Category = (typeof categories)[number];

export type Product = { name: string; category: Category; brand: string; collection: string; code: string; detail: string; image: string; featured?: boolean };

const p = (name: string, category: Category, brand: string, collection: string, code: string, detail: string, slug: string, featured = false): Product => ({ name, category, brand, collection, code, detail, image: img(slug), featured });

export const products: Product[] = [
  p("Alle", "Pendentes", "Bella Iluminação", "Tangram", "ALL1PD01TR10", "Vidro e metal · 6 lâmpadas E27", "alle", true),
  p("Freddo", "Pendentes", "Bella Iluminação", "Sublime", "FRE1PD01TR10", "LED integrado · 30W · 3000K", "freddo", true),
  p("Casulo", "Pendentes", "Bella Iluminação", "Sublime", "CAS1PD01TR10", "Vidro texturizado · LED 7W · 3000K", "casulo", true),
  p("Rubik", "Arandelas", "Bella Iluminação", "LEDPRO", "RUB2AR01GR10", "LED integrado · 2 × 12W · IP54", "rubik", true),
  p("Tako", "Arandelas", "Bella Iluminação", "LEDPRO", "TAK1AR01BR10", "LED integrado · 10W · IP54", "tako", true),
  p("Fold", "Arandelas", "Bella Iluminação", "LEDPRO", "FOL1AR01PT017", "LED integrado · 5W · IP65", "fold", true),
  p("Vogel 50 cm", "Área externa", "Germany", "Balizadores", "50200330-09", "Verde jardim · soquete G9 · IP54", "vogel", true),
  p("Kolibri 70 cm", "Área externa", "Germany", "Balizadores", "49210330-09", "Verde jardim · soquete G9 · IP54", "kolibri", true),

  p("Pendente LED Celine", "Pendentes", "Blumenau", "Celine", "86853228", "Acrílico transparente · LED 32W · 3000K", "celine"),
  p("Pendente LED Diana", "Pendentes", "Blumenau", "Diana", "86862418", "Acrílico · LED 24W · 3000K", "diana"),
  p("Pendente LED Mirian", "Pendentes", "Blumenau", "Mirian", "86823030", "Dourado escovado · LED 50W · 3000lm", "mirian"),
  p("Pendente LED Dama", "Pendentes", "Blumenau", "Dama", "86793130", "Anel dourado · LED 32W · 1920lm", "dama"),
  p("Pendente LED Atena", "Pendentes", "Blumenau", "Atena", "86743004", "Branco · LED 18W · 1400lm", "atena-pendente"),
  p("Arandela LED Maitê", "Arandelas", "Blumenau", "Maitê", "20813082", "Acrílico texturizado · LED integrado", "maite"),
  p("Arandela Vintage Cover", "Arandelas", "Blumenau", "Vintage", "925300-12", "Marrom gold · vidro champagne · E27", "vintage-cover"),
  p("Arandela Tube", "Arandelas", "Blumenau", "Tube", "883611-08", "Cúpula articulada · GU10 7W", "tube"),
  p("Plafon LED Atena", "Plafons", "Blumenau", "Atena", "86743104", "Branco · LED 18W · 1400lm · 3000K", "atena-plafon"),
  p("Plafon LED Ester", "Plafons", "Blumenau", "Ester", "86731030", "Acrílico texturizado · LED 24W · 1900lm", "ester"),
  p("Arandela Jung", "Área externa", "Germany", "Arandelas", "52100102-16", "Preto fosco · luz indireta", "jung"),
  p("Módulo Magnético Fold", "Sistema Magnético", "Mister LED", "Fold", "ML-M-FOLD", "LED 12W · Orientável", "fold", true),
  p("Módulo Magnético Tube", "Sistema Magnético", "Mister LED", "Tube", "ML-M-TUBE", "LED 7W · Luz pontual", "tube", true),
];

export const brands = [...new Set(products.map(item => item.brand))].sort();
