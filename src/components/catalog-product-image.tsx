import { useState } from "react";
import { ImageOff } from "lucide-react";

export function CatalogProductImage({ src, name }: { src: string; name: string }) {
  const [failed, setFailed] = useState(false);
  return src && !failed ? <img src={src} alt={name} loading="lazy" onError={() => setFailed(true)} className="size-full object-contain transition-transform duration-500 motion-reduce:transition-none group-hover:scale-[1.035]" /> :
    <div className="flex size-full flex-col items-center justify-center gap-3 p-6 text-muted-foreground"><ImageOff className="size-8" strokeWidth={1} aria-hidden="true" /><span className="text-sm">Imagem indisponível</span></div>;
}