import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CatalogProductImage } from "@/components/catalog-product-image";
import { products, productWhatsAppUrl } from "@/data/catalog";

export const Route = createFileRoute("/produto/$id")({
  head: ({ params }) => {
    const product = products.find(item => item.id === params.id || item.code === params.id);
    const title = product ? `${product.name} | Ponto da Luz` : "Produto não encontrado | Ponto da Luz";
    const description = product ? `${product.name}, da Mister LED. Consulte acabamentos, especificações, preço e disponibilidade com a Ponto da Luz em Belo Horizonte.` : "Encontre soluções de iluminação no catálogo da Ponto da Luz.";
    return { meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }, ...(product?.image.startsWith("https://") ? [{ property: "og:image", content: product.image }, { name: "twitter:image", content: product.image }] : [])] };
  },
  component: ProductPage,
});

function ProductPage() {
  const { id } = Route.useParams();
  const product = products.find((p) => p.id === id || p.code === id);

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

  const techInfo = product.detail.split("·").map(i => i.trim()).filter(Boolean);

  return (
    <main className="min-h-screen bg-background pb-24 overflow-x-hidden">
      <header className="border-b border-border bg-card px-6 py-5 md:px-12 xl:px-20">
        <div className="mx-auto flex max-w-[1480px] items-center justify-between">
          <Link to="/" hash="catalogo" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.1em] text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="size-4" /> Voltar ao catálogo
          </Link>
          <div className="text-right">
            <span className="font-display text-2xl font-semibold leading-none text-foreground block">Ponto da Luz</span>
          </div>
        </div>
      </header>

      <article className="mx-auto max-w-[1480px] px-6 pt-12 md:px-12 xl:px-20 md:pt-20">
        <div className="mb-12">
          <h1 className="break-words font-display text-3xl leading-tight text-foreground md:text-5xl">{product.name}</h1>
          <p className="mt-3 text-sm text-muted-foreground">Produtos / {product.category} / {product.collection}</p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] items-start">
          <div className="relative aspect-square overflow-hidden bg-paper p-8 flex items-center justify-center border border-border">
            <CatalogProductImage src={product.image} name={product.name} />
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
              {product.code && <li className="break-words"><strong className="font-semibold text-foreground">Código:</strong> {product.code}</li>}
              <li>Acabamentos, especificações, preço e prazo sob consulta.</li>
            </ul>

            <Button variant="hero" size="editorial" asChild className="h-auto min-h-12 w-fit max-w-full whitespace-normal py-3">
              <a href={productWhatsAppUrl(product)} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 size-5" /> Consultar pelo WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </article>
    </main>
  );
}
