import type { ServiceCategory } from "@/types";

/**
 * Catálogo de serviços.
 * Para adicionar a foto de um serviço: salve em /public/images/servicos/<slug>.jpg
 * e preencha `image` com esse caminho.
 */
export const serviceCategories: ServiceCategory[] = [
  {
    id: "cilios",
    title: "Cílios",
    services: [
      {
        slug: "fio-a-fio",
        name: "Fio a fio",
        description: "Um fio aplicado em cada cílio natural, para um efeito leve, de rímel.",
      },
      {
        slug: "volume-brasileiro",
        name: "Volume Brasileiro",
        description: "Fios em formato de Y que dão mais volume sem pesar no olhar.",
      },
      // TODO: confirmar com ela a descrição das técnicas abaixo
      { slug: "volume-kb-beauty", name: "Volume KB Beauty" },
      { slug: "divine-bloom-3d", name: "Volume Divine Bloom 3D" },
      { slug: "volume-4d", name: "Volume 4D" },
      { slug: "divine-power", name: "Volume Divine Power" },
      {
        slug: "lash-lifting",
        name: "Lash Lifting",
        description: "Curva e alonga os seus cílios naturais, sem extensão.",
      },
    ],
  },
  {
    id: "sobrancelhas",
    title: "Sobrancelhas",
    services: [
      {
        slug: "design-sobrancelhas",
        name: "Design de sobrancelhas",
        description: "Desenho pensado para o formato do seu rosto, com ou sem henna.",
      },
      {
        slug: "brow-lamination",
        name: "Brow Lamination",
        description: "Alinha e fixa os fios, deixando as sobrancelhas cheias e penteadas.",
      },
      {
        slug: "spa-sobrancelhas",
        name: "Spa das sobrancelhas",
        description: "Limpeza, esfoliação e hidratação da região das sobrancelhas.", // TODO: confirmar
      },
      {
        slug: "microblading",
        name: "Microblading",
        description: "Micropigmentação fio a fio, com acabamento natural.",
      },
      // Micro Shadow: adicionar quando houver fotos
    ],
  },
];
