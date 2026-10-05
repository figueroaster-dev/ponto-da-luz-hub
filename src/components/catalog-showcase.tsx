import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import alle from "@/assets/catalog/alle.asset.json";
import freddo from "@/assets/catalog/freddo.asset.json";
import casulo from "@/assets/catalog/casulo.asset.json";
import rubik from "@/assets/catalog/rubik.asset.json";
import tako from "@/assets/catalog/tako.asset.json";
import fold from "@/assets/catalog/fold.asset.json";
import vogel from "@/assets/catalog/vogel.asset.json";
import kolibri from "@/assets/catalog/kolibri.asset.json";
import calli from "@/assets/catalog/calli.asset.json";
import trilhoNeo from "@/assets/catalog/trilho-neo.asset.json";
import fitaNeo from "@/assets/catalog/fita-neo.asset.json";
import trilhoOpus from "@/assets/catalog/trilho-opus.asset.json";

const categories = ["Todos", "Pendentes", "Arandelas", "Área externa", "Iluminação técnica"] as const;
type Category = Exclude<(typeof categories)[number], "Todos">;

const products: { name: string; category: Category; brand: string; collection: string; code: string; detail: string; image: string }[] = [
  { name: "Alle", category: "Pendentes", brand: "Bella Iluminação", collection: "Tangram", code: "ALL1PD01TR10", detail: "Vidro e metal · 6 lâmpadas E27", image: alle.url },
  { name: "Freddo", category: "Pendentes", brand: "Bella Iluminação", collection: "Sublime", code: "FRE1PD01TR10", detail: "LED integrado · 30W · 3000K", image: freddo.url },
  { name: "Casulo", category: "Pendentes", brand: "Bella Iluminação", collection: "Sublime", code: "CAS1PD01TR10", detail: "Vidro texturizado · LED 7W · 3000K", image: casulo.url },
  { name: "Rubik", category: "Arandelas", brand: "Bella Iluminação", collection: "LEDPRO", code: "RUB2AR01GR10", detail: "LED integrado · 2 × 12W · IP54", image: rubik.url },
  { name: "Tako", category: "Arandelas", brand: "Bella Iluminação", collection: "LEDPRO", code: "TAK1AR01BR10", detail: "LED integrado · 10W · IP54", image: tako.url },
  { name: "Fold", category: "Arandelas", brand: "Bella Iluminação", collection: "LEDPRO", code: "FOL1AR01PT017", detail: "LED integrado · 5W · IP65", image: fold.url },
  { name: "Vogel 50 cm", category: "Área externa", brand: "Germany", collection: "Balizadores", code: "50200330-09", detail: "Verde jardim · soquete G9 · IP54", image: vogel.url },
  { name: "Kolibri 70 cm", category: "Área externa", brand: "Germany", collection: "Balizadores", code: "49210330-09", detail: "Verde jardim · soquete G9 · IP54", image: kolibri.url },
  { name: "Calli", category: "Iluminação técnica", brand: "Bella Iluminação", collection: "LEDPRO", code: "CAL1ST01PT010", detail: "Spot LED · 6W · 3000K", image: calli.url },
  { name: "Spot Trilho Neo", category: "Iluminação técnica", brand: "Avant", collection: "Neo", code: "290964745", detail: "Preto · 20W · 1400lm", image: trilhoNeo.url },
  { name: "Fita LED Neo", category: "Iluminação técnica", brand: "Avant", collection: "Neo", code: "290420575", detail: "5 m · 5W/m · 2700K–6500K", image: fitaNeo.url },
  { name: "Spot de trilho", category: "Iluminação técnica", brand: "Opus LED", collection: "Pro", code: "PRO 36823", detail: "Preto · 10W · 3000K", image: trilhoOpus.url },
];

export function CatalogShowcase() {
  const [category, setCategory] = useState<(typeof categories)[number]>("Todos");
  const visible = category === "Todos" ? products : products.filter(product => product.category === category);

  return <section id="catalogo" aria-labelledby="catalog-heading" className="scroll-mt-12 border-t border-border py-24 md:py-32">
    <div className="mx-auto max-w-[1480px] px-6 md:px-12 xl:px-20">
      <div className="grid gap-6 border-b border-border pb-9 md:grid-cols-[1.3fr_.7fr] md:items-end">
        <div><p className="mb-5 text-[11px] font-bold uppercase tracking-[.2em] text-primary">04 / Curadoria de produtos</p><h2 id="catalog-heading" className="font-display text-[clamp(48px,5vw,78px)] leading-none">Peças para <em className="font-normal">cada atmosfera.</em></h2></div>
        <p className="max-w-sm text-[15px] leading-7 text-muted-foreground md:justify-self-end">Explore nossa seleção e envie o código da peça para consultar disponibilidade, preço e prazo.</p>
      </div>

      <div className="my-8 flex flex-wrap gap-x-7 gap-y-3" aria-label="Filtrar produtos por tipo">
        {categories.map(item => <Button key={item} type="button" variant="ghost" onClick={() => setCategory(item)} aria-pressed={category === item} className={`h-auto rounded-none border-b px-0 py-2 text-xs font-semibold uppercase tracking-[.12em] hover:bg-transparent ${category === item ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"}`}>{item}</Button>)}
      </div>

      <div className="grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map(product => {
          const message = `Olá! Tenho interesse no produto ${product.name} (${product.brand}), código ${product.code}. Poderiam informar disponibilidade, preço e prazo?`;
          return <article key={product.code} className="group flex min-w-0 flex-col">
            <div className="aspect-[4/4.5] overflow-hidden bg-paper"><img src={product.image} alt={`${product.name}, ${product.category.toLowerCase()} da ${product.brand}`} loading="lazy" className="size-full object-contain transition-transform duration-500 group-hover:scale-[1.035]" /></div>
            <div className="flex grow flex-col border-b border-border py-5">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[.15em] text-primary">{product.brand} / {product.collection}</p>
              <h3 className="font-display text-[32px] leading-none">{product.name}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{product.detail}</p>
              <p className="mt-2 text-xs text-muted-foreground">Cód. <span className="font-semibold text-foreground">{product.code}</span></p>
              <a href={`https://wa.me/553194493666?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer" aria-label={`Consultar ${product.name}, código ${product.code}, pelo WhatsApp`} className="mt-auto inline-flex items-center gap-2 pt-6 text-[11px] font-bold uppercase tracking-[.1em] text-primary transition-colors hover:text-muted-foreground">Consultar pelo WhatsApp <ArrowUpRight className="size-4" /></a>
            </div>
          </article>;
        })}
      </div>
      <p className="mt-10 text-xs leading-6 text-muted-foreground">Seleção dos catálogos das marcas parceiras. Imagens ilustrativas; confirme acabamento, disponibilidade, preço e prazo em nosso atendimento.</p>
    </div>
  </section>;
}