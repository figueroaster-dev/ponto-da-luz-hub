import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/data/catalog";

export const Route = createFileRoute("/produto/$id")({
  component: ProductPage,
});

function ProductPage() {
  const { id } = Route.useParams();
  const product = products.find((p) => p.code === id);

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
        <h1 className="font-display text-4xl">Produto não encontrado</h1>
        <Button asChild className="mt-6" variant="outline">
          <Link to="/">Voltar ao início</Link>
        </Button>
      </div>
    );
  }

  const message = `Olá! Tenho interesse no produto ${product.name} (${product.brand}), código ${product.code}. Poderiam informar disponibilidade, preço e prazo?`;
  const techInfo = product.detail.split("·").map(i => i.trim()).filter(Boolean);

  return (
    <main className="min-h-screen bg-background pb-24 overflow-x-hidden">
      <header className="border-b border-border bg-card px-6 py-5 md:px-12 xl:px-20">
        <div className="mx-auto flex max-w-[1480px] items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.1em] text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="size-4" /> Voltar ao catálogo
          </Link>
          <div className="text-right">
            <span className="font-display text-2xl font-semibold leading-none text-foreground block">Ponto da Luz</span>
          </div>
        </div>
      </header>

      <article className="mx-auto max-w-[1480px] px-6 pt-12 md:px-12 xl:px-20 md:pt-20">
        <div className="mb-12">
          <h1 className="font-display text-[clamp(32px,4vw,48px)] leading-none text-foreground uppercase">{product.name}</h1>
          <p className="mt-3 text-sm text-muted-foreground">Produtos / {product.category} / {product.collection}</p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] items-start">
          <div className="relative aspect-square overflow-hidden bg-paper p-8 flex items-center justify-center border border-border">
            {product.featured && <span className="absolute left-4 top-4 bg-dark px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.15em] text-gold">Novo</span>}
            <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain" />
          </div>

          <div className="flex flex-col py-2">
            <h2 className="text-2xl font-semibold text-primary mb-6">Informações dos produtos</h2>
            <ul className="flex flex-col gap-3 text-[15px] text-muted-foreground mb-12">
              {techInfo.map((info, i) => {
                const parts = info.split(":");
                if (parts.length > 1) {
                  const key = parts.shift();
                  const val = parts.join(":");
                  return <li key={i}><strong className="font-semibold text-foreground">{key}:</strong>{val}</li>;
                }
                return <li key={i}>{info}</li>;
              })}
              <li><strong className="font-semibold text-foreground">Marca:</strong> {product.brand}</li>
              <li><strong className="font-semibold text-foreground">Código:</strong> {product.code}</li>
            </ul>

            <Button variant="hero" size="editorial" asChild className="w-fit">
              <a href={`https://wa.me/553194493666?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 size-5" /> Consultar pelo WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </article>
    </main>
  );
}
