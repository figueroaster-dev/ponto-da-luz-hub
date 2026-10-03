import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, MapPin, Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-lighting.jpg";
import residentialImage from "@/assets/residential-lighting.jpg";
import commercialImage from "@/assets/commercial-lighting.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ponto da Luz | Iluminação e Projetos em Belo Horizonte" },
      { name: "description", content: "Soluções em iluminação residencial, comercial e corporativa em Belo Horizonte. Conheça a Ponto da Luz e transforme seus espaços com luz." },
      { property: "og:title", content: "Ponto da Luz | Iluminação e Projetos" },
      { property: "og:description", content: "Iluminação residencial, comercial e corporativa em Belo Horizonte. A luz certa transforma tudo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const navigation = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre nós", href: "#sobre" },
  { label: "Soluções", href: "#solucoes" },
  { label: "Contato", href: "#contato" },
];

function Wordmark({ light = false }: { light?: boolean }) {
  return <a href="#inicio" aria-label="Ponto da Luz, ir para o início" className={`inline-flex items-center gap-3 shrink-0 ${light ? "text-dark-foreground" : "text-foreground"}`}>
    <span aria-hidden="true" className="relative flex size-10 items-center justify-center border border-gold rounded-full">
      <span className="size-3 rounded-full bg-gold shadow-[0_0_16px_var(--gold)]" />
      <span className="absolute -bottom-1 left-1/2 h-2 w-px -translate-x-1/2 bg-gold" />
    </span>
    <span className="flex flex-col leading-none">
      <span className="font-display text-[25px] font-semibold leading-[.8]">Ponto da Luz</span>
      <span className="mt-1.5 text-[9px] font-semibold uppercase tracking-[.22em]">Iluminação & Projetos</span>
    </span>
  </a>;
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  return <main id="inicio" className="overflow-x-hidden">
    <header className="absolute inset-x-0 top-0 z-30 border-b border-dark-foreground/20 text-dark-foreground">
      <div className="mx-auto flex h-20 max-w-[1480px] items-center justify-between px-6 md:px-12 xl:px-20">
        <Wordmark light />
        <nav aria-label="Navegação principal" className="hidden items-center gap-9 lg:flex">
          {navigation.map(item => <a key={item.label} href={item.href} className="nav-link text-[12px] font-semibold uppercase tracking-[.16em]">{item.label}</a>)}
        </nav>
        <Button variant="heroOutline" size="editorial" asChild className="hidden lg:inline-flex"><a href="tel:+553125524241">Fale conosco <ArrowUpRight /></a></Button>
        <Button variant="heroIcon" size="icon" className="lg:hidden" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
      </div>
      {menuOpen && <nav aria-label="Navegação móvel" className="flex flex-col gap-1 border-t border-dark-foreground/20 bg-dark px-6 py-5 lg:hidden">
        {navigation.map(item => <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)} className="py-3 text-sm font-medium uppercase tracking-[.15em]">{item.label}</a>)}
        <a href="tel:+553125524241" className="mt-3 border-t border-dark-foreground/20 pt-5 text-sm">(31) 2552-4241</a>
      </nav>}
    </header>

    <section aria-labelledby="hero-heading" className="relative flex min-h-[680px] h-[88svh] max-h-[920px] items-center text-dark-foreground">
      <img src={heroImage} alt="Ambiente contemporâneo com iluminação indireta e pendentes acesos" width={1600} height={1008} fetchPriority="high" className="absolute inset-0 size-full object-cover object-[60%_center]" />
      <div className="hero-shade absolute inset-0" />
      <div className="relative z-10 mx-auto w-full max-w-[1480px] px-6 pt-20 md:px-12 xl:px-20">
        <div className="max-w-[720px]">
          <div className="mb-7 flex items-center gap-3 text-gold"><span className="h-px w-9 bg-gold" /><span className="text-[11px] font-bold uppercase tracking-[.24em]">Iluminação & projetos</span></div>
          <h1 id="hero-heading" className="font-display text-[clamp(68px,8vw,130px)] font-medium leading-[.82]">Ponto<br />da <em className="font-normal text-gold">Luz.</em></h1>
          <p className="mt-9 max-w-[460px] text-base leading-relaxed text-dark-foreground/85 md:text-lg">A luz certa transforma espaços, cria atmosferas e revela novas formas de viver.</p>
          <div className="mt-9 flex flex-wrap items-center gap-5"><Button variant="hero" size="editorial" asChild><a href="#solucoes">Explore nossas soluções <ArrowUpRight /></a></Button><a href="#sobre" className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[.14em] transition-colors hover:text-gold">Conheça a Ponto da Luz <ArrowRight className="size-4" /></a></div>
        </div>
      </div>
      <a href="#sobre" aria-label="Rolar para conhecer a Ponto da Luz" className="absolute bottom-8 left-6 z-10 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.2em] md:left-12 xl:left-20">Descubra mais <ArrowDown className="size-4" /></a>
      <div className="absolute bottom-0 right-0 z-10 hidden border-t border-l border-dark-foreground/25 px-8 py-5 text-[10px] font-semibold uppercase tracking-[.2em] md:block">Belo Horizonte · MG</div>
    </section>

    <section id="sobre" className="scroll-mt-12 border-b border-border py-24 md:py-36">
      <div className="mx-auto grid max-w-[1480px] gap-12 px-6 md:grid-cols-[.7fr_1.3fr] md:gap-20 md:px-12 xl:px-20">
        <div className="flex items-start gap-3 pt-3 text-primary"><span className="mt-2 h-px w-8 bg-gold" /><span className="text-[11px] font-bold uppercase tracking-[.2em]">01 / Nossa essência</span></div>
        <div><h2 className="max-w-[900px] font-display text-[clamp(44px,5vw,78px)] leading-[1.02]">Mais que iluminar, <em className="font-normal text-muted-foreground">é dar vida</em> aos ambientes.</h2>
          <div className="mt-9 grid gap-8 border-t border-border pt-8 md:grid-cols-[1fr_auto] md:items-end"><p className="max-w-xl text-[15px] leading-8 text-muted-foreground">Há mais de 10 anos, a Ponto da Luz atua no mercado de iluminação residencial, comercial e corporativa. Unimos produtos, tecnologia e sensibilidade para encontrar a luz ideal para cada espaço.</p><a href="#contato" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.15em] text-primary hover:text-muted-foreground">Vamos conversar <ArrowUpRight className="size-4" /></a></div>
        </div>
      </div>
    </section>

    <section id="solucoes" className="scroll-mt-12 py-24 md:py-32">
      <div className="mx-auto max-w-[1480px] px-6 md:px-12 xl:px-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6"><div><p className="mb-5 text-[11px] font-bold uppercase tracking-[.2em] text-primary">02 / O que fazemos</p><h2 className="font-display text-[clamp(48px,5vw,78px)] leading-none">Luz para cada <em className="font-normal">espaço.</em></h2></div><p className="max-w-[280px] text-sm leading-7 text-muted-foreground">Soluções que equilibram funcionalidade, conforto e expressão em cada ambiente.</p></div>
        <div className="grid gap-4 md:grid-cols-2">
          <a href="#contato" className="editorial-card group relative block aspect-[4/4.2] overflow-hidden md:aspect-[4/3.5]"><img src={residentialImage} alt="Sala de jantar com pendentes e iluminação residencial aconchegante" loading="lazy" width={912} height={1104} className="editorial-image size-full object-cover" /><div className="image-shade absolute inset-0" /><div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-7 text-dark-foreground md:p-10"><div><span className="mb-2 block text-[10px] font-bold uppercase tracking-[.2em] text-gold">01 / Residencial</span><h3 className="font-display text-4xl md:text-5xl">Viver com luz</h3></div><ArrowUpRight className="size-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></div></a>
          <a href="#contato" className="editorial-card group relative block aspect-[4/4.2] overflow-hidden md:aspect-[4/3.5]"><img src={commercialImage} alt="Espaço comercial com iluminação em trilhos e luz de destaque" loading="lazy" width={912} height={1104} className="editorial-image size-full object-cover" /><div className="image-shade absolute inset-0" /><div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-7 text-dark-foreground md:p-10"><div><span className="mb-2 block text-[10px] font-bold uppercase tracking-[.2em] text-gold">02 / Comercial & corporativo</span><h3 className="font-display text-4xl md:text-5xl">Espaços que inspiram</h3></div><ArrowUpRight className="size-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></div></a>
        </div>
      </div>
    </section>

    <section className="bg-paper py-20 md:py-28"><div className="mx-auto grid max-w-[1480px] gap-10 px-6 md:grid-cols-[1fr_1fr] md:items-center md:gap-20 md:px-12 xl:px-20"><div><p className="mb-5 text-[11px] font-bold uppercase tracking-[.2em] text-primary">03 / Possibilidades</p><h2 className="font-display text-[clamp(45px,5vw,76px)] leading-[1.02]">Detalhes que fazem <em className="font-normal">toda a diferença.</em></h2></div><div className="md:border-l md:border-border md:pl-14"><p className="text-[15px] leading-8 text-muted-foreground">Fitas de LED, lâmpadas Ultra LED e Power LED: opções para compor ambientes com eficiência, qualidade e personalidade.</p><a href="#contato" className="mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.15em] text-primary hover:text-muted-foreground">Encontre a solução ideal <ArrowUpRight className="size-4" /></a></div></div></section>

    <section id="contato" className="scroll-mt-12 bg-dark py-24 text-dark-foreground md:py-32"><div className="mx-auto max-w-[1480px] px-6 md:px-12 xl:px-20"><p className="mb-8 text-[11px] font-bold uppercase tracking-[.2em] text-gold">04 / Contato</p><div className="grid gap-12 md:grid-cols-[1.2fr_.8fr] md:items-end"><div><h2 className="font-display text-[clamp(54px,7vw,108px)] leading-[.92]">Vamos iluminar<br /><em className="font-normal text-gold">suas ideias?</em></h2><p className="mt-8 max-w-[440px] text-[15px] leading-7 text-dark-foreground/70">Entre em contato e descubra as possibilidades para o seu espaço.</p><Button variant="hero" size="editorial" asChild className="mt-9"><a href="tel:+553125524241">Ligar agora <ArrowUpRight /></a></Button></div><div className="border-t border-dark-foreground/25 pt-8 md:ml-auto md:w-full md:max-w-[350px]"><p className="mb-7 text-[10px] font-bold uppercase tracking-[.2em] text-gold">Onde estamos</p><a href="tel:+553125524241" className="mb-5 flex items-start gap-4 text-lg hover:text-gold"><Phone className="mt-1 size-5 shrink-0 text-gold" />(31) 2552-4241</a><a href="https://www.google.com/maps/search/?api=1&query=Rua+Jos%C3%A9+Rodrigues+Pereira+1192+Estoril+Belo+Horizonte+MG" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 text-[15px] leading-6 hover:text-gold"><MapPin className="mt-1 size-5 shrink-0 text-gold" />Rua José Rodrigues Pereira, 1192<br />Estoril · Belo Horizonte / MG</a></div></div></div></section>
    <footer className="border-t border-dark-foreground/15 bg-dark py-8 text-dark-foreground"><div className="mx-auto flex max-w-[1480px] flex-wrap items-center justify-between gap-7 px-6 md:px-12 xl:px-20"><Wordmark light /><span className="text-xs text-dark-foreground/55">© {new Date().getFullYear()} Ponto da Luz. Todos os direitos reservados.</span><a href="#inicio" className="text-xs font-semibold uppercase tracking-[.15em] hover:text-gold">Voltar ao topo ↑</a></div></footer>
  </main>;
}
