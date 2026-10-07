import { useMemo, useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { brands, categories, products } from "@/data/catalog";

const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export function CatalogShowcase() {
  const [category, setCategory] = useState<string>("Todos");
  const [brand, setBrand] = useState("Todas");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = normalize(query.trim());
    return products.filter(item => (category === "Todos" || item.category === category) && (brand === "Todas" || item.brand === brand) && (!q || normalize(`${item.name} ${item.code} ${item.brand} ${item.collection} ${item.detail}`).includes(q)));
  }, [category, brand, query]);

  return <section id="catalogo" aria-labelledby="catalog-heading" className="scroll-mt-12 border-t border-border py-24 md:py-32">
    <div className="mx-auto max-w-[1480px] px-6 md:px-12 xl:px-20">
      <div className="grid gap-6 border-b border-border pb-9 md:grid-cols-[1.3fr_.7fr] md:items-end">
        <div><p className="mb-5 text-[11px] font-bold uppercase tracking-[.2em] text-primary">04 / Catálogo de produtos</p><h2 id="catalog-heading" className="font-display text-[clamp(48px,5vw,78px)] leading-none">Peças para <em className="font-normal">cada atmosfera.</em></h2></div>
        <p className="max-w-sm text-[15px] leading-7 text-muted-foreground md:justify-self-end">Busque por nome ou código e envie a peça escolhida para consultar disponibilidade, preço e prazo.</p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-[1fr_240px]">
        <label className="flex h-12 items-center gap-3 border border-border bg-card px-4 focus-within:border-ring">
          <Search className="size-4 text-muted-foreground" aria-hidden="true" />
          <span className="sr-only">Buscar produto</span>
          <input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar por nome, código ou marca" className="h-full w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
        </label>
        <label className="flex h-12 items-center border border-border bg-card px-4">
          <span className="sr-only">Filtrar por marca</span>
          <select value={brand} onChange={e => setBrand(e.target.value)} className="h-full w-full bg-transparent text-sm outline-none">
            <option value="Todas">Todas as marcas</option>
            {brands.map(item => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
      </div>

      <div className="my-7 flex flex-wrap gap-x-7 gap-y-3" aria-label="Filtrar produtos por tipo">
        {["Todos", ...categories].map(item => <Button key={item} type="button" variant="ghost" onClick={() => setCategory(item)} aria-pressed={category === item} className={`h-auto rounded-none border-b px-0 py-2 text-xs font-semibold uppercase tracking-[.12em] hover:bg-transparent ${category === item ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"}`}>{item}</Button>)}
      </div>

      <p className="mb-8 text-xs uppercase tracking-[.12em] text-muted-foreground" aria-live="polite">{visible.length} {visible.length === 1 ? "produto" : "produtos"}</p>

      {visible.length === 0 ? <div className="border border-border bg-paper p-10 text-center"><p className="font-display text-3xl">Nenhuma peça encontrada.</p><p className="mt-3 text-sm text-muted-foreground">Tente outro termo ou fale conosco para encontrarmos a opção ideal.</p><Button type="button" variant="outline" className="mt-6" onClick={() => { setQuery(""); setBrand("Todas"); setCategory("Todos"); }}>Limpar filtros</Button></div> :
      <div className="grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map(product => {
          const message = `Olá! Tenho interesse no produto ${product.name} (${product.brand}), código ${product.code}. Poderiam informar disponibilidade, preço e prazo?`;
          return <article key={product.code} className="group flex min-w-0 flex-col">
            <div className="relative aspect-[4/4.5] overflow-hidden bg-paper">
              <img src={product.image} alt={`${product.name}, ${product.category.toLowerCase()} da ${product.brand}`} loading="lazy" className="size-full object-contain transition-transform duration-500 group-hover:scale-[1.035]" />
              {product.featured && <span className="absolute left-3 top-3 bg-dark px-2.5 py-1 text-[9px] font-bold uppercase tracking-[.15em] text-gold">Destaque</span>}
            </div>
            <div className="flex grow flex-col border-b border-border py-5">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[.15em] text-primary">{product.brand} / {product.collection}</p>
              <h3 className="font-display text-[32px] leading-none">{product.name}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{product.detail}</p>
              <p className="mt-2 text-xs text-muted-foreground">Cód. <span className="font-semibold text-foreground">{product.code}</span></p>
              <a href={`https://wa.me/553194493666?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer" aria-label={`Consultar ${product.name}, código ${product.code}, pelo WhatsApp`} className="mt-auto inline-flex items-center gap-2 pt-6 text-[11px] font-bold uppercase tracking-[.1em] text-primary transition-colors hover:text-muted-foreground">Consultar pelo WhatsApp <ArrowUpRight className="size-4" /></a>
            </div>
          </article>;
        })}
      </div>}
      <p className="mt-10 text-xs leading-6 text-muted-foreground">Seleção dos catálogos das marcas parceiras. Imagens ilustrativas; confirme acabamento, disponibilidade, preço e prazo em nosso atendimento.</p>
    </div>
  </section>;
}
