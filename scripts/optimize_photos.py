"""
Gera as versões otimizadas (.webp) das fotos usadas no site.

Uso: python scripts/optimize_photos.py <pasta-com-as-originais>

As originais ficam fora do Git (pasta fotos/). Este script é a "receita":
se uma foto mudar, é só rodar de novo.

O recorte da foto do topo (fundo removido) é gerado uma vez com a biblioteca rembg:
    pip install "rembg[cpu]"
    rembg i -m isnet-general-use fotos/perfil/foto-01.jpeg fotos/perfil/foto-01-recorte.png
"""
import sys
from pathlib import Path
from PIL import Image, ImageOps

OUT = Path(__file__).resolve().parent.parent / "public" / "images"

# destino: (arquivo de origem, rotação em graus no sentido anti-horário,
#           centro do recorte em fração da largura/altura, proporção)
PHOTOS = {
    # Serviços (quadradas)
    "servicos/fio-a-fio.webp": ("fio-a-fio/foto-21.jpeg", 180, (0.62, 0.36), "square"),
    "servicos/volume-brasileiro.webp": ("volume-brasileiro/foto-15.jpeg", 0, (0.5, 0.45), "square"),
    "servicos/volume-kb-beauty.webp": ("volume-kb-beauty/foto-19.jpeg", 0, (0.5, 0.42), "square"),
    "servicos/volume-4d.webp": ("volume-4d/foto-20.jpeg", 0, (0.5, 0.5), "square"),
    "servicos/lash-lifting.webp": ("lash-lifting/foto-18.jpeg", 0, (0.5, 0.5), "square"),
    "servicos/brow-lamination.webp": ("brow-lamination/foto-03.jpeg", 0, (0.5, 0.4), "square"),
    "servicos/spa-sobrancelhas.webp": ("spa-sobrancelhas/foto-23.jpeg", 0, (0.6, 0.45), "square"),
    "servicos/microblading.webp": ("microblading/foto-10.jpeg", 0, (0.5, 0.45), "square"),
    # Galeria (retrato 4:5)
    "galeria/01.webp": ("microblading/foto-11.jpeg", 0, (0.5, 0.5), "portrait"),
    "galeria/02.webp": ("_a-confirmar/foto-06.jpeg", 0, (0.5, 0.5), "portrait"),
    "galeria/03.webp": ("_a-confirmar/foto-13.jpeg", 180, (0.5, 0.5), "portrait"),
    "galeria/04.webp": ("_a-confirmar/foto-08.jpeg", 180, (0.5, 0.5), "portrait"),
    "galeria/05.webp": ("_a-confirmar/foto-05.jpeg", 0, (0.5, 0.5), "portrait"),
    "galeria/06.webp": ("_a-confirmar/foto-17.jpeg", -90, (0.5, 0.5), "portrait"),
    # Topo do site: recorte com fundo transparente
    "hero/kb.webp": ("perfil/foto-01-recorte.png", 0, (0.5, 0.5), "cutout"),
    # Sobre
    "sobre/perfil.webp": ("perfil/foto-04.jpeg", 0, (0.55, 0.42), "portrait"),
}

SIZES = {"square": (800, 800), "portrait": (800, 1000)}
CUTOUT_HEIGHT = 1000


def crop_to_ratio(im: Image.Image, ratio: float, center: tuple[float, float]) -> Image.Image:
    """Recorta no maior retângulo com a proporção pedida, centrado em `center`."""
    w, h = im.size
    if w / h > ratio:
        cw, ch = int(h * ratio), h
    else:
        cw, ch = w, int(w / ratio)
    cx, cy = center[0] * w, center[1] * h
    left = min(max(int(cx - cw / 2), 0), w - cw)
    top = min(max(int(cy - ch / 2), 0), h - ch)
    return im.crop((left, top, left + cw, top + ch))


def main(src_dir: Path) -> None:
    for dest, (src, rotation, center, aspect) in PHOTOS.items():
        im = ImageOps.exif_transpose(Image.open(src_dir / src))
        if aspect == "cutout":
            # Mantém a transparência e corta as bordas vazias em volta da pessoa
            im = im.convert("RGBA")
            im = im.crop(im.getchannel("A").getbbox())
            im = im.resize((round(im.width * CUTOUT_HEIGHT / im.height), CUTOUT_HEIGHT), Image.Resampling.LANCZOS)
        else:
            im = im.convert("RGB")
            if rotation:
                im = im.rotate(rotation, expand=True)
            size = SIZES[aspect]
            im = crop_to_ratio(im, size[0] / size[1], center).resize(size, Image.Resampling.LANCZOS)
        out = OUT / dest
        out.parent.mkdir(parents=True, exist_ok=True)
        im.save(out, "WEBP", quality=80, method=6)
        print(f"{dest:40} {out.stat().st_size // 1024:>4} KB")


if __name__ == "__main__":
    main(Path(sys.argv[1]))
