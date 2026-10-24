"""
Gera as versões otimizadas (.webp) das fotos usadas no site.

Uso: python scripts/optimize_photos.py <pasta-com-as-originais>

Qual foto vai para onde fica em scripts/photos.json (o script não muda de um cliente
para outro, só o JSON). Cada entrada:
    "destino.webp": {"src": "pasta/foto.jpeg", "rotate": 0, "center": [0.5, 0.5], "aspect": "square"}
- rotate: graus no sentido anti-horário (180 desvira foto de cabeça para baixo)
- center: centro do recorte, em fração da largura e da altura
- aspect: "square" (1:1), "portrait" (4:5) ou "cutout" (recorte com fundo transparente)

As originais ficam fora do Git (pasta fotos/). Este script é a "receita":
se uma foto mudar, é só rodar de novo.

O recorte da foto do topo (fundo removido) é gerado uma vez com a biblioteca rembg:
    pip install "rembg[cpu]"
    rembg i -m isnet-general-use fotos/perfil/foto-01.jpeg fotos/perfil/foto-01-recorte.png
"""
import json
import sys
from pathlib import Path
from PIL import Image, ImageOps

OUT = Path(__file__).resolve().parent.parent / "public" / "images"

CONFIG = Path(__file__).resolve().parent / "photos.json"

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
    photos = json.loads(CONFIG.read_text(encoding="utf-8"))
    for dest, item in photos.items():
        src, rotation, center, aspect = item["src"], item["rotate"], tuple(item["center"]), item["aspect"]
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
