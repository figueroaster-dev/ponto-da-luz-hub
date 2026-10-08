import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CatalogProductImage } from "@/components/catalog-product-image";
import { catalogLines, products, productWhatsAppUrl } from "@/data/catalog";

const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export function CatalogShowcase() {
  const [line, setLine] = useState("todos");
  const [query, setQuery] = useState("");
  const visible = useMemo(() => {
    const tokens = normalize(query).trim().split(/\s+/).filter(Boolean);
    return products.filter(item => (line === "todos" || item.line === line) && tokens.every(token => normalize(`${item.name} ${item.code} ${item.category} ${item.brand}`).includes(token)));
  }, [line, query]);
  const groups = catalogLines.map(group => ({ ...group, items: visible.filter(product => product.line === group.id) })).filter(group => group.items.length > 0);
  const reset = () => { setQuery(""); setLine("todos"); };

  return <section id="catalogo" aria-labelledby="catalog-heading" className="scroll-mt-12 border-t border-border py-24 md:py-32">
    <div className="mx-auto max-w-[1480px] px-6 md:px-12 xl:px-20">
      <div className="grid gap-6 border-b border-border pb-9 md:grid-cols-[1.3fr_.7fr] md:items-end">
        <div><p className="mb-5 text-[11px] font-bold uppercase tracking-[.2em] text-primary">05 / Catálogo de produtos</p><h2 id="catalog-heading" className="font-display text-5xl leading-none md:text-7xl">Iluminação <em className="font-normal">LED.</em></h2></div>
        <div className="max-w-sm md:justify-self-end"><p className="text-xs font-bold uppercase tracking-[.15em] text-primary">Mister LED / Ponto da Luz</p><p className="mt-3 text-[15px] leading-7 text-muted-foreground">Design e tecnologia para cada ambiente. Disponibilidade, preço e prazo sob consulta.</p></div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <label className="flex h-12 min-w-0 flex-1 basis-full items-center gap-3 border border-border bg-card px-4 focus-within:border-ring sm:basis-0">
          <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          <span className="sr-only">Buscar produto</span>
          <input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar por modelo ou código" className="h-full w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:appearance-none" />
          {query && <Button type="button" size="icon" variant="ghost" onClick={() => setQuery("")} aria-label="Limpar busca" title="Limpar busca" className="size-8 shrink-0"><X /></Button>}
        </label>
        <p className="text-xs text-muted-foreground" aria-live="polite" aria-atomic="true">{visible.length} de {products.length} produtos</p>
      </div>

      <nav className="my-7 flex flex-wrap gap-x-6 gap-y-2 border-b border-border pb-5" aria-label="Filtrar produtos por linha">
        {[{ id: "todos", label: "Todos" }, ...catalogLines].map(item => <Button key={item.id} type="button" variant="ghost" onClick={() => setLine(item.id)} aria-pressed={line === item.id} className={`h-auto max-w-full whitespace-normal rounded-none border-b px-0 py-2 text-xs font-semibold hover:bg-transparent ${line === item.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"}`}>{item.label}</Button>)}
      </nav>

      {visible.length === 0 ? <div className="py-14 text-center"><p className="font-display text-3xl">Nenhuma peça encontrada.</p><Button type="button" variant="outline" className="mt-6" onClick={reset}>Limpar filtros</Button></div> :
        <div className="space-y-16">
          {groups.map(group => <div key={group.id} aria-labelledby={`catalog-${group.id}`}>
            <div className="mb-7 flex flex-wrap items-end justify-between gap-3 border-b border-border pb-5">
              <h3 id={`catalog-${group.id}`} className="font-display text-3xl leading-tight md:text-4xl">{group.title} <em className="font-normal">{group.emphasis}</em></h3>
              <span className="text-xs text-muted-foreground">{group.items.length} {group.items.length === 1 ? "produto" : "produtos"}</span>
            </div>
            <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {group.items.map(product => <article key={product.id} className="group flex min-w-0 flex-col" data-product-id={product.id}>
                <Link to="/produto/$id" params={{ id: product.id }} aria-label={`Ver ${product.name}`} className="block aspect-square overflow-hidden bg-paper">
                  <CatalogProductImage src={product.image} name={product.name} />
                </Link>
                <div className="flex grow flex-col border-b border-border py-5">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[.15em] text-primary">Mister LED</p>
                  <Link to="/produto/$id" params={{ id: product.id }} className="transition-colors hover:text-primary"><h4 className="break-words font-display text-2xl leading-tight">{product.name}</h4></Link>
                  {product.codes.length > 0 && <p className="mt-3 break-words text-xs leading-5 text-muted-foreground">{product.code}</p>}
                  <Button variant="link" asChild className="mt-auto h-auto justify-start whitespace-normal px-0 pb-0 pt-5 text-left text-[11px] font-bold uppercase tracking-[.06em]">
                    <a href={productWhatsAppUrl(product)} target="_blank" rel="noopener noreferrer" aria-label={`Consultar ${product.name} pelo WhatsApp`}>Consultar pelo WhatsApp <ArrowUpRight className="size-4 shrink-0" /></a>
                  </Button>
                </div>
              </article>)}
            </div>
          </div>)}
        </div>}
      <p className="mt-12 border-t border-border pt-6 text-xs leading-6 text-muted-foreground">Imagens ilustrativas. Confirme acabamentos, especificações, disponibilidade, preço e prazo com a Ponto da Luz.</p>
    </div>
  </section>;
}
