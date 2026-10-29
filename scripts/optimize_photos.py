"""
Gera as versões otimizadas (.webp) das fotos usadas no site.

Uso: python scripts/optimize_photos.py <pasta-com-as-originais>

Qual foto vai para onde fica em scripts/photos.json (o script não muda de um cliente
para outro, só o JSON). Cada entrada:
    "destino.webp": {"src": "pasta/foto.jpeg", "rotate": 0, "center": [0.5, 0.5], "aspect": "square"}
- rotate: graus no sentido anti-horário (180 desvira foto de cabeça para baixo)
- center: centro do recorte, em fração da largura e da altura
- aspect: "square" (1:1), "portrait" (4:5), "cutout" (recorte com fundo transparente)
  ou "social" (1200x630, a imagem que aparece ao compartilhar o link e no Google)
- background / arch (só no "social"): cor do fundo e do arco. Com recorte, a pessoa fica sobre o fundo;
  com foto comum, a foto inteira fica dentro do arco

Para cada foto (menos recortes) também sai uma versão inteira, sem corte, em
public/images/full/<mesmo caminho>: é a que abre em tela cheia quando a pessoa toca na foto.

As originais ficam fora do Git (pasta fotos/). Este script é a "receita":
se uma foto mudar, é só rodar de novo.

O recorte da foto do topo (fundo removido) é gerado uma vez com a biblioteca rembg:
    pip install "rembg[cpu]"
    rembg i -m isnet-general-use fotos/perfil/foto-01.jpeg fotos/perfil/foto-01-recorte.png
"""
import json
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageOps

OUT = Path(__file__).resolve().parent.parent / "public" / "images"

CONFIG = Path(__file__).resolve().parent / "photos.json"

SIZES = {"square": (800, 800), "portrait": (800, 1000)}
CUTOUT_HEIGHT = 1000
SOCIAL_SIZE = (1200, 630)
FULL_MAX_SIDE = 1400


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


def save(im: Image.Image, dest: Path) -> None:
    """Salva no formato da extensão: .webp para o site, .jpg para redes sociais."""
    dest.parent.mkdir(parents=True, exist_ok=True)
    if dest.suffix == ".jpg":
        im.convert("RGB").save(dest, "JPEG", quality=85, optimize=True, progressive=True)
    else:
        im.save(dest, "WEBP", quality=80, method=6)
    print(f"{dest.relative_to(OUT).as_posix():40} {dest.stat().st_size // 1024:>4} KB")


def make_cutout(im: Image.Image) -> Image.Image:
    """Mantém a transparência e corta as bordas vazias em volta da pessoa."""
    im = im.convert("RGBA")
    im = im.crop(im.getchannel("A").getbbox())
    return im.resize((round(im.width * CUTOUT_HEIGHT / im.height), CUTOUT_HEIGHT), Image.Resampling.LANCZOS)


def draw_arch(canvas: Image.Image, width: int, top: int, color: str) -> None:
    """Desenha um arco (retângulo com o topo arredondado) centralizado e encostado embaixo."""
    w, h = canvas.size
    ImageDraw.Draw(canvas).rounded_rectangle(
        ((w - width) // 2, top, (w + width) // 2, h + width // 2), radius=width // 2, fill=color
    )


def make_social(im: Image.Image, item: dict) -> Image.Image:
    """
    Imagem de compartilhamento (1200x630). Três formatos, conforme a foto e o JSON:
    - recorte (PNG sem fundo): a pessoa sobre a cor de fundo, com arco atrás;
    - foto comum com "background": a foto inteira dentro de um arco, sobre a cor de fundo;
    - foto comum sem "background": a foto recortada para preencher tudo.
    """
    w, h = SOCIAL_SIZE
    if im.mode == "RGBA":
        canvas = Image.new("RGB", SOCIAL_SIZE, item.get("background", "#ffffff"))
        person = make_cutout(im)
        person = person.resize((round(person.width * h * 0.94 / person.height), round(h * 0.94)), Image.Resampling.LANCZOS)
        if "arch" in item:
            draw_arch(canvas, round(person.width * 1.15), round(h * 0.12), item["arch"])
        canvas.paste(person, ((w - person.width) // 2, h - person.height), person)
        return canvas

    im = im.convert("RGB")
    if "background" not in item:
        return crop_to_ratio(im, w / h, tuple(item.get("center", (0.5, 0.5)))).resize(SOCIAL_SIZE, Image.Resampling.LANCZOS)

    # Foto inteira em retrato (3:4) dentro de um arco, com uma borda do arco em volta
    canvas = Image.new("RGB", SOCIAL_SIZE, item["background"])
    frame_h = round(h * 0.88)
    frame_w = round(frame_h * 3 / 4)
    if "arch" in item:
        draw_arch(canvas, frame_w + 32, h - frame_h - 16, item["arch"])
    photo = crop_to_ratio(im, 3 / 4, tuple(item.get("center", (0.5, 0.5)))).resize((frame_w, frame_h), Image.Resampling.LANCZOS)
    mask = Image.new("L", photo.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, frame_w, frame_h + frame_w), radius=frame_w // 2, fill=255)
    canvas.paste(photo, ((w - frame_w) // 2, h - frame_h), mask)
    return canvas


def make_full(im: Image.Image) -> Image.Image:
    """Foto inteira, sem recorte, para abrir em tela cheia."""
    im = im.copy()
    im.thumbnail((FULL_MAX_SIDE, FULL_MAX_SIDE), Image.Resampling.LANCZOS)
    return im


def main(src_dir: Path) -> None:
    photos = json.loads(CONFIG.read_text(encoding="utf-8"))
    for dest, item in photos.items():
        im = ImageOps.exif_transpose(Image.open(src_dir / item["src"]))

        if item["aspect"] == "cutout":
            save(make_cutout(im), OUT / dest)
            continue
        if item["aspect"] == "social":
            save(make_social(im, item), OUT / dest)
            continue

        im = im.convert("RGB")
        if item["rotate"]:
            im = im.rotate(item["rotate"], expand=True)
        size = SIZES[item["aspect"]]
        thumb = crop_to_ratio(im, size[0] / size[1], tuple(item["center"])).resize(size, Image.Resampling.LANCZOS)
        save(thumb, OUT / dest)
        # Versão inteira em images/full/<mesmo caminho>, usada ao tocar na foto
        save(make_full(im), OUT / "full" / dest)


if __name__ == "__main__":
    main(Path(sys.argv[1]))
