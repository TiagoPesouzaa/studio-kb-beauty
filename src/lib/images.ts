/**
 * Convenção de imagens do projeto:
 * cada foto em /images/<pasta>/<nome>.webp tem a versão inteira, sem recorte,
 * em /images/full/<pasta>/<nome>.webp (gerada por scripts/optimize_photos.py).
 */
export function fullSizeOf(src: string): string {
  return src.replace(/^\/images\//, "/images/full/");
}
