import type { ServiceCategory } from "@/types";

/**
 * Catálogo de serviços, na mesma ordem e com os mesmos nomes do catálogo do WhatsApp dela.
 * Fotos: geradas por scripts/optimize_photos.py em /public/images/servicos/<slug>.webp
 * Serviço sem `image` mostra um espaço reservado.
 */
export const serviceCategories: ServiceCategory[] = [
  {
    id: "cilios",
    title: "Cílios",
    services: [
      {
        slug: "fio-a-fio",
        name: "Volume Fio a Fio",
        description: "Um fio aplicado em cada cílio natural, para um efeito leve, de rímel. Manutenção a cada 20 dias.",
        image: "/images/servicos/fio-a-fio.webp",
      },
      {
        slug: "volume-brasileiro",
        name: "Volume Brasileiro",
        description: "Fios em formato de Y que dão mais volume sem pesar no olhar. Manutenção a cada 20 dias.",
        image: "/images/servicos/volume-brasileiro.webp",
      },
      {
        slug: "volume-kb-beauty",
        name: "Volume KB Beauty",
        description: "Técnica de capping que dura mais de 30 dias, sem necessidade de manutenção.",
        image: "/images/servicos/volume-kb-beauty.webp",
      },
      {
        slug: "divine-bloom-3d",
        name: "Volume Divine Bloom 3D",
        description: "Manutenção a cada 20 dias.",
      },
      {
        slug: "volume-4d",
        name: "Volume 4D",
        description: "Manutenção a cada 20 dias.",
        image: "/images/servicos/volume-4d.webp",
      },
      {
        slug: "divine-power",
        name: "Volume Divine Power",
        description: "Técnica de capping que dura mais de 30 dias, sem necessidade de manutenção.",
      },
      {
        slug: "lash-lifting",
        name: "Lash Lifting",
        description: "Curva e alonga os seus cílios naturais, sem extensão. Também com tintura.",
        image: "/images/servicos/lash-lifting.webp",
      },
    ],
  },
  {
    id: "sobrancelhas",
    title: "Sobrancelhas",
    services: [
      {
        slug: "brow-lamination",
        name: "Brow Lamination",
        description: "Alinha e fixa os fios, deixando as sobrancelhas cheias e penteadas. Também com tintura.",
        image: "/images/servicos/brow-lamination.webp",
      },
      {
        slug: "design-com-henna",
        name: "Design com Henna",
        description: "Desenho personalizado com aplicação de henna.",
        image: "/images/servicos/design-com-henna.webp",
      },
      {
        slug: "design-sobrancelhas",
        name: "Design de Sobrancelhas",
        description: "Desenho pensado para o formato do seu rosto.",
      },
      {
        slug: "spa-sobrancelhas",
        name: "Spa das Sobrancelhas",
        description: "Um momento de cuidado para a região, feito junto com o design, com ou sem henna.",
        image: "/images/servicos/spa-sobrancelhas.webp",
      },
      {
        slug: "microblading",
        name: "Microblading",
        description: "Micropigmentação com efeito de fios naturais.",
        image: "/images/servicos/microblading.webp",
      },
      // Micro Shadow: adicionar quando houver fotos
    ],
  },
];
