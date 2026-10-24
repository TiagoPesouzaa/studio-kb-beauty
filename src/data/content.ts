import type { FaqItem, GalleryImage, Testimonial } from "@/types";
import { siteConfig } from "@/config/site";

/**
 * Galeria (fotos em retrato 4:5).
 * Geradas por scripts/optimize_photos.py em /public/images/galeria/.
 */
export const gallery: GalleryImage[] = [
  { src: "/images/galeria/01.webp", alt: "Microblading: antes e depois" },
  { src: "/images/galeria/02.webp", alt: "Extensão de cílios com volume" },
  { src: "/images/galeria/03.webp", alt: "Cílios e sobrancelhas, resultado finalizado" },
  { src: "/images/galeria/04.webp", alt: "Cílios e sobrancelhas, resultado finalizado" },
  { src: "/images/galeria/05.webp", alt: "Design de sobrancelhas em duas clientes" },
  { src: "/images/galeria/06.webp", alt: "Design de sobrancelhas, resultado finalizado" },
];

export const about = {
  title: "Sobre o estúdio",
  // TODO: trocar por um texto dela, em primeira pessoa (trajetória, cursos, o que ama no trabalho)
  paragraphs: [
    `O ${siteConfig.name} é dedicado a cílios e sobrancelhas: técnicas de extensão, lash lifting, design, brow lamination e micropigmentação.`,
    "Cada atendimento começa entendendo o seu rosto e o efeito que você quer, para chegar a um resultado que combine com você.",
  ],
  image: "/images/sobre/perfil.webp" as string | undefined,
};

/** Depoimentos reais de clientes. Enquanto a lista estiver vazia, a seção não aparece. */
export const testimonials: Testimonial[] = [];

export const faq: FaqItem[] = [
  {
    question: "Como faço para agendar?",
    answer:
      "Pelo WhatsApp. Escolha o serviço aqui no site e toque em Agendar: a mensagem já vai pronta.",
  },
  {
    question: "Onde é o atendimento?",
    answer: `Na ${siteConfig.region}. ${siteConfig.regionNote}`,
  },
  {
    question: "Quanto custa cada serviço?",
    answer: "Os valores são passados pelo WhatsApp, junto com os horários disponíveis.",
  },
  {
    question: "Não sei qual técnica de cílios escolher. E agora?",
    answer:
      "Sem problema. Conte no WhatsApp o efeito que você gosta, mais natural ou mais marcado, e eu indico a técnica ideal para você.",
  },
];
